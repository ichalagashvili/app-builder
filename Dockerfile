# FROM centos/nginx-112-centos7:latest
# EXPOSE 8081
# COPY ./build /opt/app-root/src/app-builder
# USER root
# RUN fix-permissions /opt/app-root/src/app-builder
# COPY ./nginx.conf ${NGINX_CONF_PATH}
# USER default
# COPY ./docker-entrypoint.sh /usr/local/bin
# ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
# CMD ${STI_SCRIPTS_PATH}/run

# FROM node:12

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# RUN npm install
# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . .

# COPY ./docker-entrypoint.sh /usr/local/bin
# ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# EXPOSE 8080
# CMD [ "npm", "start" ]
