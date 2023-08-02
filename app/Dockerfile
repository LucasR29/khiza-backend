FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

COPY . .

RUN yarn --quiet --no-optional --no-fund --loglevel=error

EXPOSE 3000

CMD ["yarn", "start:migrate:dev"]