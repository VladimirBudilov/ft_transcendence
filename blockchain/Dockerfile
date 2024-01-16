# Используем образ Node.js
FROM node:16

# Создаем и устанавливаем рабочий каталог внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта в текущий каталог контейнера
COPY . .

# Запускаем Hardhat Node
CMD ["npx", "hardhat", "node"]
