# Booking Tech Test

## Prerequisites

Ensure you have docker and docker compose:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup and Installation

1. **Start Docker Containers**
Start the project using docker:
```bash
docker-compose up -d
docker exec app npm run db:migrate
docker exec app npm run db:seed
```
