FROM node:16
WORKDIR /usr/src/app
COPY . .
RUN npm install -g pnpm turbo
RUN pnpm install

RUN turbo run build --filter=/apps/workers
CMD [ "node","./apps/workers/dist/." ]