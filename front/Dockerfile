FROM node:18-alpine

WORKDIR /usr/app

COPY package.*json .

COPY public /usr/app/public

RUN npm install

COPY .eslintrc.json .
COPY next.config.js .
COPY tsconfig.json .
COPY src /usr/app/src
