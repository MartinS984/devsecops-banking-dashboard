# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Stage 2: Secure Runtime
FROM gcr.io/distroless/nodejs20-debian12:nonroot
WORKDIR /app

# Copy only the production dependencies and source code
COPY --from=build /app /app

# The distroless image runs as a non-root user by default (uid 65532)
USER 65532

EXPOSE 3000

# Simple healthcheck for K8s monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/api/health').then(r => r.ok ? process.exit(0) : process.exit(1))"

CMD ["server.js"]