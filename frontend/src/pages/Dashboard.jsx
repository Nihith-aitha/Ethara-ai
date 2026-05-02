import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
    fetchTasks();
  }, []);

  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await API.get("/api/tasks", {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    setTasks(res.data);
  };

  // CREATE TASK
  const handleAddTask = async (e) => {
    e.preventDefault();

    await API.post(
      "/api/tasks",
      { title, description, assignedTo: "Nihith" },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // DELETE TASK
  const handleDelete = async (id) => {
    await API.delete(`/api/tasks/${id}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    fetchTasks();
  };

  // UPDATE STATUS
  const handleStatusChange = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "Pending" ? "Completed" : "Pending";

    await API.put(
      `/api/tasks/${id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    fetchTasks();
  };

  // EDIT START
  const handleEdit = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setDescription(task.description);
  };

  // UPDATE TASK
  const handleUpdateTask = async (e) => {
    e.preventDefault();

    await API.put(
      `/api/tasks/${editId}`,
      { title, description },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    setEditId(null);
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <button onClick={handleLogout} className="btn delete-btn">
        Logout
      </button>

      <h3>Add Task</h3>
      <form
        onSubmit={editId ? handleUpdateTask : handleAddTask}
        className="btn add-btn"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="input"
        />

        <button type="submit">
          {editId ? "Update Task" : "Add Task"}
        </button>
      </form>

      <h3>Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <h4>{task.title}</h4>
            <p>{task.description}</p>

            <p>
              Status:{" "}
              <b style={{ color: task.status === "Completed" ? "green" : "red" }}>
                {task.status}
              </b>
            </p>

            <button
              onClick={() => handleStatusChange(task._id, task.status)}
              className="btn toggle-btn"
            >
              Toggle Status
            </button>

            <button
              onClick={() => handleDelete(task._id)}
              className="btn delete-btn"
            >
              Delete
            </button>

            <button
              onClick={() => handleEdit(task)}
              className="btn edit-btn"
            >
              Edit
            </button>
          </div>
        ))
      )}
    </div>
  );
}
  /*<p>ID: {task._id}</p>*/
