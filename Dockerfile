FROM node:4.1.2
COPY . /mogno-ipe
WORKDIR /mogno-ipe
RUN npm install

EXPOSE 12739

CMD ["/bin/sh", "-c", "node ."]
