const jwt = require('jsonwebtoken');
const BadRequestException = require('../exceptions/bad_request');
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware pour vérifier le token JWT
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return next(new BadRequestException('Token manquant'));
    }

    try {
        // Vérification du token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;  // Ajout de l'ID de l'utilisateur à la requête
        req.email = decoded.email;  // Ajout de l'email de l'utilisateur à la requête
        next(); 
    } catch (error) {
        return next(new BadRequestException('Token invalide ou expiré'));
    }
};

module.exports = authMiddleware;
