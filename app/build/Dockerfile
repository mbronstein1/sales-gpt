# syntax = docker/dockerfile:1.4

# Stage 1: Build the frontend
FROM oven/bun:1.0.33 AS frontend-builder
ARG DEBIAN_FRONTEND=noninteractive
WORKDIR /build
RUN apt -y update && apt install -y --no-install-recommends curl bash
COPY /client/package.json .
RUN bun install
COPY /client/src ./src
COPY /client/public ./public
COPY /client/vite.config.ts /client/.eslintrc.cjs /client/index.html /client/tsconfig.json  /client/tsconfig.node.json ./
RUN bun run -b build

# Stage 2: Setup for development
FROM node:21-slim AS development
WORKDIR /app/server
RUN apt-get update && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*
COPY /server/package.json .
RUN npm install
COPY /server/prisma ./prisma
COPY /server .
RUN npm install -g nodemon
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]


# Production stage
FROM node:21-slim AS production
WORKDIR /app
COPY --from=frontend-builder /build/dist ./client
WORKDIR /app/server
RUN apt-get update && apt-get install -y openssl \
    && rm -rf /var/lib/apt/lists/*
COPY /server/package.json .
COPY /server/prisma ./prisma
COPY /server .
RUN npm install
RUN npx prisma generate
RUN npm run build
RUN npm prune --production
EXPOSE 3000
RUN if [ -d "./dist" ]; then \
        rm -rf ./src/* ./server.ts; \
        mv ./dist/* .; \
        rm -rf ./dist; \
    fi
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]



