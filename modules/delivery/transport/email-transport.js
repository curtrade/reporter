const nodemailer = require('nodemailer');

class EmailTransport {
    constructor(config) {
        if (!config || !config.replyTo || !config.transportSettings) {
            throw new Error(
                'EmailTransport: config.replyTo and config.transportSettings should be set'
            );
        }
        this.config = config;
        this.transporter = nodemailer.createTransport(config.transportSettings);
    }
    isRecipientValid(recipient) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(recipient).toLowerCase());
    }
    async send(recipient, fileName, fileBuffer) {
        if (!this.isRecipientValid(recipient)) {
            throw new Error(
                'EmailTransport: recipient is not valid : ' + recipient
            );
        }

        const mailOptions = {
            from: this.config.transportSettings.auth.user,
            to: recipient, //'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
            replyTo: this.config.replyTo,
            subject: 'Письмо содержит вложение: ' + fileName,
            text: '',
            attachments: [
                {
                    filename: fileName,
                    content: fileBuffer
                }
            ]
        };

        const info = await this.transporter.sendMail(mailOptions);

        return info.messageId ? { messageSentTo: recipient } : null;
    }
}

module.exports = EmailTransport;
