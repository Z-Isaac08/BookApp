const BadRequestException = require('../exceptions/bad_request');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Middleware pour vérifier si l'utilisateur est un administrateur
const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.userId || !req.email) {
            return next(new BadRequestException('Utilisateur non authentifié'));
        }

        const user = await prisma.user.findUnique({
            where: { id: req.userId }, // Utilisation de req.userId pour récupérer l'utilisateur
        });

        // Si l'utilisateur n'existe pas, retourner une erreur
        if (!user) {
            return next(new BadRequestException('Utilisateur non trouvé'));
        }

        // Vérification du rôle de l'utilisateur
        if (user.role === 'ADMIN') {
            return next(); // Si l'utilisateur est un administrateur, on continue la requête
        } else {
            return next(new BadRequestException('Vous n\'êtes pas autorisé à cette requête'));
        }
    } catch (error) {
        return next(error); // Gestion des erreurs
    }
};

module.exports = adminMiddleware;
