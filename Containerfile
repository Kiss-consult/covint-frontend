# STAGE 1: Compile and Build angular application
FROM node:20.5.1 AS builder
WORKDIR /usr/local/app
COPY . ./

ARG CONFIGURATION

RUN npm install
RUN npm run build -- --configuration=$CONFIGURATION

# STAGE 2: Serving the application using NGINX server
FROM nginx:1.25.2
COPY --from=builder /usr/local/app/dist/covint /app/usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080