const { Router } = require('express');

const router = require('express').Router();

const auth = require('../middleware/check-auth');
const toDoListController = require('../controllers/todo-list-controller');
const { db } = require('../models/User');

router.post('/add', auth, toDoListController.addList);
router.delete('/delete', toDoListController.deleteAll);

module.exports = router;
