const { PrismaClient } = require("@prisma/client");
const BadRequestException = require("../exceptions/bad_request");

const prisma = new PrismaClient();

const createAuthor = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            return next(new BadRequestException("Le nom de l'auteur est requis."));
        }

        const author = await prisma.author.create({
            data: { name },
        });

        res.status(201).json({ message: 'Auteur créé avec succès', author });
    } catch (error) {
        next(error);
    }
};

const getAllAuthors = async (req, res, next) => {
    try {
        const authors = await prisma.author.findMany();
        res.status(200).json({ message: 'Liste des auteurs récupérée avec succès', authors });
    } catch (error) {
        next(error);
    }
};

const getAuthorById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(new BadRequestException("ID de l'auteur manquant."));
        }

        const author = await prisma.author.findUnique({
            where: { id },
            include: { books: true },
        });

        if (!author) {
            return next(new BadRequestException("Auteur introuvable."));
        }

        res.status(200).json({ message: 'Auteur récupéré avec succès', author });
    } catch (error) {
        next(error);
    }
};

const updateAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!id || !name) {
            return next(new BadRequestException("ID et nom de l'auteur sont requis pour la mise à jour."));
        }

        const updatedAuthor = await prisma.author.update({
            where: { id },
            data: { name },
        });

        res.status(200).json({ message: 'Auteur mis à jour avec succès', updatedAuthor });
    } catch (error) {
        next(error);
    }
};

const deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(new BadRequestException("ID de l'auteur manquant pour suppression."));
        }

        const deletedAuthor = await prisma.author.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Auteur supprimé avec succès', deletedAuthor });
    } catch (error) {
        next(error);
    }
};

module.exports = { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor };
