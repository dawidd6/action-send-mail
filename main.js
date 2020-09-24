const nodemailer = require("nodemailer")
const core = require("@actions/core")
const fs = require("fs")

function getBody(body) {
    if (body.startsWith("file://")) {
        const file = body.replace("file://", "")
        return fs.readFileSync(file, "utf8")
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
        const server_address = core.getInput("server_address", { required: true })
        const server_port = core.getInput("server_port", { required: true })
        const username = core.getInput("username", { required: true })
        const password = core.getInput("password", { required: true })
        const subject = core.getInput("subject", { required: true })
        const body = core.getInput("body", { required: true })
        const to = core.getInput("to", { required: true })
        const from = core.getInput("from", { required: true })
        const content_type = core.getInput("content_type", { required: true })
        const attachments = core.getInput("attachments", { required: false })

        const transport = nodemailer.createTransport({
            host: server_address,
            port: server_port,
            secure: server_port == "465",
            auth: {
                user: username,
                pass: password,
            }
        })

        console.log(transport.options)

        const info = await transport.sendMail({
            from: getFrom(from, username),
            to: to,
            subject: subject,
            text: content_type != "text/html" ? getBody(body) : undefined,
            html: content_type == "text/html" ? getBody(body) : undefined,
            attachments: attachments ? attachments.split(',').map(f => ({ path: f.trim() })) : undefined
        })

        console.log(info)
    } catch (error) {
        core.setFailed(error.message)
    }
}

main()
