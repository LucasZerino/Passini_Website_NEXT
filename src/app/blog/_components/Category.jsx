'use client';

import { useEffect, useState } from 'react';

const Category = ({ setActiveCategory }) => {
  const [categories, setCategories] = useState([]);
  const [localActiveCategory, setLocalActiveCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/content/blog.json');
        if (!res.ok) throw new Error('Failed to fetch blog data');
        const blogPosts = await res.json();

        // Mapeia as categorias
        const categoriesMap = blogPosts.reduce((acc, current) => {
          if (current.categoria) {
            if (!acc[current.categoria]) {
              acc[current.categoria] = 0;
            }
            acc[current.categoria]++;
          }
          return acc;
        }, {});

        const categoriesArray = Object.keys(categoriesMap).map(category => ({
          name: category,
          count: categoriesMap[category]
        }));

        setCategories(categoriesArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const filterByCategory = (category) => {
    if (localActiveCategory === category) {
      // Se clicar novamente na mesma categoria, desativa ela
      setLocalActiveCategory(null);
      setActiveCategory(null); // Limpa a categoria ativa no componente pai, se necessário
    } else {
      setLocalActiveCategory(category);
      setActiveCategory(category); // Atualiza a categoria ativa no componente pai
    }
  };

  return (
    <ul className="style-none">
      {categories.map((category, index) => (
        <li key={index} className={category.name === localActiveCategory ? 'ativo' : ''}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              filterByCategory(category.name);
            }}
            className={category.name === localActiveCategory ? 'ativo' : ''}
          >
            {category.name}
            <span className="float-end">{`(${category.count})`}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Category;
