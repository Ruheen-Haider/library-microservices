import api from "./api";

export const getBooks = () => api.get("/books/view");
export const addBook = (data) => api.post("/books/add", data);
export const updateBook = (id, data) => api.put(`/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/books/${id}`);

export const borrowBook = (id, username) =>
  api.post(`/borrow/${id}?username=${username}`);

export const returnBook = (id) =>
  api.put(`/borrow/return/${id}`);

export const getHistory = (username) =>
  api.get(`/borrow/history?username=${username}`);
