'use server';

import { NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';

// Caminho para o arquivo JSON que armazena os dados dos posts
const blogFilePath = path.resolve('public', 'content', 'blog.json');

// Função para deletar um post com base no ID
export async function DELETE(request) {
  try {
    // Extrai o ID do corpo da requisição
    const { id } = await request.json();

    // Verifica se o ID é válido
    if (!id || isNaN(id)) {
      return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
    }

    // Lê o arquivo JSON
    const blogData = await fs.readJson(blogFilePath);

    // Encontra o post a ser removido
    const postToDelete = blogData.find(post => post.id === id);

    // Verifica se o post foi encontrado
    if (!postToDelete) {
      return NextResponse.json({ message: 'Post não encontrado' }, { status: 404 });
    }

    // Define os caminhos para os arquivos a serem deletados
    const conteudoPath = path.join('public', 'content', postToDelete.conteudoPath);
    const imagemPath = path.join('public', 'images', 'blog', `image-${id}.png`);

    // Remove os arquivos
    await fs.remove(conteudoPath);
    await fs.remove(imagemPath);

    // Filtra os dados para remover o post com o ID fornecido
    const updatedBlogData = blogData.filter(post => post.id !== id);

    // Atualiza o arquivo JSON com os dados filtrados
    await fs.writeFile(blogFilePath, JSON.stringify(updatedBlogData, null, 2));

    return NextResponse.json({ message: 'Post deletado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    return NextResponse.json({ message: 'Erro ao deletar post', error: error.message }, { status: 500 });
  }
}
