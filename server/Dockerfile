# backend/Dockerfile
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code, excluding node_modules
COPY . .

# Install Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start the app with nodemon
CMD ["npx", "nodemon", "src/index.js"]