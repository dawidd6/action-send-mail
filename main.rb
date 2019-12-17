#!/usr/bin/env ruby
# frozen_string_literal: true

require 'net/smtp'

# Inputs
server_address = ENV['INPUT_SERVER_ADDRESS']
server_port = ENV['INPUT_SERVER_PORT']
username = ENV['INPUT_USERNAME']
password = ENV['INPUT_PASSWORD']
subject = ENV['INPUT_SUBJECT']
body = ENV['INPUT_BODY']
to = ENV['INPUT_TO']
from = ENV['INPUT_FROM']
content_type = ENV['INPUT_CONTENT_TYPE'] || 'text/plain'

# Body
prefix = 'file://'
body = if body.start_with?(prefix)
         path = body.delete_prefix(prefix)
         File.read(path)
       else
         body
       end

# Message
message = <<~END_OF_MESSAGE
  Content-Type: #{content_type}; charset=utf-8
  Subject: #{subject}
  From: #{from} <#{username}>

  #{body}
END_OF_MESSAGE

# Send
begin
  smtp = Net::SMTP.new(server_address, server_port.to_i)
  smtp.enable_tls
  smtp.start(server_address, username, password, :login)
  smtp.send_message(message, username, to.split(','))
rescue StandardError => e
  puts "Error: #{e.message}"
  exit 1
end
