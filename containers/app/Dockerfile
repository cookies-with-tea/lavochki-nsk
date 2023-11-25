FROM node:18-alpine3.17 as build

WORKDIR /app
COPY . /app

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add make g++
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:stable-alpine as production-stage
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]