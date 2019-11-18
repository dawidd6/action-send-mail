FROM ruby:2.6-alpine

COPY entrypoint.rb /

ENTRYPOINT ["/entrypoint.rb"]
