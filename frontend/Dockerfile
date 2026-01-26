FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --network-timeout=600000 --prefer-offline
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]