FROM node@sha256:957dbf2afb4f22d9e2b94b981e242cbb796965cd3d9cc02d436e2a05fa0ec300

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

ENV YARN_CACHE_FOLDER=/tmp/yarn-cache
ENV YARN_GLOBAL_FOLDER=/tmp/yarn-global
ENV TMPDIR=/tmp

RUN yarn config set global-folder $YARN_GLOBAL_FOLDER && \
    yarn install --production=true --cache-folder "$YARN_CACHE_FOLDER" --ignore-scripts

COPY ./dist ./dist/

COPY .env ./

USER node

CMD [ "yarn", "start" ]
