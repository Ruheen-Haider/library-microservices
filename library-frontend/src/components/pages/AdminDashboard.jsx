
import "../../App.css";
import Navbar from "../common/Navbar";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useLibrary } from "../hooks/useLibrary";



function AdminDashboard() {


    const username = localStorage.getItem("username");
    const {
        books,
        history,
        handleBorrow,
        handleReturn,
        fetchBooks
    } = useLibrary(username);

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [quantity, setQuantity] = useState("");
    const [editingId, setEditingId] = useState(null);


    // ✅ Add new book
    const handleAddOrUpdate = async () => {
        try {
            if (editingId) {
                {/*Update Book*/ }
                await api.put(`/books/${editingId}`, {
                    title,
                    author,
                    quantity: Number(quantity)
                });
            } else {
                {/*Add Book*/ }
                await api.post("/books/add", {
                    title,
                    author,
                    quantity: Number(quantity)
                });
            }

            // clear fields
            setTitle("");
            setAuthor("");
            setQuantity("");
            setEditingId(null);

            fetchBooks(); // refresh list

        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/books/${id}`);
            fetchBooks();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (book) => {
        setAuthor(book.author);
        setTitle(book.title);
        setQuantity(book.quantity);
        setEditingId(book.id);
    }

    return (
        <div className="admin-container" >
            <Navbar />
            {/* ✅ Header */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Admin Dashboard</h1>
                

            </div>


            {/* ✅ Add Book Form */}
            <div className="form">
                <input
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    placeholder="Author"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                />
                <input
                    placeholder="Quantity"
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                />
                <button onClick={handleAddOrUpdate}>{editingId ? "Update Book" : "Add Book"}</button>
            </div>

            {/* Book List */}
            <div className="book-list">
                <h2>Books</h2>
                {books.map(book => (
                    <div key={book.id} className="book-item">
                        <p><b>{book.title}</b></p>
                        <p>{book.author}</p>
                        <p>Qty: {book.quantity}</p>

                        {/* Update Book */}

                        <button onClick={() => handleEdit(book)}>
                            Edit
                        </button>

                        <button onClick={() => handleBorrow(book.id)}>
                            Borrow
                        </button>


                        {/* Delete Book */}

                        <button onClick={() => handleDelete(book.id)}>
                            Delete
                        </button>

                    </div>
                ))}
            </div>


            {/* BORROW HISTORY */}

            <div className="book-list">
                <h2>Borrow History</h2>

                {history.map(item => (
                    <div key={item.id} className="book-item">

                        <p><b>{item.bookTitle}</b></p>
                        <p>User: {item.username}</p>
                        <p>Borrowed: {item.borrowDate}</p>

                        {item.returnDate ? (
                            <p>Returned: {item.returnDate}</p>
                        ) : (
                            <button onClick={() => handleReturn(item.id)}>
                                Return Book
                            </button>
                        )}

                    </div>
                ))}
            </div>
        </div>

    )
}
export default AdminDashboard;
