FROM node:18

RUN apt-get update
RUN apt-get install git

COPY ./ /usr/app/
WORKDIR /usr/app

RUN npm install
CMD npm start
