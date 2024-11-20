// validators/userValidator.js
const { z } = require('zod');

const signupSchema = z.object({
    email: z.string().email("L'email doit être valide"),
    password: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères"),
    name: z.string()
});

const loginSchema = z.object({
    email: z.string().email("L'email doit être valide"),
    password: z.string().min(6, "Le mot de passe doit comporter au moins 6 caractères"),
});

module.exports = { signupSchema, loginSchema };
