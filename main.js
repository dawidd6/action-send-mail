import nodemailer from "nodemailer";
import addressparser from "nodemailer/lib/addressparser/index.js";
import * as core from "@actions/core";
import * as glob from "@actions/glob";
import fs from "node:fs";
import showdown from "showdown";
import path from "node:path";

function getText(textOrFile, convertMarkdown) {
    let text = textOrFile;

    // Read text from file
    if (textOrFile.startsWith("file://")) {
        const file = textOrFile.replace("file://", "");
        text = fs.readFileSync(file, "utf8");
    }

    // Convert Markdown to HTML
    if (convertMarkdown) {
        const converter = new showdown.Converter({ tables: true });
        text = converter.makeHtml(text);
    }

    return text;
}

async function getAttachments(attachments) {
    const globber = await glob.create(attachments.split(",").join("\n"));
    const files = await globber.glob();
    return files.map((f) => ({
        filename: path.basename(f),
        path: f,
        cid: f.replace(/^.*[\\\/]/, ""),
    }));
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * Prepare an envelope object for nodemailer.
 *
 * If only one of envelopeFrom or envelopeTo is set, make sure that both
 * are set in the returned object. Furthermore, make sure that the attribute 'to'
 * is an array of email addresses, not a comma-separated string.
 */
function setupEnvelope(envelopeFrom, envelopeTo, from, to, cc, bcc) {
    if (envelopeFrom || envelopeTo) {
        // Take address in from, if envelopeFrom is not set.
        envelopeFrom = envelopeFrom ? addressparser(envelopeFrom) : addressparser(from);
        if (envelopeFrom.length != 1 || envelopeFrom[0].address == '') {
            throw new Error("'envelopeFrom' address is invalid");
        }
        if (envelopeTo) {
            envelopeTo = addressparser(envelopeTo);
        } else {
            // Take addresses in to, cc and bcc. Deduplication is handled by nodemailer.
            for (const src of [to, cc, bcc]) {
                if (src) {
                    let parsed = addressparser(src);
                    envelopeTo = envelopeTo ? envelopeTo.concat(parsed) : parsed;
                }
            }
        }
        return {
            from: envelopeFrom,
            to: envelopeTo,
        };
    }
    return undefined;
}

async function main() {
    try {
        let serverAddress = core.getInput("server_address");
        let serverPort = core.getInput("server_port");
        let secure = core.getInput("secure");
        let username = core.getInput("username");
        let password = core.getInput("password");

        if (!secure) {
            secure = serverPort === "465" ? "true" : "false";
        }

        const connectionUrl = core.getInput("connection_url");
        if (connectionUrl) {
            const url = new URL(connectionUrl);
            switch (url.protocol) {
                default:
                    throw new Error(
                        `Unsupported connection protocol '${url.protocol}'`
                    );
                case "smtp:":
                    serverPort = "25";
                    secure = "false";
                    break;
                case "smtp+starttls:":
                    serverPort = "465";
                    secure = "true";
                    break;
            }
            if (url.hostname) {
                serverAddress = url.hostname;
            }
            if (url.port) {
                serverPort = url.port;
            }
            if (url.username) {
                username = unescape(url.username);
            }
            if (url.password) {
                password = unescape(url.password);
            }
        }

        const subject = core.getInput("subject", { required: true });
        const from = core.getInput("from", { required: true });
        const to = core.getInput("to", { required: false });
        const body = core.getInput("body", { required: false });
        const htmlBody = core.getInput("html_body", { required: false });
        const cc = core.getInput("cc", { required: false });
        const bcc = core.getInput("bcc", { required: false });
        const replyTo = core.getInput("reply_to", { required: false });
        const inReplyTo = core.getInput("in_reply_to", { required: false });
        const attachments = core.getInput("attachments", { required: false });
        const convertMarkdown = core.getInput("convert_markdown", {
            required: false,
        });
        const ignoreCert = core.getInput("ignore_cert", { required: false });
        const priority = core.getInput("priority", { required: false });
        const nodemailerlog = core.getInput("nodemailerlog", {
            required: false,
        });
        const nodemailerdebug = core.getInput("nodemailerdebug", {
            required: false,
        });
        const envelopeFrom = core.getInput("envelope_from", {
            required: false,
        });
        const envelopeTo = core.getInput("envelope_to", { required: false });
        const headers = core.getInput("headers", { required: false });

        // Basic check for an email sender address
        // Either: "Plain Simple Name <user@doma.in>" or just "user@doma.in" (without the <>)
        let parsed = addressparser(from);
        if (parsed.length != 1 || parsed[0].address == '') {
            // Report an error only if the user did not set envelope_from. Otherwise, envelope_from
            // overrides from anyway and from is used as is (but Nodemailer will remove
            // the From: header completely).
            if (envelopeFrom) {
                core.warning("'from' address is invalid. Nodemailer will not create a 'From:' header.");
            } else {
                throw new Error("'from' address is invalid. Maybe you want to set 'envelope_from' to a valid sender address?");
            }
        }

        // if neither to, cc or bcc is provided, throw error
        if (!to && !cc && !bcc) {
            throw new Error(
                "At least one of 'to', 'cc' or 'bcc' must be specified"
            );
        }

        if (!serverAddress) {
            throw new Error("Server address must be specified");
        }

        const transport = nodemailer.createTransport({
            host: serverAddress,
            auth:
                username && password
                    ? {
                          user: username,
                          pass: password,
                      }
                    : undefined,
            port: serverPort,
            secure: secure === "true",
            tls:
                ignoreCert == "true"
                    ? {
                          rejectUnauthorized: false,
                      }
                    : undefined,
            logger: nodemailerdebug == "true" ? true : nodemailerlog,
            debug: nodemailerdebug,
            proxy: process.env.HTTP_PROXY,
        });

        const messageOptions = {
            from: from,
            to: to,
            subject: getText(subject, false),
            cc: cc ? cc : undefined,
            bcc: bcc ? bcc : undefined,
            replyTo: replyTo ? replyTo : undefined,
            inReplyTo: inReplyTo ? inReplyTo : undefined,
            references: inReplyTo ? inReplyTo : undefined,
            text: body ? getText(body, false) : undefined,
            html: htmlBody
                ? getText(htmlBody, convertMarkdown)
                : undefined,
            priority: priority ? priority : undefined,
            headers: headers ? JSON.parse(headers) : undefined,
            attachments: attachments
                ? await getAttachments(attachments)
                : undefined,
            envelope: setupEnvelope(envelopeFrom, envelopeTo, from, to, cc, bcc),
        };

        let i = 1;
        while (true) {
            try {
                const info = await transport.sendMail(messageOptions);
                break;
            } catch (error) {
                if (!error.message.includes("Try again later,")) {
                    core.setFailed(error.message);
                    break;
                }
                if (i > 10) {
                    core.setFailed(error.message);
                    break;
                }
                console.log("Received: " + error.message);
                if (i < 2) {
                    console.log("Trying again in a minute...");
                } else {
                    console.log("Trying again in " + i + " minutes...");
                }
                await sleep(i * 60000);
                i++;
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

main();
