FROM tomcat:7-jdk8

LABEL maintainer="ops@4sh.fr"

ADD db/ /var/lib/db/
RUN rm -rf /usr/local/tomcat/webapps/*
ADD build/libs/4sh-invoice.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080

CMD ["catalina.sh", "run"]
