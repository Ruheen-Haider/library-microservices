import "../../App.css";
import Navbar from "../common/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLibrary } from "../hooks/useLibrary";

function LibrarianDashboard() {

    const username = localStorage.getItem("username");

    const {
        books,
        history,
        handleBorrow,
        handleReturn
    } = useLibrary(username);

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="admin-container">
            <Navbar />
            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Librarian Dashboard</h1>

            </div>

            {/* BOOK LIST */}
            <div className="book-list">
                <h2>Books</h2>

                {books.map(book => (
                    <div key={book.id} className="book-item">
                        <p><b>{book.title}</b></p>
                        <p>{book.author}</p>
                        <p>Qty: {book.quantity}</p>

                        <button onClick={() => handleBorrow(book.id)}>
                            Borrow
                        </button>
                    </div>
                ))}
            </div>

            {/* HISTORY */}
            <div className="book-list">
                <h2>Borrow History</h2>

                {history.map(item => (
                    <div key={item.id} className="book-item">

                        <p><b>{item.bookTitle}</b></p>
                        <p>Borrowed: {item.borrowDate}</p>

                        {!item.returnDate && (
                            <button onClick={() => handleReturn(item.id)}>
                                Return Book
                            </button>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default LibrarianDashboard;