const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { getAllBooks, getBookById, updateBook, deleteBook, createBook } = require("../controllers/bookController");

const router = express.Router();

router.post('/', [authMiddleware, adminMiddleware], createBook)

router.get('/', authMiddleware, getAllBooks);

router.get('/:id', authMiddleware, getBookById);

router.put('/:id', [authMiddleware, adminMiddleware], updateBook);

router.delete('/:id', [authMiddleware, adminMiddleware], deleteBook);

module.exports = router;