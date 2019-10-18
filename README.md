# expense-reports-payment-app

## Overview

1. Install prerequisites

    Before installing project make sure the following prerequisites have been met.

2. Clone the project

    Download the code from this repository.

3. Run the application

    How to run the local environment for Developers.

4. Run tests

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

## 3.- Run the application

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

## 4.- Run tests

To run tests you need to execute the script:

```sh
docker exec -it node npm run test

```