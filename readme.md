# NestJS starter

## Prerequisites

Ensure you have docker and docker compose:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup and Installation

1. **Start Docker Containers**
Start the production project using docker:
```bash
docker compose -f docker-compose.prod.yml up -d
docker exec app npm run db:migrate
docker exec app npm run db:seed
```
This will start the database, and run the nestjs app inside a docker container.

Copy .env.example to .env and start the dev project using the commands:
```bash
docker compose -f docker-compose.dev.yml up -d
npm run db:migrate
npm run db:seed
```
This will start the database with docker. Second and third commands will migrate and seed.