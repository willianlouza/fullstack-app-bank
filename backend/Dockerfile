FROM node

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY . .

RUN yarn 
RUN yarn prisma generate

COPY . .

EXPOSE 8080

CMD ["yarn", "dev"]