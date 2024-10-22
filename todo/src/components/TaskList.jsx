import React, { useState, useEffect } from "react";
import axios from 'axios';

const TaskList=()=> {
    const [tasks, setTasks]=useState([]);
    const [editing, setEditing]= useState(false);
    const [currentTask, setCurrentTask]= useState({ id: null, title:'', description:''});

    useEffect(()=>{
        axios.get('https://aswanth74.pythonanywhere.com/api/tasks/')
        .then(Response=>setTasks(Response.data))
        .catch(error=>console.log(error));
    },[]);

    const DeleteTask = (id) =>{};

    const editTask = (task) =>{
        setEditing(true);
        setCurrentTask(task);
    };
    
    const updateTask = (id, updateTask) =>{
        setEditing(false);
        axios.put(`https://aswanth74.pythonanywhere.com/api/tasks/${id}/`, updateTask)
            .then(response => {
                setTasks(tasks.map(task => (task.id === id ? response.data : task)));
            })
            .catch(error => console.log(error));
    };

    return(
        <div className='container mt-3'>
            <h2>Task List</h2>
            <table className='table table-bordered table-hover'>
                {tasks.map(task=>(
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td><button className='bt btn-warning px-3' onClick={()=>editTask(task)}>Edit</button></td>
                        <td><button className='bt btn-danger' onClick={()=>DeleteTask(task)}>Delete</button></td>
                    </tr>   
                ))}
            </table>
            {editing ?(
                <EditTaskForm
                    currentTask={currentTask}
                    updateTask={updateTask}
                    />
            ) : null}
        </div>
    );
};

const EditTaskForm = ({ currentTask, updateTask }) =>{
    const [task, setTask] = useState(currentTask);

    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setTask({...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTask(task.id, task);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Task</h2>
            <div>
                <label>Title</label>
                <input 
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>Descriptipon</label>
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Update Task</button>
        </form>

    );

}
export default TaskList;

