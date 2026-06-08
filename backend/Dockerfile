FROM php:8.2-cli

# Install SQLite3 extension + PDO SQLite
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    sqlite3 \
    && docker-php-ext-install pdo pdo_sqlite \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Create db directory with correct permissions
RUN mkdir -p /app/db && chmod 777 /app/db

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "index.php"]
