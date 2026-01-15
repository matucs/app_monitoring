FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY tsconfig*.json vite.config.ts tailwind.config.js postcss.config.js eslint.config.js index.html ./
COPY src ./src
COPY public ./public
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
