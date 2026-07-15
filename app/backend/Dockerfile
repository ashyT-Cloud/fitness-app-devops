# Base image
FROM node:22-alpine

# Working directory inside the container
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install application source
COPY . .

# Application port
EXPOSE 3000

# Start the application 
CMD ["npm", "start"]
