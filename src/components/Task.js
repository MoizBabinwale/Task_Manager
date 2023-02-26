import React from 'react'
import {FaRegEdit , FaCheckDouble} from "react-icons/fa"
import {BsFillTrashFill} from "react-icons/bs"
const Task = ({task,index,delateTask, getSingleTask, setcompletedTask}) => {
  return (
    <div className={task.completed ? 'task completed': "task" }>
        <p>
            <b>{index +1}. </b>
            {task.name}
        </p>
        <div className="task-icons">
        <FaRegEdit color = "black" onClick = {()=>getSingleTask(task)}/>
        <FaCheckDouble color = "green" onClick={()=>setcompletedTask(task)}/>
        <BsFillTrashFill color = "red" onClick={()=>delateTask(task._id)}/>
        </div>
    </div>
  )
}

export default Task