
# base image
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# start app
CMD ["npm", "start"]
