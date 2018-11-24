# axess

> XSS vulnerable web application

## Build Setup

``` bash

# on linux, make sure libgconf is installed
sudo apt-get install libgconf-2-4

# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run serve:dev

# serve dist
npm run serve:dist

# serve api
npm run serve:api

# build for production with minification
npm run build
```

## Docker image
To use docker image, clone the `docker-image` branch
``` bash
# clone project
git clone https://www.github.com/AnisBdz/axess
git checkout docker-image

# build docker image
docker build -t axess .

# run the image
docker run -d -p 8080:8080 -p 80:80 axess
```
