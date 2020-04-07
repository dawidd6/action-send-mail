const nodemailer = require("nodemailer")
const core = require("@actions/core")
const fs = require("fs")

function get_body(body) {
    if (body.startsWith("file://")) {
        const file = body.replace("file://", "")
        return fs.readFileSync(file, "utf8")
    }

    return body
}

function get_from(from, username) {
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

        const info = await transport.sendMail({
            from: get_from(from, username),
            to: to,
            subject: subject,
            text: content_type != "text/html" ? get_body(body) : undefined,
            html: content_type == "text/html" ? get_body(body) : undefined,
            attachments: attachments ? attachments.split(',').map(f => ({ path: f.trim() })) : undefined
        })

        console.log(info)
    } catch (error) {
        core.setFailed(error.message)
    }
}

main()
