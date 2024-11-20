const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.get('/', authMiddleware, getAllUsers);

router.get('/:id', authMiddleware, getUserById);

router.put('/:id', authMiddleware, updateUser);

router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;