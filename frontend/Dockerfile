FROM node

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

COPY . .

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn","dev"]