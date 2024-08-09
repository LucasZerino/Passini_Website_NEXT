# Use uma imagem base oficial do Node.js 18
FROM node:18-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Construa a aplicação Next.js
RUN npm run build

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
