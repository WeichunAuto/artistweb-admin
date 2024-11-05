FROM node:22.9.0 AS builder

WORKDIR /ArtistWeb

COPY package*.json .

RUN npm ci && npm install axios

COPY . .

RUN npm run build --verbose

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /ArtistWeb/build /usr/share/nginx/html

EXPOSE 3002

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
