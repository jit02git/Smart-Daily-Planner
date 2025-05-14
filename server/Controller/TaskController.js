const Task = require('../Model/Task');

const createTask = async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        return res.status(201).send(task)
    } catch (error) {
        console.error(err);
    }
};

const getTaskList = async (req, res) => {
    const getTask = await Task.find();
    res.json(getTask);
}

const getTaskById = async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
}

const deleteTask = async (req, res) => {
    await task.findByIdAndDelete(req.params.id);
    res.json({msg: 'Task deleted successfully'})
    
}

module.exports = {
    createTask,
    getTaskList,
    getTaskById,
    deleteTask,
};
