import React from 'react'
import TaskForm from './TaskForm'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import loadinImg from '../assets/loader.gif'
// import { formData, setFormData } from './FormDataContext';

import Task from './Task'
const TaskList = () => {
  const [formData, setFormData] = useState({
    name: '',
    completed: false
  });
  const [tasks, setTasks] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [isTaskId, setIsTaskId]= useState("")
  const [isTaskCompleted, setIsTaskCompleted]= useState([])
  const [isEditing, setIsEditing]= useState(false)
  const getTask = async () => {
    setisLoading(true)
    try {
      const { data } = await axios.get("/api/tasks",)
      setTasks(data)
      setisLoading(false)
    } catch (error) {
      toast.error(error.message)
      setisLoading(false)
    }
  }
  //deleate task
  const delateTask = async (id) => {
    try {
      await axios.delete(`/api/task/${id}`)

      getTask()
    } catch (error) {
      toast.error(error.message)
    }

  }
  useEffect(() => {
    getTask()
  }, [])
  useEffect(()=>{
    const cTask = tasks.filter((task)=>{
      return task.completed === true
    })
    setIsTaskCompleted(cTask)
  },[tasks])
  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false })
    setIsTaskId(task._id)
    setIsEditing(true)
    console.log("get single task")
  }
const setcompletedTask = async (task) =>{
    const newFormData = {
      name:task.name,
      completed: true
    }
    try {
      await axios.put(`/api/task/${task._id}`, newFormData)
      getTask()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div>
      <h2>Task Manager</h2>
      {tasks.length >0 && (
        <div className="--flex-between --pb">
        <p>
          <b>Total Task :</b>{tasks.length}
        </p>
        <p>
          <b>Completed Task :</b>{isTaskCompleted.length}
        </p>
      </div>
      )}
      
      <hr />
      <TaskForm />
      {
        isLoading && (
          <div className="--flex center">
            <img src={loadinImg} alt="Loading" />
          </div>
        )
      }
      {
        !isLoading && tasks.length === 0 ? (
          <p className='--py'>No Task found Please add a task</p>
        ) : (
          <>
            {
              tasks.map((task, index) => {
                return (
                  <Task key={task._id} task={task} index={index} delateTask={delateTask} getSingleTask={getSingleTask} setcompletedTask={setcompletedTask}/>
                )
              })
            }
          </>
        )
      }


    </div>
  )
}

export default TaskList