const { ZodError } = require('zod');

function errorHandler(err, req, res, next) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            status: 'error',
            statusCode: 400,
            message: 'Données invalides',
            details: err.errors, // Détails des erreurs Zod
        });
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erreur interne du serveur';

    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: message,
    });
}

module.exports = errorHandler;
