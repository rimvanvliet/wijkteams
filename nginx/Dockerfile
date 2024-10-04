ARG PLATFORM

FROM --platform=$PLATFORM  nginx

RUN mkdir -p "/etc/nginx/ssl"
COPY conf/ /etc/nginx

RUN chmod go+rwx /var/cache/nginx /var/run /var/log/nginx
EXPOSE 80 443

USER 997

CMD ["nginx", "-g", "daemon off;"]
