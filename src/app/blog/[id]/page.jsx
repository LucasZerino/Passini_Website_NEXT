'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Inferior from '@/app/_components/Footer/page';
import Header3 from '@/app/_components/Header/Header';
import RecentPost from '../_components/RecentPost';
import BannerPost from '../_components/BannerPost';
import RootLayout from '@/app/RootLayout';

const Blog = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Buscar dados do blog
        const res = await fetch('/content/blog.json');
        if (!res.ok) throw new Error('Failed to fetch blog data');
        const blogsData = await res.json();

        // Encontrar o blog específico
        const blogData = blogsData.find(item => item.id == params.id) || blogsData[0];
        setBlog(blogData);

        // Buscar conteúdo Markdown
        const contentRes = await fetch(`/content/${blogData.conteudoPath}`);
        if (!contentRes.ok) throw new Error('Failed to fetch content');
        const text = await contentRes.text();
        setContent(text);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogData();
  }, [params.id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <RootLayout>
      {/* Header */}
      <Header3 />

      {/* Feature Section */}
      <div className="fancy-feature-fiftyOne position-relative mt-250 lg-mt-200">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-lg-9" data-aos="fade-right">
              <p className="blog-pubish-date">
                <a href="#" className="fw-500">
                  {blog.autor}
                </a> - {blog.categoria} . {blog.date} .
              </p>
              <h2 className="blog-heading-one tx-dark">{blog.title}</h2>
            </div>
          </div>
        </div>
        <img
          src="/images/shape/shape_172.svg"
          alt="shape"
          className="lazy-img shapes shape-two"
        />
      </div>

      {/* Blog Section */}
      <div className="blog-details-one mt-80 lg-mt-60">
        <div className="container">
          <div className="border-bottom pb-130 lg-pb-60">
            <div className="row gx-xl-5">
              <div className="col-lg-8">
                <div className="blog-meta-wrapper pe-xxl-5">
                  <article className="blog-details-content">
                    {blog.imageSrc && (
                      <Image
                        width={816}
                        height={597}
                        layout="responsive"
                        src={blog.imageSrc}
                        alt={blog.title}
                        className="lazy-img image-meta w-100"
                      />
                    )}

                    {/* Renderiza o conteúdo do blog convertendo de Markdown para HTML */}
                    <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
                  </article>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-lg-4 col-md-8">
                <div className="blog-sidebar md-mt-70">
                  {/* Categorias */}

                  {/* Posts Recentes */}
                  <div className="sidebar-recent-news mb-60 md-mb-50">
                    <h4 className="sidebar-title">Posts Recentes</h4>
                    <RecentPost />
                  </div>

                  {/* Banner Publicitário */}
                  <BannerPost />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Inferior />
    </RootLayout>
  );
};

export default Blog;
