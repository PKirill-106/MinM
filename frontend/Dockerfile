# Этап 1: сборка
FROM node:22-alpine AS builder

# Рабочая директория в контейнере
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем проект
COPY . .

# Собираем проект
ENV NODE_ENV=production
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
