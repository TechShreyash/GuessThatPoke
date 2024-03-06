# Use the official Node.js LTS image as the base
FROM node:lts

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy the rest of your application code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Start your Express.js app
CMD ["node", "src/server.js"]