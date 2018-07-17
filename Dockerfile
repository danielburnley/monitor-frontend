FROM node:10.6.0-alpine

RUN apk --no-cache add git
RUN npm install -g @storybook/cli

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

ADD . /app

CMD npm start
