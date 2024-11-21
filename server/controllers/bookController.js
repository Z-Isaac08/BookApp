const { PrismaClient } = require("@prisma/client");
const BadRequestException = require("../exceptions/bad_request");
const { createBookSchema, updateBookSchema } = require("../validators/book_validator");

const prisma = new PrismaClient();

const getAllBooks = async (req, res, next) => {
    try {
        const books = await prisma.book.findMany({ include: { author: true } });
        res.status(200).json({ message: 'Liste de livre récupéré avec succès' , books })
    } catch (error) {
        next(error)
    }
};

const getBookById = async (req, res, next) => {
    try {
        const book = await prisma.book.findUnique({ where: { id: req.params.id }, include: { author: true } });
        
        if (!book) {
            next(new BadRequestException("Livre inexistant"))
        }

        res.status(200).json({ message: 'Livre récupéré avec succès' , book });
    } catch (error) {
        next(error)
    }
};

const createBook = async (req, res, next) => {
    try {
        // Validation des données
        const { title, image, desc, authorName, page } = req.body;

        createBookSchema.parse(req.body);

        const author = await prisma.author.findMany({
            where: { name: authorName },
        });

        if (!author) {
            return next(new BadRequestException(`Auteur "${authorName}" introuvable.`));
        }

        const book = await prisma.book.create({
            data: {
                title,
                image,
                desc,
                authorId: author[0].id,
                page: parseInt(page, 10),
            },
        });

        res.status(201).json({ message: 'Livre créé avec succès', book });
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        // Validation des données
        updateBookSchema.parse(req.body);

        const { id } = req.params;
        const { title, image, desc, authorName, page } = req.body;

        const bookData = {
            title,
            image,
            desc,
            page: page ? parseInt(page, 10) : undefined,
        };

        // Si un auteur est fourni, vérifier son existence
        if (authorName) {
            const author = await prisma.author.findUnique({
                where: { name: authorName },
            });

            if (!author) {
                return next(new BadRequestException(`Auteur "${authorName}" introuvable.`));
            }

            bookData.authorId = author.id;
        }

        // Mise à jour du livre
        const updatedBook = await prisma.book.update({
            where: { id },
            data: bookData,
        });

        res.status(200).json({ message: 'Livre mis à jour avec succès', updatedBook });
    } catch (error) {
        next(error);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedBook = await prisma.book.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Livre supprimé avec succès', deletedBook });
    } catch (error) {
        next(error);
    }
};


module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook}

