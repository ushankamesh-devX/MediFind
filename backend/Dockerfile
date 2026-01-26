FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com/ && \
    npm config set fetch-retry-maxtimeout 600000 && \
    npm config set fetch-retry-mintimeout 10000 && \
    npm install --network-timeout=600000 --prefer-offline
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]