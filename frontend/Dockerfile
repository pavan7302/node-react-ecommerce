# =========================
# BUILD STAGE
# =========================
FROM node:22-alpine AS build

WORKDIR /app

ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy dependency files first (better cache)
COPY package*.json ./

# Faster + deterministic install
RUN npm ci --prefer-offline --no-audit

# Copy source code
COPY . .

# Build app
RUN npm run build


# =========================
# PRODUCTION STAGE
# =========================
FROM nginx:alpine

# Copy build output
COPY --from=build /app/build /usr/share/nginx/html

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
