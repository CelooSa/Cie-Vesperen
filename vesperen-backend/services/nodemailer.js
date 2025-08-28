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
    //utilisation de l'url de prod DONC RENDER! au lieu de localhost+ port correct et texte plus convivial 

    const verificationLink = `<a href='${ENV.BASE_URL}/api/users/verify/${verifieToken}'>Vérifier mon email</a>`; 
    
    await transporter.sendMail({
        from: ENV.EMAIL_USER,
        to: user.email,

        subject: "Vérifiez votre email",

        text: `Hello ${user.name},\n\nMerci pour votre inscription!.`,

        html: `Cliquez sur ce lien pour afin de vérifier votre email: ${verificationLink}`,
    });

};

module.exports = sendEmail;
        


    

