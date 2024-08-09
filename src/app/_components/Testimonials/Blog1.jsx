'use client'; // Adicionado para garantir que o componente seja tratado como cliente

import { useEffect, useState } from 'react';
import Link from 'next/link';

const Blog = () => {
  const [blogData, setBlogData] = useState([]);

  // Função para buscar os dados do JSON
  const fetchBlogData = async () => {
    try {
      const response = await fetch('/content/blog.json');
      const data = await response.json();
      setBlogData(data);
    } catch (error) {
      console.error('Erro ao buscar dados do blog:', error);
    }
  };

  // Buscar dados quando o componente for montado
  useEffect(() => {
    fetchBlogData();
  }, []);

  // Ordenar blogData por ID em ordem decrescente
  const sortedBlogData = blogData.sort((a, b) => b.id - a.id);

  return (
    <div className="row">
      {sortedBlogData.slice(0, 2).map((item) => (
        <div
          className="col-md-6 d-flex"
          data-aos="fade-up"
          data-aos-delay={(item.id % 2 + 1) * 100} // Ajustado para garantir delay único
          key={item.id} // Alterado para `item.id` em vez de `index`
        >
          <article
            className="blog-meta-six d-flex flex-column position-relative zn2 mt-40"
            style={{ backgroundImage: `url(${item.imageSrc})` }}
          >
            <div className="post-data position-relative d-flex flex-column h-100">
              <div className="blog-header">
                <div>
                  <Link
                    href={`/blog/${item.id}`}
                    className="tag text-uppercase fw-500 tran3s mb-20"
                  >
                    {item.tag}
                  </Link>
                </div>
                <Link href={`/blog/${item.id}`}>
                  <h4 className="tran3s blog-title">{item.title}</h4>
                </Link>
              </div>
              {/* /.blog-header */}
              <div className="blog-footer d-flex align-items-center justify-content-between mt-auto">
                <div className="blog-date tran3s fw-500 tx-dark">
                  <a href="#" className="fw-normal tran3s">
                    {item.date}
                  </a>
                </div>
                <Link href={`/blog/${item.id}`} className="read-more tran3s">
                  <i className="bi bi-arrow-up-right" />
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
