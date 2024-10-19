FROM node:18 AS backend-builder

WORKDIR /app

COPY . .

RUN yarn install


FROM node:18-slim

WORKDIR /app

COPY --from=backend-builder /app .

EXPOSE 8080


CMD [ "yarn" ,"run","start"]