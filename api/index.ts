import axios from "axios";

export const authInstance = axios.create({
  timeout: 100000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function getMenuTree() {
  const res = await authInstance.get(`/menu-service/api/tree`);
  return res;
}
