FROM node:lts AS deps

ENTRYPOINT /bin/bash
WORKDIR /code/

COPY package.json /code/package.json
COPY yarn.lock /code/yarn.lock

RUN yarn install

FROM deps AS build

COPY . /code

ARG BUILD_TARGET="release"

RUN yarn $BUILD_TARGET

FROM nginx:1.13-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/dist/ /usr/share/nginx/html

STOPSIGNAL SIGTERM
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
