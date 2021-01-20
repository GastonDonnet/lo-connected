FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

#RUN rm -rf node_modules/sharp

#RUN npm install sharp

RUN npm install pm2 -g

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD pm2-runtime start server.js