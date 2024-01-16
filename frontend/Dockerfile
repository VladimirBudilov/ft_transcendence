FROM node:alpine3.19

WORKDIR /app
COPY package*.json ./app/
COPY . /app

RUN npm install

CMD ["node", "server.js"]