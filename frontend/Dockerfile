FROM node:22-alpine AS builder

# Working directory in container
WORKDIR /app

# Establish dependencies
COPY package*.json ./
RUN npm install

# Copy project
COPY . .

# Build project
ENV NODE_ENV=production
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
