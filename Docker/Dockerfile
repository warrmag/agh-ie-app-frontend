FROM node:12.7.0

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json package-lock.json /app/

RUN npm install -g @angular/cli@8.2.0

RUN npm install --save core-js@^3
RUN npm install

CMD ng serve --host 0.0.0.0
