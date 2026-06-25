import { useState, useEffect } from "react";
import {
  getBooks,
  getHistory,
  borrowBook,
  returnBook
} from "../services/libraryService";

export const useLibrary = (username) => {

  const [books, setBooks] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  const fetchHistory = async () => {
    const res = await getHistory(username);
    setHistory(res.data);
  };

  const handleBorrow = async (id) => {
    await borrowBook(id, username);
    fetchBooks();
    fetchHistory();
  };

  const handleReturn = async (id) => {
    await returnBook(id);
    fetchBooks();
    fetchHistory();
  };

  useEffect(() => {
    fetchBooks();
    fetchHistory();
  }, []);

  return {
    books,
    history,
    handleBorrow,
    handleReturn,
    fetchBooks,
    fetchHistory
  };
};