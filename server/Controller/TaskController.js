const Task = require('../Model/Task');

const createTask = async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        return res.status(201).send(task);
    } catch (error) {
        console.error(error); 
        return res.status(500).send({ message: 'Something went wrong', error });
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

const updateTask = async (req, res) => {

    const updatedTask = await task.findByIdAndUpdate(req.params.id, req.body, { new: true});
    res.json(updatedTask);

}


module.exports = {
    createTask,
    getTaskList,
    getTaskById,
    deleteTask,
    updateTask
};
