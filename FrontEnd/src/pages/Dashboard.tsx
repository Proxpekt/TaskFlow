import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getTasksApi,
  createTaskApi,
  toggleTaskApi,
  deleteTaskApi,
  updateTaskApi,
} from "../api/tasksApi";
import type { Task } from "../api/tasksApi";
import { useAuth } from "../context/AuthContext";

type CreateTaskForm = {
  title: string;
  description?: string;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<CreateTaskForm>();

  const editForm = useForm<CreateTaskForm>();

  const { logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasksApi();
    setTasks(data);
    setLoading(false);
  };

  const onCreate = async (values: CreateTaskForm) => {
    const task = await createTaskApi(values);
    setTasks((prev) => [task, ...prev]);
    reset();
  };

  const toggleTask = async (id: string) => {
    const updated = await toggleTaskApi(id);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const deleteTask = async (id: string) => {
    await deleteTaskApi(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const startEdit = (task: Task) => {
    setEditingId(task._id);
    editForm.reset({
      title: task.title,
      description: task.description,
    });
  };

  const saveEdit = async (id: string, values: CreateTaskForm) => {
    const updated = await updateTaskApi(id, values);

    setTasks((prev) =>
      prev.map((t) => (t._id === id ? updated : t))
    );

    setEditingId(null);
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">

    {/* NAVBAR */}
    <div className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-indigo-600">Task Manager</h1>

        <button
          onClick={logout}
          className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>

    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">Your Tasks</h2>
        <p className="text-gray-500">Stay organized and productive ✨</p>
      </div>

      {/* CREATE TASK */}
      <form
        onSubmit={handleSubmit(onCreate)}
        className="bg-white rounded-2xl shadow p-5 space-y-4"
      >
        <input
          placeholder="What needs to be done?"
          {...register("title", { required: true })}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <input
          placeholder="Optional description"
          {...register("description")}
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          Add Task
        </button>
      </form>

      {/* TASK LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks yet.</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition"
            >
              {editingId === task._id ? (
                <form
                  onSubmit={editForm.handleSubmit((v) =>
                    saveEdit(task._id, v)
                  )}
                  className="space-y-3"
                >
                  <input
                    {...editForm.register("title")}
                    className="w-full border rounded px-3 py-2"
                  />

                  <input
                    {...editForm.register("description")}
                    className="w-full border rounded px-3 py-2"
                  />

                  <div className="flex gap-3">
                    <button className="text-indigo-600">Save</button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="text-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <h3
                      className={`font-semibold text-lg ${
                        task.completed && "line-through text-gray-400"
                      }`}
                    >
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="text-sm text-gray-500">
                        {task.description}
                      </p>
                    )}

                    {task.completed && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded mt-1 inline-block">
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 text-sm">
                    <button
                      onClick={() => toggleTask(task._id)}
                      className="text-indigo-600 hover:underline"
                    >
                      {task.completed ? "Undo" : "Done"}
                    </button>

                    <button
                      onClick={() => startEdit(task)}
                      className="text-yellow-500 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  </div>
);

}
