const nodemailer = require("nodemailer");

var email_user = "";
var email_password = "";

async function main(){
    // transportador
    let transporter = nodemailer.createTransport({
        host: "smtp.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: email_user,
            pass: email_password,
        },
    });
    
    // faz o envio da mensagem
    let message = await transporter.sendMail({
        from: '"Gagá Insano 👽" <henrique_eduardo_souza@hotmail.com>',
        to: "rycky900@gmail.com",
        subject: "Teste ✔",
        text: "Este é um email enviado pelo servidor do gagá insano",
        html: `<h1>Olá!</h1>
        <p>Este é um email enviado pelo servidor do Gagá Insano!</p>`,
    });

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
    });
}

function SendEmail(){
    main().catch(console.error);
}

module.exports = {
    SendEmail
}