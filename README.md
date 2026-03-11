# Send mail GitHub Action

An action that simply sends a mail to multiple recipients.

Some features:

- plain text body
- HTML body
- multipart body (plain text + HTML)
- Markdown to HTML converting (use `html_body`, not `body`)
- file attachments (supports globbing)

## Usage

```yaml
- name: Send mail
  uses: dawidd6/action-send-mail@<REF>
  env:
    # Optional http proxy:
    HTTP_PROXY: http://proxy.example.test:3128
  with:
    # Specify connection via URL (replaces server_address, server_port, secure,
    # username and password)
    #
    # Format:
    #
    #  * smtp://user:password@server:port
    #  * smtp+starttls://user:password@server:port
    connection_url: ${{secrets.MAIL_CONNECTION}}

    # Required mail server address if not connection_url:
    server_address: smtp.gmail.com

    # Server port, default 25:
    server_port: 465

    # Optional whether this connection use TLS (default is true if server_port is 465)
    secure: true

    # Optional (recommended) mail server username:
    username: ${{secrets.MAIL_USERNAME}}

    # Optional (recommended) mail server password:
    password: ${{secrets.MAIL_PASSWORD}}

    # Required mail subject:
    subject: Github Actions job result

    # Optional recipients. Separate multiple addresses by a comma (possibly surrounded by whitespace):
    to: obiwan@example.com, yoda@example.com

    # Required sender (supported formats: see "Supported address formats" below)
    from: 'Luke Skywalker <user@example.com>'

    # Optional plain body:
    body: Build job of ${{github.repository}} completed successfully!

    # Optional HTML body read from file:
    html_body: file://README.html

    # Optional carbon copy recipients. Separate multiple addresses by a comma (possibly surrounded by whitespace):
    cc: 'kyloren@example.com, "Her Majesty, Princess Leia" <leia@example.com>'

    # Optional blind carbon copy recipients. Separate multiple addresses by a comma (possibly surrounded by whitespace):
    bcc: r2d2@example.com, hansolo@example.com

    # Optional recipient of the email response:
    reply_to: luke@example.com

    # Optional Message ID this message is replying to:
    in_reply_to: '<3cc627c8-6181-453b-d90b-04aae9e23b21@github.com>'

    # Optional unsigned/invalid certificates allowance:
    ignore_cert: true

    # Optional converting Markdown to HTML (set content_type to text/html too):
    convert_markdown: true

    # Optional attachments:
    attachments: attachments.zip,git.diff,./dist/static/*.js

    # Optional priority: 'high', 'normal' (default) or 'low'
    priority: low

    # Optional custom headers:
    headers: '{"X-Priority": "3 (Normal)", "X-My-Header": "MyValue"}'

    # Optional nodemailerlog: true/false
    nodemailerlog: false

    # Optional nodemailerdebug: true/false if true nodemailerlog will also be set true
    nodemailerdebug: false

    # Optional custom SMTP MAIL FROM address (overrides username):
    envelope_from: mailer@example.com

    # Optional custom SMTP RCPT TO addresses (overrides to, cc, bcc). Separate multiple addresses by a comma (possibly surrounded by whitespace):
    envelope_to: mailer@example.com, admin@example.com
```
### Remark for `envelope_from` and `envelope_to`

[nodemailer](https://nodemailer.com/) (the node module that does the actual sending) requires that if the optional custom envelope is used, **both** its attributes `from` and `to` must be set. To facilitate setting only one of `envelope_from` or `envelope_to`, this action sets the other one from the regular message fields in the following way:

* If only `envelope_from` is set, `envelope_to` will be set to the concatenation of `to`, `cc` and `bcc` (with duplicates removed).
* If only `envelope_to` is set, `envelope_from` will be set to the address specified in `from`.

### Supported address formats
This action now uses nodemailer's addressparser. The supported address formats are described [here](https://nodemailer.com/message/addresses).
Mail addresses can contain YAML special characters like '<' and '>'. Therefore, these addresses should always be enclosed in single quotes.

## Troubleshooting

### Gmail

Instead of using your normal Google password, use an App password.

1. [Enable 2-Step Verification](https://support.google.com/accounts/answer/185839?hl=en&co=GENIE.Platform%3DAndroid). This is needed to create an App password.
2. [Create an App password](https://support.google.com/accounts/answer/185833?hl=en) for `Mail`.

### Unauthenticated login (username/password fields)

The parameters `username` and `password` are set as optional to support self-hosted runners access to on-premise infrastructure. If
you are accessing public email servers make sure you provide a username/password authentication through [GitHub Secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) to make the email delivery secure.
