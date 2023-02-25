const express = require('express')
const { createTask, getTask, getTasks, deleateTask, updateData } = require('../controller/taskController')
const logger = require('../middleware/middleware')
const Task = require('../model/taskModel')
const router = express.Router()

router.post('/api/tasks', logger, createTask)
router.get('/', (req, res) => {
    res.send("Home page")
})
router.get('/api/tasks', getTasks)
router.get('/api/task/:id', getTask)
router.delete('/api/task/:id', deleateTask)
router.put('/api/task/:id', updateData)

module.exports = router