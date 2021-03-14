FROM node:lts AS deps

WORKDIR /code
COPY package.json /code/package.json
COPY yarn.lock /code/yarn.lock

RUN yarn install

FROM deps AS build

COPY . /code

ARG BUILD_TARGET="release"

RUN yarn build $BUILD_TARGET

FROM nginx:1.13-alpine

COPY --from=build /code/dist /usr/share/nginx/html
