FROM node:14

WORKDIR /app

COPY . .

RUN npm install
RUN apt update -y && npm install -g typescript

CMD ["npm", "run","start"]