# Send mail Github Action

An action that simply sends a mail to multiple recipients.

Some features:
- plain text body
- HTML body
- multipart body (plain text + HTML)
- Markdown to HTML converting
- file attachments (supports globbing)


## Usage

```yaml
- name: Send mail
  uses: dawidd6/action-send-mail@v3
  with:
    # Required mail server address:
    server_address: smtp.gmail.com
    # Required mail server port:
    server_port: 465
    # Optional (recommended): mail server username:
    username: ${{secrets.MAIL_USERNAME}}
    # Optional (recommended) mail server password:
    password: ${{secrets.MAIL_PASSWORD}}
    # Required mail subject:
    subject: Github Actions job result
    # Required recipients' addresses:
    to: obiwan@example.com,yoda@example.com
    # Required sender full name (address can be skipped):
    from: Luke Skywalker # <user@example.com>
    # Optional whether this connection use TLS (default is true if server_port is 465)
    secure: true
    # Optional plain body:
    body: Build job of ${{github.repository}} completed successfully!
    # Optional HTML body read from file:
    html_body: file://README.html
    # Optional carbon copy recipients:
    cc: kyloren@example.com,leia@example.com
    # Optional blind carbon copy recipients:
    bcc: r2d2@example.com,hansolo@example.com
    # Optional recipient of the email response:
    reply_to: luke@example.com
    # Optional Message ID this message is replying to:
    in_reply_to: <random-luke@example.com>
    # Optional unsigned/invalid certificates allowance:
    ignore_cert: true
    # Optional converting Markdown to HTML (set content_type to text/html too):
    convert_markdown: true
    # Optional attachments:
    attachments: attachments.zip,git.diff,./dist/static/*.js
    # Optional priority: 'high', 'normal' (default) or 'low'
    priority: low
```

## Troubleshooting

### Gmail

Gmail security settings may cause this Action to fail. This failure may involve a message in the GitHub Actions details about access being denied and an email from Google to the email account being used about a sign-in being blocked and why.

Changes in Gmail settings may be necessary to get this action to work.
1. Google treats this method of using email as a "Less Secure App". However, "Less Secure Apps" can be enabled in [Google profile settings](https://myaccount.google.com/lesssecureapps).
2. IMAP needs to be enabled in Gmail settings as described [here](https://support.google.com/mail/answer/7126229?hl=en).
3. If the Gmail account you're trying to use in this Action is already 2FA (Two Factor Authentication) enabled, the 2FA password will need to be provided as well, which isn't included in the default template.

Users who have had problems have reported success by doing each of these three steps or by doing the first two steps and using a Gmail account that didn't have 2FA enabled.

### Unauthenticated login (username/password fields)

The parameters `username` and `password` are set as optional to support self-hosted runners access to on-premise infrastructure. If
you are accessing public email servers make sure you provide a username/password authentication through [GitHub Secrets](https://docs.github.com/en/actions/reference/encrypted-secrets) to make the email delivery secure.
