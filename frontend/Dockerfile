# Этап 1: сборка
FROM node:alpine AS builder

# Рабочая директория в контейнере
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем проект
COPY . .

# Собираем проект
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
