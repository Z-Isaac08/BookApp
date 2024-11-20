const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xssClean = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');

// Configuration des middlewares
const securityMiddleware = (app) => {
    // Helmet : Protection des en-têtes HTTP
    app.use(helmet());

    // Limitation du nombre de requêtes
    app.use(
        rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 200,
            message: 'Trop de requêtes, réessayez plus tard.',
        })
    );

    app.use(xssClean());

    app.use(mongoSanitize());

    app.use(compression());

    app.use(
        cors({
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
            credentials: true, // Autoriser les cookies
        })
    );
};

module.exports = securityMiddleware;
