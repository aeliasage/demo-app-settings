# Azure Container App Service App Settings Demo

Azure App Service appsettings are not being picked up by our docker image. This repository aims to demonstrate that.

## Local Development Environment

### Docker Compose

For local testing purposes you may leverage Docker Compose.

Details on installation of Docker Compose can be found [here](https://docs.docker.com/compose/install/)

### Proxy Services

We want to encapsulate interactions with external APIs. In order to accomplish this goal we have created [api-request.tsx](src/services/api-request.tsx) and [contact.service.tsx](src/services/contact.service.tsx) as our current example.

## Containerization

A [Dockerfile](Dockerfile) and [docker-compose](docker-compose.yml) definition file are included in the root directory.

To build with docker-compose you can run `docker-compose up` in the root directory then navigate to the hosted application at http://localhost:3000/.

To clean up a docker-compose instance once you are finished testing the application you can run `Ctrl+C` to exit the process then `docker-compose down` in the root directory to remove the running docker artifacts. When needed, you can also force a rebuild of the docker image with `docker-compose up --build`.

You can also start docker-compose in detached mode with `docker-compose up -d` which will return control of your terminal to you. Be sure to `docker-compose down` when finished.

## Configuration

For local development, additional configurations are read by the [app-config.service.tsx](src/services/app-config.service.tsx) from a `.env` file similar to [.env.example](.env.example).

For the containerized UI, such as what is deployed to our DevTest environment, configurations are ready by the same [app-config.service.tsx](src/services/app-config.service.tsx) but by checking the [config.json](public/config.json). Note that the values you will see there are actually the names of environment variables like `$EXAMPLE_VAR`. The [Dockerfile](Dockerfile) is responsible for making sure those variables are resolved using the environment variables passed to the container and leverages the [docker-entrypoint.sh](docker-entrypoint.sh) for handling this environment variable substition process.

An example of providing environment variables to the container can be ovserved in the [docker-compose.yml](docker-compose.yml) file. For a deployed instance in Azure, the Azure App Service's App Settings will be provided to the container similarly to running `docker run -e EXAMPLE_VAR=http://localhost:8080` where `EXAMPLE_VAR` is an app setting and also a value referenced in the `config.json`.
