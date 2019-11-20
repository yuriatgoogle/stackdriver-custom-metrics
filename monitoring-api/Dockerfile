FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install grpc --build-from-source
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "custom-metric.js" ]