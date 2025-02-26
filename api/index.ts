import axios from "axios";

export const authInstance = axios.create({
  timeout: 100000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function getMenuTree() {
  const res = await authInstance.get(`/menu-service/api/tree`);
  return res;
}

export async function menuTreeUpdate(payload: any) {
  console.log(payload);
  const res = await authInstance.put(`/menu-service/api/tree`, payload);
  console.log(res.data);
  return res;
}

export async function menuCreate(payload: any) {
  console.log(payload);
  const res = await authInstance.post(`/menu-service/api`, payload);
  console.log(res.data);
  return res;
}
