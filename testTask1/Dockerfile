FROM node:18

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ADD .env /app/.env

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]