FROM php:8.2-cli-alpine

# Install SQLite3 extension + PDO SQLite
RUN apk add --no-cache sqlite-dev \
    && docker-php-ext-install pdo pdo_sqlite

WORKDIR /app

# Create db directory with correct permissions
RUN mkdir -p /app/db && chmod 777 /app/db

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "index.php"]
