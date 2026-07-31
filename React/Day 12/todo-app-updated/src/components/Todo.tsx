
import { useEffect, useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[600px] mt-10">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Todo List
        </h1>

        <div>
          <input
            className="bg-yellow-100 mb-10 flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Enter Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          {editIndex === null ? (
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 rounded-lg ml-[200px] h-9 w-23"
              onClick={addTask}
            >
              Add
            </button>
          ) : (
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white px-6 rounded-lg ml-[200px] h-9 w-23"
              onClick={updateTask}
            >
              Update
            </button>
          )}

          {tasks.length === 0 ? (
            <h3 className="text-center text-gray-500">No Tasks Available</h3>
          ) : (
            <ul className="space-y-4" style={{ listStyle: "none", padding: 0 }}>
              {tasks.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border rounded-lg p-4 shadow-sm"
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid gray",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <span className="text-lg">{item}</span>

                  <div className="space-x-3">
                    <button
                      onClick={() => editTask(index)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;