FROM node:8.7.0-alpine

RUN mkdir -p /srv/app/expense-reports-payment

WORKDIR /srv/app/expense-reports-payment

COPY package.json /srv/app/expense-reports-payment
COPY package-lock.json /srv/app/expense-reports-payment

RUN npm install

COPY . /srv/app/expense-reports-payment

CMD ["npm", "run", "dev"]