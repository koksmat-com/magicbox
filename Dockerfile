FROM node:16 
WORKDIR /usr/src/app
COPY . .
RUN npm install -g pnpm turbo
RUN pnpm install
RUN mkdir -p /tmp/root/365admin-nodejs
RUN turbo run build --filter=@koksmat/web
WORKDIR /usr/src/app/apps/web
EXPOSE 5301
CMD ["npm", "run","start"]
