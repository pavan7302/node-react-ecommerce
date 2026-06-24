# ---------- Build Stage ----------
FROM node:22-alpine AS builder

WORKDIR /app

ENV NODE_OPTIONS=--openssl-legacy-provider
ENV CI=true

# dependency cache layer
COPY package*.json ./

RUN npm install --no-audit --silent

# copy only required source
COPY public ./public
COPY src ./src

RUN npm run build


# ---------- Production ----------
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
