const nodemailer = require("nodemailer");

/**
 * The email message, with content (subject, text and html) and the receivers list.
 */
class Message {
    /**
     * Creates one Message object, with well defined subject, text, html and receivers atributes.
     * @param {string} subject subject of the message
     * @param {string} text plain text of the content
     * @param {string} html html content
     * @param {string[]} receivers receivers list
     */
    constructor(subject, text, html, receivers) {
        this.text = text;
        this.html = html;
        this.subject = subject;
        this.receivers = receivers;
    }
    /**
     * Generates a string with the receivers in the right format to the email sending process.
     * @returns {string} the receivers list string, in the format "email_1, ..., email_n".
     */
    get_receivers_string(){
        var final_string = "";
        var last_index = this.receivers.length - 1;

        for(var i = 0; i < last_index; i++)
            final_string += this.receivers[i] + ", ";
        final_string += this.receivers[last_index];
        
        return final_string;
    }
};

/**
 * The email sending origin, with host, username, user_email and password.
 */
class Origin {
    /**
     * Creates a Origin object, with well defined host, username, user_email and password atributes.
     * @param {string} host SMTP server.
     * @param {string} username username of the author.
     * @param {string} user_email email of the author.
     * @param {string[]} password password of the author's account.
     */
    constructor(host, username, user_email, password) {
        this.host = host; 
        this.username = username; 
        this.user_email = user_email; 
        this.password = password;
        this.transporter = nodemailer.createTransport({
            host: host,
            port: 587,
            secure: false,
            auth: {
                user: user_email,
                pass: password,
            },
        });
    }

    /**
     * Creates the string of the author, for the email sending process.
     * @returns {string} the string in the default format.
     */
    get_author_string(){
        return '"' + this.username + '" <' + this.user_email + '>';
    }
};

/**
 * This function sends the email from the author to the final receivers.
 * @param {Message} message message object, that contains: subject, text, html and receivers.
 * @param {Origin} origin origin object, that contains: host, username, user_email and password.
 */
async function SendEmail(message, origin){
    let send_message = await origin.transporter.sendMail({
        from: origin.get_author_string(),
        to: message.get_receivers_string(),
        subject: message.subject,
        text: message.text,
        html: message.html
    });
}

async function ServerSendEmail(message){
    const ServerEmailOrigin = new Origin(
        'smtp.outlook.com', 
        'Servidor Gagá Insano',
        process.env.SERVER_OUTLOOK_USERNAME,
        process.env.SERVER_OUTLOOK_PASSWORD
    );
    
    let send_message = await ServerEmailOrigin.transporter.sendMail({
        from: ServerEmailOrigin.get_author_string(),
        to: message.get_receivers_string(),
        subject: message.subject,
        text: message.text,
        html: message.html
    });
}

module.exports = {
    ServerSendEmail,
    Origin,
    Message
}