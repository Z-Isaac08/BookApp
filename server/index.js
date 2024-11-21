require('dotenv').config();
const express = require('express');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const authorRoute = require('./routes/authorRoute');
const bookRoute = require('./routes/bookRoute');
const errorHandler = require('./middlewares/error');
const securityMiddleware = require('./middlewares/security');
const app = express();

const port = 3000;

securityMiddleware(app)

app.use(express.json());

//ROUTES
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/book', bookRoute);
app.use('/author', authorRoute);

//Middlewares
app.use(errorHandler);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
