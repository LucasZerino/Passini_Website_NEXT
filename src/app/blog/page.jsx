'use client'

import { useState } from 'react';
import Pagination from "./_components/Pagination";
import Category from "./_components/Category";
import RecentPost from "./_components/RecentPost";
import BannerPost from "./_components/BannerPost";
import Blog2 from "./_components/Blog2";
import Header3 from "../_components/Header/Header";
import RootLayout from "../RootLayout";
import Inferior from "../_components/Footer/page";

const GridWithSidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <RootLayout>
      <>
        <Header3 />

        <div className="fancy-feature-fiftyOne position-relative mt-200">
          <div className="container">
            <div className="row">
              <div className="col-lg-7" data-aos="fade-right">
                <div className="title-style-five mb-65 lg-mb-40">
                  <div className="sc-title-two fst-italic position-relative">
                    Blog
                  </div>
                  <h2 className="main-title fw-500 tx-dark">
                    Confira novidades &amp; atualizações
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="blog-section-five mt-70 lg-mt-30">
          <div className="container">
            <div className="border-bottom pb-130 lg-pb-60">
              <div className="row gx-xl-5">
                <div className="col-lg-8">
                  <div className="blog-meta-wrapper pe-xxl-5">
                    <div className="row">
                      <Blog2 activeCategory={activeCategory} /> {/* Passando activeCategory como propriedade para Blog2 */}
                    </div>
                  </div>
                  <div className="page-pagination-one pt-15">
                    <Pagination />
                  </div>
                </div>

                <div className="col-lg-4 col-md-8">
                  <div className="blog-sidebar md-mt-70">
                    <div className="blog-sidebar-category mb-60 md-mb-50">
                      <h4 className="sidebar-title">Categorias</h4>
                      <Category setActiveCategory={setActiveCategory} /> {/* Passando setActiveCategory como propriedade para Category */}
                    </div>

                    <div className="sidebar-recent-news mb-60 md-mb-50">
                      <h4 className="sidebar-title">Posts Recentes</h4>
                      <RecentPost />
                    </div>

                    <BannerPost />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Inferior />
      </>
    </RootLayout>
  );
};

export default GridWithSidebar;
