FROM node:16.3.0-alpine

WORKDIR /app

COPY . .

RUN npm install
CMD ["npm", "run", "dev"]