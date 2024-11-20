const { PrismaClient } = require("@prisma/client");
const { hash } = require('bcryptjs')
const BadRequestException = require("../exceptions/bad_request");

prisma = new PrismaClient

const getAllUsers = async (req, res, next) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        next(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.params.id } });
        res.json(user);

        if (!user) {
            next(new BadRequestException("Utilisateur inexistant"))
        }
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        const user = await prisma.user.findUnique({ where: { id: id } });
        const hashedPassword = await hash(password, 10);

        if (!user) {
            next(new BadRequestException("Utilisateur inexistant"))
        }

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                name: name || user.name,
                email: email || user.email,
                password: hashedPassword || user.password,
                role: role || user.role,
            },
        });

        res.json(updatedUser);

    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({ where: { id: id } });

        if (!user) {
            next(new BadRequestException("Utilisateur inexistant"))
        }

        await prisma.user.delete({ where: { id: id } });

        res.status(200).json({ message: 'Utilisateur supprimé avec succès' })

    } catch (error) {
        next(error)
    }
}

module.exports = { getAllUsers, getUserById, updateUser, deleteUser }