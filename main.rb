#!/usr/bin/env ruby
# frozen_string_literal: true

require 'net/smtp'

# Inputs
address = ENV['INPUT_SERVER_ADDRESS']
port = ENV['INPUT_SERVER_PORT']
username = ENV['INPUT_USERNAME']
password = ENV['INPUT_PASSWORD']
subject = ENV['INPUT_SUBJECT']
body = ENV['INPUT_BODY']
to = ENV['INPUT_TO']
from = ENV['INPUT_FROM']

# Message
message = <<~END_OF_MESSAGE
  Subject: #{subject}
  From: #{from} <#{username}>

  #{body}
END_OF_MESSAGE

# Send
begin
  smtp = Net::SMTP.new(address, port.to_i)
  smtp.enable_tls
  smtp.start(address, username, password, :login)
  smtp.send_message(message, username, to.split(','))
rescue StandardError => e
  puts "Error: #{e.message}"
  exit 1
end
