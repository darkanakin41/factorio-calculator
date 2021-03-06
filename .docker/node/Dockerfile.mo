FROM node:13
LABEL maintainer="Pierre LEJEUNE <darkanakin41@gmail.com>"
{{#DOCKER_DEVBOX_COPY_CA_CERTIFICATES}}

COPY .ca-certificates/* /usr/local/share/ca-certificates/
RUN update-ca-certificates
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
{{/DOCKER_DEVBOX_COPY_CA_CERTIFICATES}}

# Mise à jour de npm
RUN npm i --global npm

# fixuid
ADD fixuid.tar.gz /usr/local/bin
RUN chown root:root /usr/local/bin/fixuid && \
    chmod 4755 /usr/local/bin/fixuid && \
    mkdir -p /etc/fixuid
COPY fixuid.yml /etc/fixuid/config.yml

WORKDIR /app

USER node

RUN yarn config set cafile ${NODE_EXTRA_CA_CERTS} --global
RUN npm config set prefix /home/node/.npm-packages
ENV PATH="${PATH}:/home/node/.npm-packages/bin"


RUN npm install -g @vue/cli

VOLUME /app
VOLUME /home/node/.cache
