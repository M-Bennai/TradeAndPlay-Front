FROM node:14.17.5 as builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends apt-utils \
    && apt-get install -y --force-yes python python-dev autoconf g++ make nasm bzip2

# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . ./

ENV NODE_ENV production
ARG API_GATEWAY
ENV REACT_APP_API_URL=$API_GATEWAY

RUN npm run build

#Stage 2
#######################################
#pull the official nginx base image
FROM nginx:alpine
#copies React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

ENV PORT 80

EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
