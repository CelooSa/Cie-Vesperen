const express = require('express');
const ENV = require('./config/env');
const connectMongoDB = require('./config/dbMongo');
const cors = require('cors');

const cookieParser = require('cookie-parser');


const app = express();

// CONNEXION MONGO
connectMongoDB(ENV.MONGO_URI,ENV.DB_NAME);


//IMPORT ROUTES
const userRouter = require('./routes/user.router');
const showRouter = require('./routes/show.router');



// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: ENV.PORT_APPLICATION_FRONT,
    credentials: true,
};
app.use(cors(corsOptions));


//URLS API 
app.use("/api/users", userRouter);
app.use("/api/shows", showRouter);



//MIDDLEWARE DE GESTION D'ERREURS

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Une errreur est survenue"
    const details = error.details || null; 

    res.status(status).json({
        status,
        message,
        details,
        
    })
})



module.exports = app;