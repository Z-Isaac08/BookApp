const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { getAllAuthors, getAuthorById, updateAuthor, deleteAuthor, createAuthor } = require("../controllers/authorController");

const router = express.Router();

router.post('/', [authMiddleware, adminMiddleware], createAuthor)

router.get('/', authMiddleware, getAllAuthors);

router.get('/:id', authMiddleware, getAuthorById);

router.put('/:id', [authMiddleware, adminMiddleware], updateAuthor);

router.delete('/:id', [authMiddleware, adminMiddleware], deleteAuthor);

module.exports = router;