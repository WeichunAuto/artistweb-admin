FROM node:22.9.0 AS builder

WORKDIR /ArtistWeb

COPY package*.json .

RUN npm install & npm install axios

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /ArtistWeb/build /usr/share/nginx/html

EXPOSE 3002

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
