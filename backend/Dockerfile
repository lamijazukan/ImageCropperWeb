FROM node:20-alpine

# Install dependencies needed for native Node modules like sharp and mssql
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

EXPOSE 5001

# Start server
CMD ["npm", "run", "start"]
