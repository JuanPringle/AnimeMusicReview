const express = require('express');
const { getUser, createUser, updatePassword} = require('../controllers/userController');
const router = express.Router();


router.get('/:id', getUser)
router.post('/', createUser)
router.patch('/:id', updatePassword)
