FROM node:20.7.0 as base

WORKDIR /app

# Copy and download dependencies
COPY package*.json ./
RUN npm install

# Copy the source files into the image
COPY . .