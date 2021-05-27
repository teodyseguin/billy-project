FROM node:latest

RUN apt-get update

RUN mkdir -p /home/csvoucher
WORKDIR /home/csvoucher

COPY package.json /home/csvoucher
COPY package-lock.json /home/csvoucher
RUN npm install
COPY app/ /home/csvoucher
COPY docroot/ /home/csvoucher
COPY server/ /home/csvoucher
COPY webpack.config.js /home/csvoucher
COPY README.md /home/csvoucher

CMD supervisor server

