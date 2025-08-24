const app = require('./app');
const ENV = require('./config/env');
//const express = require('express');


//port pr mon back
const PORT = ENV.PORT || 8000;


// pr le lancement du serveur
app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
    

});