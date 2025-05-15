const express = require('express');
const TaskController = require('../Controller/TaskController');

const router = express.Router();

router.post('/create', TaskController.createTask);
router.get('/list', TaskController.getTaskList);
router.post('/:id', TaskController.getTaskById);
router.post('/:id', TaskController.deleteTask);
router.post('/update/:id', TaskController.updateTask);

module.exports = router;
