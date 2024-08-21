FROM node:22.6.0

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]