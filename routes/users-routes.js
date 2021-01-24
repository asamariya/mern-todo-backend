const { Router } = require('express');

const router = require('express').Router();

const auth = require('../middleware/check-auth');
const usersController = require('../controllers/users-controller');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.delete('/delete', auth, usersController.deleteUser);
router.post('/tokenIsValid', usersController.checkToken);
router.get('/', auth, usersController.getUser);

module.exports = router;
