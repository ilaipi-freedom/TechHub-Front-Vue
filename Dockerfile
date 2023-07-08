FROM node:18.16.1-alpine3.17 as base

WORKDIR /app

FROM base as dependencies

COPY package*.json .

RUN npm i

FROM base as build

COPY --from=dependencies /app/node_modules /app/node_modules
COPY . .

RUN npm run build

FROM nginx:1.25.1-alpine3.17 as release

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx_server /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
