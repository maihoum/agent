FROM ruby:2.5.3-alpine3.7 as builder

ENV NODE_ENV=production

RUN apk add --no-cache \
    build-base \
    tzdata \
    busybox \
    ca-certificates \
    git \
    nodejs \
    postgresql-dev \
    yarn \
    postgresql-client

RUN mkdir -p /app
WORKDIR /app

COPY Gemfile Gemfile.lock /app/

RUN bundle install --deployment --no-cache --without development test \
    && rm -rf vendor/bundle/ruby/2.5.0/cache/*

COPY package.json yarn.lock /app/

RUN yarn install

COPY . .

COPY config/database.yml.production config/database.yml

RUN bundle exec rake assets:precompile \
    && rm -rf node_modules tmp/* log/*

FROM ruby:2.5.3-alpine3.7

ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

ENV TZ Europe/Stockholm

RUN apk add --no-cache \
    busybox \
    tzdata \
    ca-certificates \
    postgresql-client \
    nodejs

RUN mkdir -p /app
WORKDIR /app

COPY --from=builder /app/ .
COPY --from=builder /usr/local/bundle/ /usr/local/bundle/
