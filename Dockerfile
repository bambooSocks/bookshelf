FROM node:17-alpine
RUN apk add g++ make python2

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

ENV NODE_ENV production
EXPOSE 8081

CMD ["npm", "start"]