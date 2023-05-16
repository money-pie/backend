FROM node:18-alpine AS dist
COPY package*.json ./

RUN npm pkg delete scripts.prepare && npm install

COPY . ./

RUN npm pkg delete scripts.prepare && npm run build

FROM node:18-alpine AS node_modules
COPY package*.json ./

RUN npm pkg delete scripts.prepare && npm install --production

FROM node:18-alpine

ARG PORT=5000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=dist dist /usr/src/app/dist
COPY --from=node_modules node_modules /usr/src/app/node_modules

COPY . /usr/src/app

EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]
