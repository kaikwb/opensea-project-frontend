FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install --silent

COPY . .

ARG API_URL
ARG API_USERNAME
ARG API_PASSWORD

ENV VITE_API_URL=$API_URL \
    VITE_API_USERNAME=$API_USERNAME \
    VITE_API_PASSWORD=$API_PASSWORD

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]