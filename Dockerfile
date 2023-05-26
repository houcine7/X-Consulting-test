# UseNode.js runtime as the base image
FROM node:18-alpine

# working directory in the container
WORKDIR /app

COPY package*.json .

# Install dependencies
RUN npm install

COPY . .

EXPOSE 8080

# Start the application
CMD ["npm", "start"]