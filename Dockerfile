FROM node:18-slim as client-builder

RUN apt-get -qq update && apt-get install -y --no-install-recommends \
    ca-certificates \
    build-essential \
    python3

WORKDIR /app

COPY ./client/package.json ./

RUN yarn install

COPY ./client ./

RUN yarn build


FROM node:18-slim as server-builder

RUN apt-get -qq update && apt-get install -y --no-install-recommends \
    ca-certificates \
    build-essential \
    python3

WORKDIR /app

COPY ./server/package.json ./
COPY ./server/tsconfig.json ./

RUN yarn install

COPY ./server ./
RUN yarn build

COPY --from=client-builder /app/dist /app/dist/public


FROM node:18-slim

WORKDIR /app

COPY --from=server-builder /app/dist /app/dist
COPY --from=server-builder /app/node_modules /app/node_modules

CMD ["node", "./dist/app.js"]
