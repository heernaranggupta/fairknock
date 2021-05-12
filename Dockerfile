FROM node:12.13.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install


COPY . ./
RUN npm run build


EXPOSE 4000

CMD [ "node", "dist/index.js" ]