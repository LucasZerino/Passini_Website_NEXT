'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const RecentPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/content/blog.json');
        if (!res.ok) throw new Error('Failed to fetch blog data');
        const blogData = await res.json();
        
        // Ordena os posts por ID em ordem inversa
        const sortedPosts = blogData.slice().sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.slice(0, 3).map(post => (
        <div
          className="news-block d-flex align-items-center pt-4 pb-4 border-t border-b"
          key={post.id}
        >
          <div>
            <Image
              width={120}
              height={120}
              src={post.imageSrc}
              alt={post.title}
              className="lazy-img"
            />
          </div>
          <div className="post ps-4">
            <h4 className="mb-3">
              <Link href={`/blog/${post.id}`} className="title text-lg font-semibold hover:text-blue-500 transition-colors">
                {post.title}
              </Link>
            </h4>
            <div className="date text-gray-500 mb-2">{post.date}</div>
            {post.categoria && (
              <div className="categories flex flex-wrap gap-2 mt-2">
                <span
                  className="category bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors"
                >
                  {post.categoria}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default RecentPost;
