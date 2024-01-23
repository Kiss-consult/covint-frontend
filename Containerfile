# STAGE 1: Compile and Build angular application
FROM node:20.9.0 AS builder
WORKDIR /usr/local/app
COPY . ./

ARG CONFIGURATION

RUN npm install
RUN npm run build

# STAGE 2: Serving the application using NGINX server
FROM nginx:1.25.2
COPY --from=builder /usr/local/app/dist/covint /app/usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["/bin/bash", "-c", "envsubst </app/usr/share/nginx/html/assets/config.templ.json > /app/usr/share/nginx/html/assets/config.json && exec nginx -g 'daemon off;'"]