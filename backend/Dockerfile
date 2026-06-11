FROM php:8.2-cli-alpine
RUN apk add --no-cache sqlite-dev && docker-php-ext-install pdo pdo_sqlite
WORKDIR /app
RUN mkdir -p /app/db && chmod 777 /app/db
EXPOSE 8000
CMD ["php", "-S", "0.0.0.0:8000", "index.php"]
