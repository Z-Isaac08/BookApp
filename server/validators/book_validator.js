const { z } = require('zod');

// Schéma de validation pour createBook
const createBookSchema = z.object({
    title: z.string().min(1, 'Le titre est obligatoire.'),
    image: z.string().url('L\'image doit être une URL valide.'),
    desc: z.string().min(1, 'La description est obligatoire.'),
    authorName: z.string().min(1, 'Le nom de l\'auteur est obligatoire.'),
    page: z.number().int().positive('Le nombre de pages doit être un entier positif.'),
});

const updateBookSchema = z.object({
    title: z.string().optional(), // Le champ est facultatif
    image: z.string().url('L\'image doit être une URL valide.').optional(),
    desc: z.string().optional(),
    authorName: z.string().optional(),
    page: z.number().int().positive('Le nombre de pages doit être un entier positif.').optional(),
});

module.exports = { createBookSchema, updateBookSchema};
