const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route qui reçoit les données du formulaire
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log("📩 Nouveau message reçu :", { name, email, subject, message });

    // Validation côté serveur
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Tous les champs sont requis' 
      });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Email invalide' 
      });
    }

    // Email à la compagnie
    const mailToCompany = {
      from: process.env.EMAIL_USER,
      to: 'celoo.sa@gmail.com', // j'ai mis mon mail en attendant vu que c'est fictif
      subject: `[Site Web] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #17163b;">Nouveau message de contact</h2>
          <hr>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <div>
            <strong>Message :</strong>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Message reçu depuis le site web de la Compagnie Vesperen
          </p>
        </div>
      `,
    };

    // Email de confirmation à l'utilisateur
    const confirmationToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmation de réception - Compagnie Vesperen',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #17163b;">Merci pour votre message !</h2>
          <p>Bonjour <strong>${name}</strong>,</p>
          <p>Nous avons bien reçu votre message concernant : <strong>${subject}</strong></p>
          <p>Notre équipe vous répondra dans les plus brefs délais.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3>Récapitulatif de votre demande :</h3>
            <p><strong>Sujet :</strong> ${subject}</p>
            <p><strong>Message :</strong></p>
            <div style="background: white; padding: 10px; border-radius: 3px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <hr>
          <div style="color: #666;">
            <p><strong>Compagnie Vesperen - Arts du Cirque</strong></p>
            <p>📍 123 Rue des Arts, 75001 Paris, France</p>
            <p>📞 +33 1 23 45 67 89</p>
            <p>✉️ contact@compagnie-vesperen.fr</p>
          </div>
        </div>
      `,
    };

    // Envoyer les deux emails
    await transporter.sendMail(mailToCompany);
    await transporter.sendMail(confirmationToUser);

    console.log(`✅ Message envoyé par ${name} (${email})`);
    
    res.status(200).json({ 
      success: true, 
      message: "Message envoyé avec succès !" 
    });

  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    res.status(500).json({ 
      error: 'Erreur lors de l\'envoi du message' 
    });
  }
});

module.exports = router;