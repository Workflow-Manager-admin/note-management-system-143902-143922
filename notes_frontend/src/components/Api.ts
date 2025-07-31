import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  username: string;
  token: string;
}

// PUBLIC_INTERFACE
export async function login(username: string, password: string) {
  // Replace this with your backend's login endpoint and JWT/token handling
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  });
  return response.data as User;
}

// PUBLIC_INTERFACE
export async function signup(username: string, password: string) {
  // Replace this with your backend's signup endpoint
  const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
    username,
    password,
  });
  return response.data as User;
}

// PUBLIC_INTERFACE
export async function getNotes(token: string, category: string = "", search: string = "") {
  const response = await axios.get<Note[]>(`${API_BASE_URL}/notes`, {
    params: { category, search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// PUBLIC_INTERFACE
export async function createNote(token: string, data: {title: string; content: string; category: string}) {
  const response = await axios.post<Note>(`${API_BASE_URL}/notes`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// PUBLIC_INTERFACE
export async function updateNote(token: string, id: string, data: {title: string, content: string, category: string}) {
  const response = await axios.put<Note>(`${API_BASE_URL}/notes/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

// PUBLIC_INTERFACE
export async function deleteNote(token: string, id: string) {
  await axios.delete(`${API_BASE_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
