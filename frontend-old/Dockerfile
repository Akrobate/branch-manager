FROM node:12.10.0 as build-stage
ARG VITE_API_URL
ENV VITE_API_URL $VITE_API_URL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build
RUN echo $VITE_API_URL
RUN printenv

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
RUN printenv