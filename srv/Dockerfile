FROM tomcat:7-jdk8

RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
RUN apt-get update && apt-get install -y mongodb-org-shell

LABEL maintainer="ops@4sh.fr"

ADD db/ /var/lib/db/
RUN rm -rf /usr/local/tomcat/webapps/*
ADD build/libs/4sh-invoice.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080

CMD ["catalina.sh", "run"]
