/server_address: jazeerapaints0@gmail.com
    server_port: 465
    username: ${{secrets.MAIL_osulieman@jazeerapaints.com}}
    password: ${{secrets.MAIL_Asdfghjkl0@}}
    subject: Github Actions job result
    # Literal body:
    body: Build job of ${{github.repository}} completed successfully!
    # Read file contents as body:
    body: file://README.md
    to: obiwan@example.com,yoda@example.com
    from: Luke Skywalker # <your@example.com>
    # Optional carbon copy recipients
    cc: kyloren@example.com,leia@example.com
    # Optional blind carbon copy recipients
    bcc: r2d2@example.com,hansolo@example.com
    # Optional content type (defaults to text/plain):
    content_type: text/html
    # Optional converting Markdown to HTML (set content_type to text/html too):
    convert_markdown: true
    # Optional attachments:
    attachments: attachments.zip,git.diff,./dist/static/main.js
```
