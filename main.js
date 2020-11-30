const nodemailer = require("nodemailer")
const core = require("@actions/core")
const fs = require("fs")
const showdown = require('showdown')

function getBody(bodyOrFile, convert_to_html_from_markdown) {
    let unconvertedBody
    if (bodyOrFile.startsWith("file://")) {
        const file = bodyOrFile.replace("file://", "")
        unconvertedBody = fs.readFileSync(file, "utf8")
    } else {
      unconvertedBody = bodyOrFile
    }

    let body
    if (convert_to_html_from_markdown === "true") {
      body = convertFromMarkdownToHTML(unconvertedBody)
    } else {
      body = unconvertedBody
    }

    return body
}

function convertFromMarkdownToHTML(markdownString) {
  let converter = new showdown.Converter()
  let htmlString = converter.makeHtml(markdownString) 
  return htmlString
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
        const convert_to_html_from_markdown = core.getInput("convert_to_html_from_markdown", { required: false })

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
            text: content_type != "text/html" ? getBody(body, convert_to_html_from_markdown) : undefined,
            html: content_type == "text/html" ? getBody(body, convert_to_html_from_markdown) : undefined,
            attachments: attachments ? attachments.split(',').map(f => ({ path: f.trim() })) : undefined
        })

        console.log(info)
    } catch (error) {
        core.setFailed(error.message)
    }
}

main()
