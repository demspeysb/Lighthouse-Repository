# Stage 1: Build the Next.js app

# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json/yarn.lock to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app (production build)
RUN npm run build

# Start the Next.js app
CMD ["npm", "run", "start"]
