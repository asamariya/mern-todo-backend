const { Router } = require('express');

const router = require('express').Router();

const auth = require('../middleware/check-auth');
const tasksController = require('../controllers/tasks-controller');

router.post('/add', auth, tasksController.addTask);
router.delete('/:id/:tid', auth, tasksController.deleteTask);
router.patch('/:id/:tid/update', auth, tasksController.updateTask);
router.patch('/:id/removedone', auth, tasksController.removeDoneTasks);
router.patch('/:id/:tid', auth, tasksController.markAsDone);

module.exports = router;
