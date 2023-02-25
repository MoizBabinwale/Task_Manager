const Task = require("../model/taskModel");

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)

    } catch (error) {
        res.status(500).json(error);
    }
}
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json(error)

    }
}
//Get a single task
const getTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        if (!task) {
            res.status(404).json(`No task with id ${id}`)
        } else {

            res.status(200).json(task)
        }
    } catch (error) {
        res.status(500).json(error)
    }

}
//Deleate task
const deleateTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            res.status(404).json(`No task with id ${id}`)
        } else {
            res.status(200).send("Task deleated")
        }

    } catch (error) {
        res.status(500).json(error)
    }

}
const updateData = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndUpdate({ _id: id }, req.body, { new: true ,runValidators:true})
        if (!task) {
            res.status(404).json(`No task with id ${id}`)
        } 
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createTask, getTasks, getTask, deleateTask, updateData }