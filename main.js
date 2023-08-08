const nodemailer = require("nodemailer")
const core = require("@actions/core")
const glob = require("@actions/glob")
const fs = require("fs")
const showdown = require("showdown")
const path = require("path")

function getText(textOrFile, convertMarkdown) {
    let text = textOrFile

    // Read text from file
    if (textOrFile.startsWith("file://")) {
        const file = textOrFile.replace("file://", "")
        text = fs.readFileSync(file, "utf8")
    }

    // Convert Markdown to HTML
    if (convertMarkdown) {
        const converter = new showdown.Converter()
        text = converter.makeHtml(text)
    }

    return text
}

function getFrom(from, username) {
    if (from.match(/.+ <.+@.+>/)) {
        return from
    }

    return `"${from}" <${username}>`
}

async function getAttachments(attachments) {
    const globber = await glob.create(attachments.split(',').join('\n'))
    const files = await globber.glob()
    return files.map(f => ({ filename: path.basename(f), path: f, cid: f.replace(/^.*[\\\/]/, '')}))
}

async function main() {
    try {
        let serverAddress = core.getInput("server_address")
        let serverPort = core.getInput("server_port")
        let secure = core.getInput("secure")
        let username = core.getInput("username")
        let password = core.getInput("password")

        if (!secure) {
            secure = serverPort === "465" ? "true" : "false"
        }

        const connectionUrl = core.getInput("connection_url")
        if (connectionUrl) {
            const url = new URL(connectionUrl)
            switch (url.protocol) {
                default:
                    throw new Error(`Unsupported connection protocol '${url.protocol}'`)
                case "smtp:":
                    serverPort = "25"
                    secure = "false"
                    break
                case "smtp+starttls:":
                    serverPort = "465"
                    secure = "true"
                    break
            }
            if (url.hostname) {
                serverAddress = url.hostname
            }
            if (url.port) {
                serverPort = url.port
            }
            if (url.username) {
                username = unescape(url.username)
            }
            if (url.password) {
                password = unescape(url.password)
            }
        }

        const subject = core.getInput("subject", { required: true })
        const from = core.getInput("from", { required: true })
        const to = core.getInput("to", { required: true })
        const body = core.getInput("body", { required: false })
        const htmlBody = core.getInput("html_body", { required: false })
        const cc = core.getInput("cc", { required: false })
        const bcc = core.getInput("bcc", { required: false })
        const replyTo = core.getInput("reply_to", { required: false })
        const inReplyTo = core.getInput("in_reply_to", { required: false })
        const attachments = core.getInput("attachments", { required: false })
        const convertMarkdown = core.getInput("convert_markdown", { required: false })
        const ignoreCert = core.getInput("ignore_cert", { required: false })
        const ciphersSSLv3 = core.getInput("ciphers_sslv3", { required: false })
        const priority = core.getInput("priority", { required: false })

        if (!serverAddress) {
            throw new Error("Server address must be specified")
        }

        if (!username || !password) {
            core.warning("Username and password not specified. You should only do this if you are using a self-hosted runner to access an on-premise mail server.")
        }

        const transportOptions = {
            host: serverAddress,
            auth: username && password ? {
                user: username,
                pass: password
            } : undefined,
            port: serverPort,
            secure: secure === "true",
            tls: ignoreCert == "true" ? {
                rejectUnauthorized: false
            } : undefined,
        }

        if (ignoreCert == "true" && ciphersSSLv3 == "true") {
            transportOptions.tls.ciphers = 'SSLv3'
        }

        const transport = nodemailer.createTransport(transportOptions)

        const info = await transport.sendMail({
            from: getFrom(from, username),
            to: to,
            subject: getText(subject, false),
            cc: cc ? cc : undefined,
            bcc: bcc ? bcc : undefined,
            replyTo: replyTo ? replyTo : undefined,
            inReplyTo: inReplyTo ? inReplyTo : undefined,
            references: inReplyTo ? inReplyTo : undefined,
            text: body ? getText(body, false) : undefined,
            html: htmlBody ? getText(htmlBody, convertMarkdown) : undefined,
            priority: priority ? priority : undefined,
            attachments: attachments ? (await getAttachments(attachments)) : undefined,
        })
    } catch (error) {
        core.setFailed(error.message)
    }
}

main()
