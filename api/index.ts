import axios from "axios";

export const authInstance = axios.create({
  timeout: 100000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function getMenuTree() {
  const res = await authInstance.get(`/menu-service/api/tree`);
  console.log(res);
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
  try {
    const res = await authInstance.post(`/menu-service/api`, payload);
    console.log(res.data);
    return res;
  } catch (error: any) {
    console.log(error.response.data.message);
    alert(error.response.data.message);
  }
}

export async function menuDetail(menuNo: any) {
  console.log(menuNo);
  try {
    const res = await authInstance.get(`/menu-service/api/` + menuNo);
    console.log(res.data);
    return res;
  } catch (error: any) {
    console.log(error.response.data.message);
    alert(error.response.data.message);
  }
}

export async function menuDelete(menuNo: any) {
  console.log(menuNo);
  try {
    const res = await authInstance.delete(`/menu-service/api/` + menuNo);
    console.log(res.data);
    return res;
  } catch (error: any) {
    console.log(error.response.data.message);
    alert(error.response.data.message);
  }
}

export async function menuRecorect(menuNo: any, payload: any) {
  console.log(menuNo);
  try {
    const res = await authInstance.put(`/menu-service/api/` + menuNo, payload);
    console.log(res.data);
    return res;
  } catch (error: any) {
    console.log(error.response.data.message);
    alert(error.response.data.message);
  }
}
