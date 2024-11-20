const BadRequestException = require("../exceptions/bad_request")
const { PrismaClient } = require('@prisma/client')



const adminMiddleware = async (req, res, next) => {
    prisma = new PrismaClient();
    try {
        // Récupération de l'utilisateur depuis la base de données
        const user = await prisma.user.findUnique({ where: { email: req.email } });

        // Si l'utilisateur n'existe pas, retourner une erreur
        if (!user) {
            return next(new BadRequestException('Utilisateur non trouvé'));
        }

        // Vérification du rôle de l'utilisateur
        if (user.role === 'ADMIN') {
            return next(); 
        } else {
            return next(new BadRequestException('Vous n\'êtes pas autorisé à cette requête'));
        }
    } catch (error) {
        return next(error); 
    }
};

module.exports = adminMiddleware;