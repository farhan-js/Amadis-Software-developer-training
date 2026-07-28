import { useState } from "react";

function Todo() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState<string[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const addTask = () => {
        if (task.trim() === "") {
            alert("Please enter a task");
            return;
        }
        setTasks([...tasks, task]);
        setTask("");
    };
    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);

        if (editIndex === index) {
            setTask("");
            setEditIndex(null);
        }
    };
    const editTask = (index: number) => {
        setTask(tasks[index]);
        setEditIndex(index);
    };
    const updateTask = () => {
        if (task.trim() === "") {
            alert("Task cannot be empty");
            return;
        }

        if (editIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = task;

            setTasks(updatedTasks);
            setTask("");
            setEditIndex(null);
        }
    };
    return (
        <div>
            <h1>Todo List</h1>
            <input type="text" placeholder="Enter Task" value={task} onChange={(e) => setTask(e.target.value)}
                style={{
                    padding: "10px",
                    width: "250px",
                    marginRight: "10px",
                }}/>

            {editIndex === null ? (<button onClick={addTask}>Add</button>) : (<button onClick={updateTask}>Update</button>)}


            {tasks.length === 0 ? (<h3>No Tasks Available</h3>) : (<ul style={{ listStyle: "none", padding: 0 }}>
                    {tasks.map((item, index) => (
                        <li
                            key={index}
                            style={{
                                marginBottom: "15px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: "1px solid gray",
                                padding: "10px",
                                borderRadius: "5px",
                            }}>
                            <span>{item}</span>
                            <div>
                                <button onClick={() => editTask(index)} style={{ marginRight: "10px" }}>Edit</button>
                                <button onClick={() => deleteTask(index)}> Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default Todo;