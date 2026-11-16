# Stage 1 for build
FROM node:22 AS builder
WORKDIR /app
COPY package*.json .
RUN npm run install
COPY . .
RUN npm run build


# Stage 2 for production

FROM node:22 AS runner
WORKDIR /app