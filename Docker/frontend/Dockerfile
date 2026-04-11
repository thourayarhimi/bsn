FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm install @types/node@20.11.0 --save-dev --legacy-peer-deps

COPY . .

RUN npm run build --prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/book-network-ui /usr/share/nginx/html
EXPOSE 80
