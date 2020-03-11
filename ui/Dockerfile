FROM nginx

LABEL maintainer="ops@4sh.fr"

COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]