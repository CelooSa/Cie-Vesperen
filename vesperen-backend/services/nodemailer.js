const nodemailer = require('nodemailer');
const ENV = require('../config/env');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS
    }
});


const sendEmail = async (user, verifieToken) => {
    const verificationLink = `
    <a href='http://localhost:3000/verify/${verifieToken}'>${verifieToken}</a>`;
    
    await transporter.sendMail({
        from: ENV.EMAIL_USER,
        to: user.email,

        subject: "Vérifiez votre email",

        text: `Hello ${user.name},\n\nMerci pour votre inscription!.`,

        html: `Cliquez sur ce lien pour afin de vérifier votre email: ${verificationLink}`,
    });

};

module.exports = sendEmail;
        


    

