const nodemailer = require("nodemailer")
const core = require("@actions/core")
const fs = require("fs")
const showdown = require('showdown')

function getBody(bodyOrFile, convertMarkdown) {
    let body = bodyOrFile

    // Read body from file
    if (bodyOrFile.startsWith("file://")) {
        const file = bodyOrFile.replace("file://", "")
        body = fs.readFileSync(file, "utf8")
    }

    // Convert Markdown to HTML
    if (convertMarkdown) {
        const converter = new showdown.Converter()
        body = converter.makeHtml(body)
    }

    return body
}

function getFrom(from, username) {
    if (from.match(/.+<.+@.+>/)) {
        return from
    }

    return `"${from}" <${username}>`
}

async function main() {
    try {
        const transport = core.getInput("transport", { required: true }).toLowerCase();
        const isSmtp = transport === 'smtp';
        const serverAddress = core.getInput("server_address", { required: isSmtp })
        const serverPort = core.getInput("server_port", { required: isSmtp })
        const username = core.getInput("username", { required: isSmtp })
        const password = core.getInput("password", { required: isSmtp })
        const subject = core.getInput("subject", { required: true })
        const body = core.getInput("body", { required: true })
        const from = core.getInput("from", { required: true })
        const to = core.getInput("to", { required: true })
        const cc = core.getInput("cc", { required: false })
        const bcc = core.getInput("bcc", { required: false })
        const contentType = core.getInput("content_type", { required: true })
        const attachments = core.getInput("attachments", { required: false })
        const convertMarkdown = core.getInput("convert_markdown", { required: false })

        let transporter;

        if (transport == 'aws-ses') {
            let aws = require("@aws-sdk/client-ses");
            const ses = new aws.SES({
                apiVersion: "2010-12-01",
            });
            transporter = nodemailer.createTransport({
                SES: { ses, aws },
            });
        } else {
            transporter = nodemailer.createTransport({
                host: serverAddress,
                port: serverPort,
                secure: serverPort == "465",
                auth: {
                    user: username,
                    pass: password,
                }
            })
        };

        const info = await transporter.sendMail({
            from: getFrom(from, username),
            to: to,
            cc: cc ? cc : undefined,
            bcc: bcc ? bcc : undefined,
            subject: subject,
            text: contentType != "text/html" ? getBody(body, convertMarkdown) : undefined,
            html: contentType == "text/html" ? getBody(body, convertMarkdown) : undefined,
            attachments: attachments ? attachments.split(',').map(f => ({ path: f.trim() })) : undefined
        })
    } catch (error) {
        core.setFailed(error.message)
    }
}

main()
