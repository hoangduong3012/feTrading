
ARG NODE_TAG=16.14.2
ARG NGINX_TAG=stable-alpine
ARG APP_HOME=/usr/src/client

# build stage
FROM node:${NODE_TAG} as build

ARG NODE_TAG
ARG APP_HOME

ARG REACT_APP_SERVER_IP
ENV REACT_APP_SERVER_IP $REACT_APP_SERVER_IP

ARG REACT_APP_PORT
ENV REACT_APP_PORT $REACT_APP_PORT

WORKDIR ${APP_HOME}

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

# deploy stage
FROM nginx:${NGINX_TAG}

ARG NGINX_TAG
ARG APP_HOME

RUN echo "nginx:${NGINX_TAG}" > /docker-image-tag && cat /docker-image-tag

COPY --from=build ${APP_HOME}/build /usr/share/nginx/html

COPY --from=build  ${APP_HOME}/nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]