FROM node:14

WORKDIR ./
COPY . .

WORKDIR /api
RUN npm install && cp .env.example .env

WORKDIR /dashboard
RUN npm install && npm run prod

EXPOSE 3000
EXPOSE 8080

WORKDIR /api
CMD [ "npm", "run", "prod" ]