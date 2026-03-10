FROM node:25.8.0

RUN mkdir -p /opt/app
WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm install

# Copy local working directory to set container directory
COPY ./ ./

EXPOSE 3000

RUN ls

CMD [ "npm" , "start" ]

# BUILD
# docker build -t node-docker .

# RUN
# docker run -it -p 3000:3000 node-docker