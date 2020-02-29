# Send mail Github Action

An action that simply sends a mail to multiple recipients.

## Usage

```yaml
- name: Send mail
  uses: dawidd6/action-send-mail@master
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
    to: obiwan@tatooine.com,yoda@dagobah.com
    from: Luke Skywalker
    # Is body a HTML document?:
    html: true
```
