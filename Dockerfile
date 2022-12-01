# syntax=docker/dockerfile:1
FROM node:latest
RUN mkdir app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start-production"]
EXPOSE 6500
