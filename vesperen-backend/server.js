const app = require('./app');
const ENV = require('./config/env');
const express = require('express');


//PORT
const PORT = ENV.PORT || 8000;


// MIDDLEWARE
app.use(express.json())

// LISTEN
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
    

});