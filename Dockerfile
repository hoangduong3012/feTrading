
ARG NODE_TAG=16.14.2
ARG NGINX_TAG=stable-alpine
ARG APP_HOME=/usr/src/client
# deploy stage
FROM nginx:${NGINX_TAG}

ARG NGINX_TAG
ARG APP_HOME

WORKDIR ${APP_HOME}

COPY . .

RUN echo "nginx:${NGINX_TAG}" > /docker-image-tag && cat /docker-image-tag

COPY ${APP_HOME}/build /usr/share/nginx/html

COPY --from=build  ${APP_HOME}/nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]