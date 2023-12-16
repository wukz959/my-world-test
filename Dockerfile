FROM node:16-alpine

WORKDIR /app

COPY . .

ENV TZ Asia/Shanghai

EXPOSE 80
EXPOSE 2365