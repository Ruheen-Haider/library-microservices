package com.library_service.service;

import com.library_service.model.Book;
import com.library_service.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository repo;

    public Book addBook(Book book) {
        return repo.save(book);
    }

    public List<Book> getAllBooks() {
        return repo.findAll();
    }

    public void deleteBook(Long id) {
        repo.deleteById(id);
    }

    public Book updateBook(Long id, Book updatedBook){
        Book book=repo.findById(id).orElseThrow(()->new RuntimeException("Book not found"));
        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setQuantity(updatedBook.getQuantity());
        return repo.save(book);
    }
    public Book getBookById(Long id){
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public void decreaseQuantity(Long id) {
        Book book = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getQuantity() <= 0) {
            throw new RuntimeException("Book not available");
        }

        book.setQuantity(book.getQuantity() - 1);
        repo.save(book);
    }

    public void increaseQuantity(Long id) {
        Book book = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setQuantity(book.getQuantity() + 1);
        repo.save(book);
    }


}
