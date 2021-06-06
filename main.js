const nodemailer = require("nodemailer")
const core = require("@actions/core")
const fs = require("fs")
const showdown = require("showdown")

function getBody(bodyOrFile, convertMarkdown) {
    let body = bodyOrFile

    // Read body from file
    if (bodyOrFile.startsWith("file://")) {
        const file = bodyOrFile.replace("file://", 
		try {
			body = fs.readFileSync(file, "utf8")
			return body
		} catch(error){
			return ""
		}
		
    }

    // Convert Markdown to HTML
    if (convertMarkdown) {
        const converter = new showdown.Converter()
        body = converter.makeHtml(body)
    }

    return body
}

function getFrom(from, username) {
    if (from.match(/.+ <.+@.+>/)) {
        return from
    }

    return `"${from}" <${username}>`
}

async function main() {
    try {
        const serverAddress = core.getInput("server_address", { required: true })
        const serverPort = core.getInput("server_port", { required: true })
        const username = core.getInput("username", { required: true })
        const password = core.getInput("password", { required: true })
        const subject = core.getInput("subject", { required: true })
        const from = core.getInput("from", { required: true })
        const to = core.getInput("to", { required: true })
        const secure = core.getInput("secure", { required: false })
        const body = core.getInput("body", { required: false })
        const htmlBody = core.getInput("html_body", { required: false })
        const cc = core.getInput("cc", { required: false })
        const bcc = core.getInput("bcc", { required: false })
        const replyTo = core.getInput("reply_to", { required: false })
        const attachments = core.getInput("attachments", { required: false })
        const convertMarkdown = core.getInput("convert_markdown", { required: false })
        const ignoreCert = core.getInput("ignore_cert", { required: false })
		if (body == ""){
			return;
		}
        const transport = nodemailer.createTransport({
            host: serverAddress,
            port: serverPort,
            secure: secure ? true : serverPort == "465",
            auth: {
                user: username,
                pass: password,
            },
            tls: ignoreCert ? {
                rejectUnauthorized: false
            } : undefined
        })

        const info = await transport.sendMail({
            from: getFrom(from, username),
            to: to,
            subject: subject,
            cc: cc ? cc : undefined,
            bcc: bcc ? bcc : undefined,
            replyTo: replyTo ? replyTo : undefined,
            text: body ? getBody(body, false) : undefined,
            html: htmlBody ? getBody(htmlBody, convertMarkdown) : undefined,
            attachments: attachments ? attachments.split(',').map(f => ({ path: f.trim() })) : undefined
        })
    } catch (error) {
        core.setFailed(error.message)
    }
}

main()
