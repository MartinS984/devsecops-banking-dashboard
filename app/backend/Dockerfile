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
CMD ["server.js"]