const { PrismaClient } = require("@prisma/client");
const { hash, compare } = require('bcryptjs')
const jwt  = require("jsonwebtoken")


prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;


const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
    
        if (existingUser) {
            return res.status(400).json({ error: "Cet email est déjà utilisé" })
        }
    
        const hashedPassword = await hash(password, 10);
    
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
    
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
        
    } catch (error) {
        res.status(500).json({error : 'Erreur lors de la création de l\'utilisateur'})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if(!user) {
            return res.status(400).json({error: 'Email ou mot de passe incorrect'})
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({error: 'Mot de passe incorrect'})
        }

        const token = jwt.sign({userId: user.id}, SECRET_KEY, { expiresIn: '1h' })
        res.json({ message: 'Connexion réussie', token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
}

module.exports = { signup, login }