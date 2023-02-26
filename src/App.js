import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css';
import TaskList from './components/TaskList';
import './components/TaskList'
// import { useState } from 'react'
// import TaskForm from './components/TaskForm'
// import { toast } from 'react-toastify';
// import axios from "axios"
function App() {
  

  return (
    <div className="App">
      <div className="task-container">
      <TaskList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
