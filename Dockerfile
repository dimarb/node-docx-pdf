FROM alpine:latest


RUN apk add libreoffice
RUN apk add nodejs
RUN apk add npm
RUN apk add --no-cache msttcorefonts-installer fontconfig
RUN update-ms-fonts

COPY ./src /src

WORKDIR /src

RUN npm install

CMD  cd /src && node index.js
