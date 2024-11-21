const { PrismaClient } = require("@prisma/client");
const { hash, compare } = require('bcryptjs');
const jwt = require("jsonwebtoken");
const BadRequestException = require("../exceptions/bad_request");
const { signupSchema, loginSchema } = require("../validators/data_validator");


const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;


const signup = async (req, res, next) => {
    const { email, password, name, role} = req.body;

    try {

        signupSchema.parse({email, password, name})

        const existingUser = await prisma.user.findUnique({ where: { email } });
    
        if (existingUser) {
            return next(new BadRequestException("L'utilisateur existe déjà"));
        }
    
        const hashedPassword = await hash(password, 10);
    
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role || 'USER'
            },
        });
    
        res.status(201).json({ message: 'Utilisateur créé avec succès', user });
        
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        loginSchema.parse({email, password})

        const user = await prisma.user.findUnique({ where: { email } });

        if(!user) {
            return next(new BadRequestException("L'utilisateur inexistant"));
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return next(new BadRequestException("Mot de passe incorrect"));
        }

        const token = jwt.sign({userId: user.id, email: user.email}, SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({ message: 'Connexion réussie', token });
    } catch (error) {
        next(error);
    }
}

module.exports = { signup, login }