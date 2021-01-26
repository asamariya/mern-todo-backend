const { Router } = require('express');

const router = require('express').Router();

const auth = require('../middleware/check-auth');
const toDoListController = require('../controllers/todo-list-controller');

router.post('/add', auth, toDoListController.addList);
router.delete('/delete', toDoListController.deleteAll);
router.get('/all', auth, toDoListController.getAllLists);
router.get('/:id', auth, toDoListController.getList);
router.post('/addtask', auth, toDoListController.addTask);
router.delete('/:id/task', auth, toDoListController.deleteTask);
router.patch('/:id/task', auth, toDoListController.updateTask);
router.delete('/:id/', auth, toDoListController.deleteList);

module.exports = router;
