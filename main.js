const nodemailer = require("nodemailer")
const core = require("@actions/core")
const fs = require("fs")

function get_body(body) {
    if (body.startsWith("file://")) {
        body = body.replace("file://", "")
        body = fs.readFileSync(body).toString()
    }

    return body
}

async function main() {
    server_address = core.getInput("server_address", {required: true})
    server_port = core.getInput("server_port", {required: true})
    username = core.getInput("username", {required: true})
    password = core.getInput("password", {required: true})
    subject = core.getInput("subject", {required: true})
    body = core.getInput("body", {required: true})
    to = core.getInput("to", {required: true})
    from = core.getInput("from", {required: true})
    html = core.getInput("html")

    transport = nodemailer.createTransport({
        host: server_address,
        port: server_port,
        secure: server_port == "465",
        auth: {
            user: username,
            pass: password,
        }
    })

    info = await transport.sendMail({
        from: `"${from}" <${username}>`,
        to: to,
        subject: subject,
        text: !html ? get_body(body) : undefined,
        html: html ? get_body(body) : undefined,
    })

    console.log(info)
}

main()