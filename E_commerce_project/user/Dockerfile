# Use official Node.js base image
FROM node:18

# Create app directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (adjust if needed)
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]
