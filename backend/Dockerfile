FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci --network-timeout=600000 --prefer-offline
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]