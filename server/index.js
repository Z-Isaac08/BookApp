require('dotenv').config();
const express = require('express');
const authRoute = require('./routes/authRoute')
const app = express();

const port = 3000;

app.use(express.json());

//ROUTES
app.use('/auth', authRoute);

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
