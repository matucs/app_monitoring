FROM node:20-alpine

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY drizzle.config.ts ./
RUN npm install --legacy-peer-deps
COPY src ./src
RUN mkdir -p screenshots
EXPOSE 3001
CMD ["npx", "tsx", "src/index.ts"]
