FROM node:20-alpine3.16 as base

WORKDIR /usr/app

COPY package.*json .
COPY prisma ./prisma/

RUN npm install

COPY /src /usr/app/src

