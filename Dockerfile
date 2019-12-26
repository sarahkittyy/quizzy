FROM ubuntu:18.04

EXPOSE 3000
EXPOSE 3001

VOLUME ["/app"]
WORKDIR /app

RUN apt-get update -y

# install node & npm
RUN apt install -y nodejs
RUN apt install -y npm

RUN npm install

ENTRYPOINT npm run dev