[![Docker Image Build and Push to Dockerhub - CI/CD](https://github.com/KlausSchaefers/bawdicsoft/actions/workflows/docker.yml/badge.svg)](https://github.com/KlausSchaefers/bawdicsoft/actions/workflows/docker.yml)

# Bawdicsoft - Prototype, Test and Learn

Quant UX is a research, usability and prototyping tool to quickly test your designs and get data driven insights.
This repo contains the front end. You can find a working demo at https://www.bawdicsoft.com/

![Alt text](docs/preview.jpg?raw=true "Bawdicsoft preview")

## Develpment setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

# Installation

The easiest way to get your own installation up and running is using the prebuild Docker images by [Brian McGonagill](https://github.com/bmcgonag). You can find the repo and instructions at https://github.com/bmcgonag/bawdicsoft-docker/

## Manual Installation

Bawdicsoft has two components. A front-end (this package) and a backend (qux-java). The front-end needs Node.js (> 12) installed. The backend needs a Mongo DB, a Mail Server (SMTP) and Java (> 1.8). The front-end comes with it's own mini web server, which also include a proxy that redirects all request to the correct backend.

## Docker

The easiest way to get your own Bawdicsoft installation running is using the Docker images.

1. Create a docker compose file (`docker-compose.yaml`) and set the environment variables.

```yaml
version: "3"

services:
  mongo:
    restart: always
    container_name: bawdicsoft-mongo
    image: mongo
    volumes:
      - ./data:/data/db # pth for the data to be stored and kept on your host machine is on the left side of the ":"
  qux-fe:
    restart: always
    container_name: bawdicsoft-frontend
    image: klausenschaefersinho/bawdicsoft
    environment:
      - QUX_PROXY_URL=http://bawdicsoft-backend:8080 # this is the path the front end uses to talk tot he backend
      - QUX_AUTH=qux
      - QUX_KEYCLOAK_REALM=
      - QUX_KEYCLOAK_CLIENT=
      - QUX_KEYCLOAK_URL=
      - QUX_WS_URL=ws://127.0.0.1:8086 # change to where the websocket server is deployed for external access
    links:
      - mongo
      - qux-be
    ports:
      - 8082:8082 # change the left side port if your host machine already has 8082 in use
    depends_on:
      - qux-be
  qux-be:
    restart: always
    container_name: bawdicsoft-backend
    image: klausenschaefersinho/bawdicsoft-backend
    volumes:
      - ./bawdicsoft-data:/app-data
    environment:
      - QUX_HTTP_HOST=http://bawdicsoft-frontend:8082 # this is the URL included in the mails, e.g. password resets
      - QUX_HTTP_PORT=8080 # This is the port the backend will use
      - QUX_MONGO_DB_NAME=quantux # the database / collection name in mongodb
      - QUX_MONGO_TABLE_PREFIX=quantux # table / document prefix in mongodb
      - QUX_MONGO_CONNECTION_STRING=mongodb://bawdicsoft-mongo:27017 # this assumes your mongodb container will be called "bawdicsoft-mongo" in the docker-compose file
      - QUX_MAIL_USER=mail_admin@example.com # this should be your smtp email user
      - QUX_MAIL_PASSWORD=sTr0ngPa55w0Rd # this should be your smtp email password
      - QUX_MAIL_HOST=mail.example.com # this should be your smtp host address
      - QUX_JWT_PASSWORD=some-long-string-of-mix-case-chars-and-nums # you should change this to a real JWT secret
      - QUX_IMAGE_FOLDER_USER=/app-data/qux-images # this folder should mapped in the volume
      - QUX_IMAGE_FOLDER_APPS=/app-data/qux-image-apps # this folder should mapped in the volume
      - TZ=America/Chicago # change to your timezone
      - QUX_AUTH_SERVICE=qux
      - QUX_KEYCLOAK_SERVER= # just the keycloak host & port
      - QUX_KEYCLOAK_REALM=
      - QUX_USER_ALLOW_SIGNUP=true # set the false to not allow users to signup
      - QUX_USER_ALLOWED_DOMAINS=* # comma separated list of domains, e.g. 'my-server.com' or '*' for all
    depends_on:
      - mongo
  qux-ws:
    restart: always
    container_name: bawdicsoft-websocket-server
    image: klausenschaefersinho/bawdicsoft-websocket
    environment:
      - QUX_SERVER=http://bawdicsoft-backend:8080/
      - QUX_SERVER_PORT=8086
    ports:
      - 8086:8086
    links:
      - qux-be
    depends_on:
      - qux-be
```

Make sure to update `QUX_JWT_PASSWORD` the ENV variable to make sure your installation is secure.
Update `QUX_HTTP_HOST`, `QUX_MAIL_USER`, `QUX_MAIL_PASSWORD` and `QUX_MAIL_HOST` to sure correct mail handling

2. Start the containers with the following command

```bash
docker compose up
```

## One-Click deployment

### Elestio

You can deploy an instance of Quant UX with few clicks and minimal configuration on cloud service provider of your choice.

[![Deploy](https://pub-da36157c854648669813f3f76c526c2b.r2.dev/deploy-on-elestio-black.png)](https://elest.io/open-source/bawdicsoft)

## Kubernets

You can find a kubernets configuration here https://github.com/engmsilva/bawdicsoft-k8s/tree/master/k8s

### Backend

- Install Mongo DB (> 4.4)

- Install Java (1.8)

- Checkout the backend

```
git clone https://github.com/KlausSchaefers/qux-java.git
```

- This contains already a compiled version of the backend in the release folder

- Edit the matc.conf file to setup the correct mongo and mails server details. More details can be found here: https://github.com/KlausSchaefers/qux-java

- Start the server, or install as a service in Linux.

```
java -jar release/matc.jar -Xmx2g -conf matc.conf -instances 1
```

### Front-end

- Install Node.js (> 12)

- Clone repo

```
git clone https://github.com/KlausSchaefers/bawdicsoft.git
```

- Install all dependecies:

```
npm install
```

- Build

```
npm run build
```

### Config front-end

- Set the proxy server url as an ENV variable

```
export QUX_PROXY_URL=https://your.bawdicsoft.server.com // backend host

export QUX_WS_URL= wss.bawdicsoft.server.com // web socket server

```

- Start

```
node server/start.js
```

### Reverse Proxy

Now you should have a running system. It is not secure yet. The best is to put both behind a NGINX reverse proxy, which handles SSL.

- https://www.scaleway.com/en/docs/tutorials/nginx-reverse-proxy/

You can use https://letsencrypt.org/ to create SSL certificates
