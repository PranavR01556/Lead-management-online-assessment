# CRM Lead Management Assessment

This repository contains a standalone Lead Management assessment project.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Vanilla CSS
- **Backend:** PHP (REST API)
- **Database:** SQLite (via PDO)
- **Containerization:** Docker

## System Requirements

- **Docker & Docker Compose:** Engine version 20.10+ and Docker Compose v2.0+ (required to run the containerized PHP backend and SQLite database)
- **Node.js:** Node.js v18.0.0 or higher, with `npm` v9.0.0 or higher
- **Web Browser:** Any modern web browser (Chrome, Firefox, Edge, Safari)

## How to Run the Environment

### 1. Start the Backend API

From the root directory, start the Docker container for the PHP and SQLite services:

```bash
docker compose up --build
or docker-compose up --build
```

The backend API is served at **http://localhost:8081**. You can verify it is running by checking the health endpoint:

```bash
curl http://localhost:8081/api/health
```

### 2. Start the Frontend Application

Open a new terminal window, navigate to the `frontend` folder, install dependencies, and launch the Vite development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be hosted locally (usually at **http://localhost:5173** or **http://localhost:5174** if 5173 is occupied).
