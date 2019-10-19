# expense-reports-payment-app

## Overview

1. Install prerequisites

    Before installing project make sure the following prerequisites have been met.

2. Clone the project

    Download the code from this repository.

3. Add .env

    Add the necesary environment variables.    

4. Run the application

    How to run the local environment for Developers.

5. Poblate your choosen DB

    Execute the seed file.    

6. Run tests

    How to run tests    


    

___

## 1.- Install prerequisites

You need to have docker installed.

## 2.- Clone the project

To install [Git](https://github.com/InmaSA/expense-reports-payment-app), download it and install following the instructions :

```sh
git clone https://github.com/InmaSA/expense-reports-payment-app.git
```

Go to the project directory :

```sh
cd expense-reports-payment-app
```

## 3.- Add .env

Create a .env file inside root folder with the following environment variables:

PORT=
ENV=
DB_URI=
APP_SERVER_PORT=

PORT and APP_SERVER_PORT must be the same.

## 4.- Run the application

To deploy the local environment for developers do you need execute that steps:

1.- Execute the script:

```sh
docker-compose up -d
```

2-. Open your favorite browser :

* [app](http://localhost:3000/)


3-. Stop and clear services [Optional]

```sh
docker-compose down
```
---


## 5.- Poblate your choosen DB

To poblate the data base execute the script:

```sh
docker exec -it node node bin/seed.js
```

## 6.- Run tests

To run tests you need to execute the script:

```sh
docker exec -it node npm run test

```