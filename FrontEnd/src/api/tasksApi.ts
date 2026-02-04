import api from "./axiosClient";

export type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
};

export const getTasksApi = async () => {
  const res = await api.get("/tasks");
  return res.data.data as Task[];
};

export const createTaskApi = async (payload: {
  title: string;
  description?: string;
}) => {
  const res = await api.post("/tasks", payload);
  return res.data.data;
};

export const updateTaskApi = async (
  id: string,
  payload: { title?: string; description?: string }
) => {
  const res = await api.patch(`/tasks/${id}`, payload);
  return res.data.data;
};


export const toggleTaskApi = async (id: string) => {
  const res = await api.patch(`/tasks/${id}/toggle`);
  return res.data.data;
};

export const deleteTaskApi = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
