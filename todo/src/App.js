import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';



const url = "https://localhost:3000"


export default  function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]); 
  

// get all tasks
useEffect(() => {
  axios.get(url)
  .then(response => {
    setTasks(response.data);
  })
  .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      alert(error.response.data.error ? error.response.data.error : error);
    } else if (error.request) {
      // The request was made but no response was received
      alert("No response received from the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      alert("Error: " + error.message);
    }
  });
}, []);




// add task
  const addTask = () => {
   axios.post(url + '/create', {
    description: task
  })
    setTasks([...tasks, task]);
    setTask('');
  }
  // delete task
  const deleteTask = (id) => {
    axios.delete(url + '/delete/' + id)
    .then( response => {
    const withoutRemoved = tasks.filter((item) => item.id !== id);
    setTasks(withoutRemoved);
    }).catch((error) => {
      alert(error.response.data.error ? error.response.data.error : error);
    });
  }

  

  return (
    <div id="container">
        <h3>Todos</h3>
            <form>  
                <input 
                placeholder='add new task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={ e => {
                if (e.key === 'Enter') {
                e.preventDefault();
                addTask();                
                }
               }}
                />
            </form>
            <ul>
              {tasks.map(item =>(
                <li>{item}
                <button className='delete-button' onClick={() => deleteTask(item.id)}>Delete</button>
                </li>
              ))}
            </ul>  
    </div>
  );
  }
