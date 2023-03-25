const EmailController = require('./Controllers/EmailController.js');
var dotenv = require('dotenv/config');

async function Send() {
    const email = process.env.SERVER_OUTLOOK_USERNAME;
    const password = process.env.SERVER_OUTLOOK_PASSWORD;

    const ServerEmailOrigin = new EmailController.Origin(
        'smtp.outlook.com', 
        'Servidor Gagá Insano',
        email,
        password
    );

    const Message = new EmailController.Message(
        'teste', 
        'essa é uma mensagem de teste, para verificar o envio de emails do gagá insano', 
        '<p>essa é uma mensagem de teste, para verificar o envio de emails do gagá insano</p>', 
        ['henrique_eduardo_souza@hotmail.com']
    );

    
    EmailController.SendEmail(Message, ServerEmailOrigin).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
    
}

const email = 'henrique_edudo_souahotmail.com';
console.log(EmailValidator.validate(email));