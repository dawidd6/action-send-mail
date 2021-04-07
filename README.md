# Send mail Github Action

An action that simply sends a mail to multiple recipients.

## Usage

```yaml
- name: Send mail
  uses: dawidd6/action-send-mail@v2
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{secrets.MAIL_USERNAME}}
    password: ${{secrets.MAIL_PASSWORD}}
    subject: Github Actions job result
    # Literal body:
    body: Build job of ${{github.repository}} completed successfully!
    # Read file contents as body:
    body: file://README.md
    to: obiwan@example.com,yoda@example.com
    from: Luke Skywalker # <user@example.com>
    # Optional carbon copy recipients
    cc: kyloren@example.com,leia@example.com
    # Optional blind carbon copy recipients
    bcc: r2d2@example.com,hansolo@example.com
    # Optional recipient of the email response
    replyTo: luke@skywalter.com
    # Optional unsigned/invalid certificates allowance:
    ignore_cert: true
    # Optional content type (defaults to text/plain):
    content_type: text/html
    # Optional converting Markdown to HTML (set content_type to text/html too):
    convert_markdown: true
    # Optional attachments:
    attachments: attachments.zip,git.diff,./dist/static/main.js
```
