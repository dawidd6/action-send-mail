const nodemailer = require("nodemailer");
const core = require("@actions/core");
const fs = require("fs");
const redisURL = "redis://127.0.0.1:6379";
const Bull = require("bull");
const emailQueue = new Bull("mail", redisURL);

function getBody(body) {
  if (body.startsWith("file://")) {
    const file = body.replace("file://", "");
    return fs.readFileSync(file, "utf8");
  }

  return body;
}

function getFrom(from, username) {
  if (from.match(/.+<.+@.+>/)) {
    return from;
  }

  return `"${from}" <${username}>`;
}

async function main() {
  try {
    const server_address = core.getInput("server_address", { required: true });
    const server_port = core.getInput("server_port", { required: true });
    const username = core.getInput("username");
    const password = core.getInput("password");
    const subject = core.getInput("subject", { required: true });
    const body = core.getInput("body");
    const text = core.getInput("text");
    const to = core.getInput("to", { required: true });
    const from = core.getInput("from", { required: true });
    const content_type = core.getInput("content_type", { required: true });
    const attachments = core.getInput("attachments", { required: false });
    const api_key = core.getInput("api_key");

    const transportOptions = {
      host: server_address,
      port: server_port,
      secure: server_port == "465",
    };

    if (api_key)
      transportOptions = Object.assign(transportOptions, { auth: { api_key } });
    if (!api_key)
      transportOptions = Object.assign(transportOptions, {
        auth: { user: username, pass: password },
      });

    if (api_key && username)
      core.setFailed("You can't use both API and username based auth");

    const transport = nodemailer.createTransport(transportOptions);

    console.log(transport.options);

    to.split(",").map((email) => {
      console.log(email);
      emailQueue.add({ email });
    });

    emailQueue.process(2, async (job, done) => {
      const { email } = job.data;
      const info = await transport.sendMail({
        from: getFrom(from, username),
        to: email.trim(),
        subject: subject,
        text,
        html: content_type == "text/html" ? getBody(body) : undefined,
        attachments: attachments
          ? attachments.split(",").map((f) => ({ path: f.trim() }))
          : undefined,
      });

      console.log(info);
      done();
    });

    console.log("Done");
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
