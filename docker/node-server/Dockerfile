FROM node:latest

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g yarn &&\
    npm install -g nodemon &&\
    npm install -g pm2 &&\
    yarn

# RUN npm start
CMD ["yarn","start"]
