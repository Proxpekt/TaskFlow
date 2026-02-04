import api from "./axiosClient";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  username: string;
  email: string;
  fullname: string;
  password: string;
};

export async function loginApi(payload: LoginPayload) {
  const res = await api.post("/users/login", payload);
  return res.data.data;
}

export async function registerApi(payload: RegisterPayload) {
  const res = await api.post("/users/register", payload);
  return res.data.data;
}

export const getMeApi = async () => {
  const res = await api.get("/users/me");
  return res.data.data;
};

export const logoutApi = async () => {
  const res = await api.post("/users/logout");
  return res.data.data;
}
