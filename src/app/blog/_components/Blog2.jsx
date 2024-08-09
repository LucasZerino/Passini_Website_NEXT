'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'; // Certifique-se de importar os componentes corretos

const Blog2 = ({ activeCategory }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/content/blog.json');
        if (!res.ok) throw new Error('Failed to fetch blog data');
        const blogData = await res.json();
        setPosts(blogData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      const filtered = posts.filter(post => post.categoria === activeCategory);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [activeCategory, posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="row">
        {currentPosts.map((post) => (
          <div
            className="col-md-6"
            key={post.id}
            data-aos="fade-up"
            data-aos-delay={post.delay}
          >
            <article className="blog-meta-three mb-60 lg-mb-40">
              <figure className="post-img m0">
                <Link href={`/blog/${post.id}`} className="w-100 d-block">
                  <Image
                    width={380}
                    height={280}
                    src={post.imageSrc}
                    alt="blog"
                    className="lazy-img w-100 tran4s"
                  />
                </Link>
              </figure>
              <div className="post-data mt-30">
                <div className="post-date opacity-75 text-uppercase">
                  {post.date}
                </div>
                <Link href={`/blog/${post.id}`} className="mt-10 mb-15">
                  <h4 className="tran3s blog-title fw-normal tx-dark">
                    {post.title}
                  </h4>
                </Link>
                <div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="read-btn-two fw-500 tran3s"
                  >
                    Ler Mais
                  </Link>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default Blog2;
