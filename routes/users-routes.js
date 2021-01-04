const { Router } = require('express');

const router = require('express').Router();

const usersController = require('../controllers/users-controller');

router.post('/register', usersController.register);
router.post('/login', usersController.login);

module.exports = router;
