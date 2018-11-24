# Use an official node runtime as a parent image
FROM node:10.13.0-slim

# Set the working directory to /app
WORKDIR /app

# APT packages
RUN apt-get -qq update
RUN apt-get -qq install libgconf-2-4 libgtk2.0-0 libx11-xcb-dev libxtst-dev libxss-dev libnss3-dev libasound-dev xvfb

# NPM packages
ADD ./package.json    /app
RUN npm i

# Project files
ADD ./dist            /app/dist
ADD ./server.js       /app
ADD ./admin.js        /app
ADD ./start.sh        /app

# entry script
RUN chmod +x start.sh

# Make ports available to the world outside this container
EXPOSE 80
EXPOSE 8080

# ENV variable
ENV PATH="/app/node_modules/electron/dist:${PATH}"

# Run app when the container launches
CMD ["./start.sh"]
