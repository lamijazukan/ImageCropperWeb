# Image Cropper API

This repository contains the backend of the Image Cropper project, built with Node.js, Express, TypeScript, and Prisma ORM with SQL Server. The backend exposes REST APIs for uploading, cropping images, and managing logo overlay configurations. The frontend is under development.

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to backend folder

```bash
cd backend
```
### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables
Create a .env file in the backend folder and add the following:

```bash
DATABASE_URL="sqlserver://localhost:1433;database=<yourdbname>;user=<user>;password=<password>;encrypt=false;trustServerCertificate=true"
NODE_ENV="development"
PORT=5001
```
Replace ```<yourdbname>```, ```<user>```, and ```<password>``` with your SQL Server database credentials.

### 5. Run Prisma migrations
Prisma is used to manage the database schema.

```bash
npx prisma migrate dev --name init
```
This will:

- Apply migrations to your database

- Generate the Prisma client used in the backend code

### 6. Start the backend server and Access Swagger API documentation
```bash
npm run dev
```
The server starts on: ```http://localhost:5001```
Swagger UI is available at ```http://localhost:5001/api-docs/```

