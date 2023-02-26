import React ,{useState,useEffect}from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
const TaskForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    completed: false
  })
  const { name } = formData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [isEditing, setIsEditing]= useState(false)
  const [isTaskId, setIsTaskId]= useState("")
  const [tasks, setTasks] = useState([])
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    getTask()
  }, [])
  const getTask = async () => {
    try {
      const { data } = await axios.get("/api/tasks",)
      setTasks(data)
      setisLoading(false)
    } catch (error) {
      toast.error(error.message)
      setisLoading(false)
    }
  }
  const createTask = async () => {
    if (name === "") {
      return toast.error("Input field cannot be empty")
    }
    try {
      await axios.post("/api/tasks", formData)
      toast.success("Task added succesfully")
      setFormData({ ...formData, name: "" })
      getTask()
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  const handleClick = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateTask()
      console.log("this is");
    }else{
      createTask();
      console.log("this is this");
    }
  }
  const updateTask = async(e)=>{
    // e.preventDefault()
    if(name ===""){
      toast.error("Input cnanot be empty")
    }
    try{
      await axios.put(`/api/task/${isTaskId}`, formData)
      setFormData({...formData, name:""})
      setIsEditing(false)
      getTask()
    }catch(error){
        toast.error(error.message)
    }
  }
  return (
    <form className='task-form' onSubmit={(e)=>{
      e.preventDefault()
    }}>
        <input type="text" name='name' value={name} onChange={handleInputChange} placeholder='Add a Task'/>
            <button onClick={handleClick}>{!isEditing ? "Add":"Edit"}</button>
    </form>
  )
}

export default TaskForm