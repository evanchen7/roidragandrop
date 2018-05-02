
# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
# Running alpine variant for performant and lightweight linux
FROM node:alpine
ENV NPM_CONFIG_LOGLEVEL warn

# Copy all local files into the image.
ADD yarn.lock /yarn.lock
ADD package.json /package.json
RUN yarn global add pm2
COPY . .

# Alpine workaround, will remove once developers fix the issue
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && yarn install --ignore-engines\
    && apk del .gyp

# Build for production.
RUN yarn build

EXPOSE 3000

CMD ["pm2", "start", "process.yml", "--no-daemon"]
