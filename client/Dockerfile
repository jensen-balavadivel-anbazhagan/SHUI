FROM node:lts-alpine

# The /app directory should act as the main application directory
WORKDIR /usr/src/app/client

RUN npm install -g http-server

COPY client/package*.json ./

RUN npm install
# Copy or project directory (locally) in the current directory of our docker image (/app)
COPY client/ .

RUN npm run build
