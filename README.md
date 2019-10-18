# expense-reports-payment-app

## Overview

1. Install prerequisites

    Before installing project make sure the following prerequisites have been met.

2. Clone the project

    We’ll download the code from its repository on BitBucket.

3. Run the application

    How to run the local environment for Developers.

4. Run tests

    How to run tests    


    

___

## 1.- Install prerequisites

For now, this project has been mainly created for Unix `(Linux/MacOS)`. Perhaps it could work on Windows but we aren't sure.

All requisites should be available for your distribution. The most important are :

* [Git](https://git-scm.com/downloads)
* [Docker CE for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1)
* [Docker CE for MacOS](https://store.docker.com/editions/community/docker-ce-desktop-mac)
* [Docker CE Edge for MacOS (v.18.05.0-cd-mac67)](https://download.docker.com/mac/edge/25042/Docker.dmg)

**Docker-sync for MacOS**

If you use a MacOS laptop you must need install Docker-sync, in this case you can use this command:

```sh 
gem install docker-sync
```

**How to execute docker without sudo in Linux?**

To execute docker without need use sudo you can use this tip (only for Ubuntu):

```sh
sudo gpasswd -a $USER docker
```

```sh
sudo setfacl -m user:$USER:rw /var/run/docker.sock
```

**How to obtain a Docker good performance in MacOS?**

###### 1.- Computer, Cores & RAM
Go to Docker > Preferences > Advanced and set the "computing resources dedicated to Docker" with the correct values for your PC.

###### 2.- Docker Disk Type
Set the Overlay2 Filesystem in Daemon > Advanced. Basically, you want to add a property of "storage-driver": "overlay2" (check if you need add "," at the end of the line).

**How to update docker-compose Linux&MacOS**

To update docker-compose to the correct version try to execute this commands:

```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```


### Software version

* Docker: 18.09.02-ce Linux/MacOS
* Docker-compose: 1.23.2
* Python: 2.7.12
  - docker==3.2.1
  - docker-compose==1.8.0
  - docker-py==1.10.6
  - docker-pycreds==0.2.2
  - dockerpty==0.4.1
* Docker-sync: 0.5.11



This project use the following ports :

| Server             | Port  |
|--------------------|-------|
| Node server        | 3000  |



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