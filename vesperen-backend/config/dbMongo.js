const mongoose = require('mongoose');

const connectMongoDB = (mongoURI, dbName) => {
  mongoose
    .connect(mongoURI, { dbName: dbName, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à Mongo réussie!', dbName))
    .catch(error => console.error('Erreur de connexion à MongoDB:', error));
};

module.exports = connectMongoDB;
