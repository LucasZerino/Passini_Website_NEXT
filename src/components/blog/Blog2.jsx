'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/content/blog.json');
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="row">
      {blogPosts.slice(11, 19).map((post) => (
        <div
          className="col-md-6"
          key={post.id}
          data-aos="fade-up"
          data-aos-delay={post.delay || 0}
        >
          <article className="blog-meta-three mb-60 lg-mb-40">
            <figure className="post-img m0">
              <Link href={`/blog/${post.id}`} className="w-100 d-block">
                <Image
                  width={380}
                  height={280}
                  src={post.imageSrc}
                  alt={post.title || 'blog'}
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
                  Read More
                </Link>
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
};

export default Blog;
