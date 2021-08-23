# Stage 1 - build the app
# pull official base image
FROM node:15.14-alpine as build-step

# set working directory
WORKDIR /app

# Add app
COPY . ./

# install app dependencies
RUN npm ci
# build it for production
RUN npm run build

# Stage 2 - Web server for the prod build
FROM nginx:1.19-alpine

EXPOSE 80

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-step /app/build /usr/share/nginx/html

# Copy our custom docker-entrypoint script so we can setup
# Runtime Environment Variables in our env / config file
COPY ./docker-entrypoint.sh /usr/bin/docker-entrypoint.sh
RUN chmod +x /usr/bin/docker-entrypoint.sh

# This is important for the docker-entrypoint script to run
WORKDIR /usr/share/nginx/html

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
