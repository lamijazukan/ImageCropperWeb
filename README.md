# Image Cropper Web

A full-stack image cropping application with a React frontend and Node.js/Express backend, supporting interactive image cropping and logo overlay.

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>

cd project-root
```

### 2. Configure environment variables
Create a .env file in the backend folder and add the following:

```bash
DATABASE_URL="sqlserver://sqlserver:1433;database=<yourdbname>;user=<user>;password=<password>;encrypt=false;trustServerCertificate=true"
NODE_ENV="development"
PORT=5001
```
Replace ```<yourdbname>```, ```<user>```, and ```<password>``` with your SQL Server database credentials.

### 3. Start application

```bash
docker compose up --build
```
### 4. Run Prisma migrations
Prisma is used to manage the database schema.

```bash
docker compose exec backend npx prisma migrate deploy
```
This will apply migrations and generate the Prisma client used in the backend.

### 5. Access the application

| Service      | URL                                                              |
| ------------ | ---------------------------------------------------------------- |
| Frontend     | [http://localhost:5173](http://localhost:5173)                   |
| Backend API  | [http://localhost:5001](http://localhost:5001)                   |
| Swagger Docs | [http://localhost:5001/api-docs](http://localhost:5001/api-docs) |

