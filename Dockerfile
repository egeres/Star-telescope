# Multistage docker build
# Compile code in build container -> compiled files -> production container

FROM node:15.12.0-alpine as base
# Build container
FROM base as build
WORKDIR /build
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

# Production container
FROM base as prod
WORKDIR /app
COPY --from=build /build/build .
RUN npm i -g serve
EXPOSE 5000
RUN adduser -D appuser
USER appuser
ENTRYPOINT ["serve", "-s"]
