FROM node:20-alpine3.16 as base


WORKDIR /usr/app

COPY package.*json .
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY .env /usr/app/.env
COPY /src /usr/app/src

CMD [ "npm","run","dev" ]