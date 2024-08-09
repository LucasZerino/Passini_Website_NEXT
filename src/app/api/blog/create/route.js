'use server';

import { NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

// Caminho para o arquivo que armazena os dados dos posts
const blogFilePath = path.resolve('public', 'content', 'blog.json');

// Função para obter o próximo ID disponível
const getNextId = (existingPosts) => {
  const maxId = existingPosts.reduce((max, post) => (post.id > max ? post.id : max), 0);
  return maxId + 1;
};

// Função de tratamento da requisição POST
export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Verifica se todos os campos obrigatórios estão presentes
    const title = formData.get('title');
    const tag = formData.get('tag');
    if (!title || !tag) {
      return NextResponse.json({ message: 'Title and tag are required' }, { status: 400 });
    }

    // Carrega os dados existentes
    const existingPosts = await fs.readJson(blogFilePath);

    // Obtém o próximo ID disponível
    const nextId = getNextId(existingPosts);

    // Lê o texto do conteúdo
    const conteudoText = formData.get('conteudo');
    if (!conteudoText) {
      return NextResponse.json({ message: 'Conteúdo text is required' }, { status: 400 });
    }
    const conteudoPath = path.join('public', 'content', `article-${nextId}.md`);
    await fs.writeFile(conteudoPath, conteudoText);

    // Lê a imagem, se presente
    const imagemFile = formData.get('imagem');
    if (!imagemFile) {
      return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
    }
    const imagemPath = path.join('public', 'images', 'blog', `image-${nextId}.png`);
    await fs.writeFile(imagemPath, Buffer.from(await imagemFile.arrayBuffer()));

    // Cria o novo post
    const newPost = {
      id: nextId,
      imageSrc: `/images/blog/image-${nextId}.png`,
      date: new Date().toLocaleDateString(), // Data atual
      title,
      tag,
      delay: "400",
      categoria: formData.get('categoria') || '', // Categoria opcional
      banner: false, // Adapte conforme necessário
      autor: formData.get('autor') || '', // Autor opcional
      conteudoPath: `article-${nextId}.md`,
    };

    // Adiciona o novo post aos dados existentes
    existingPosts.push(newPost);

    // Atualiza o arquivo de dados
    await fs.writeFile(blogFilePath, JSON.stringify(existingPosts, null, 2));

    return NextResponse.json({ message: 'Post criado com sucesso!', newPost }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return NextResponse.json({ message: 'Erro ao criar post', error: error.message }, { status: 500 });
  }
}
