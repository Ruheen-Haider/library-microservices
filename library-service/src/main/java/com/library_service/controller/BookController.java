package com.library_service.controller;

import com.library_service.model.Book;
import com.library_service.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService service;

    @PostMapping("/add")
    public Book addBook(@RequestBody Book book) {
        return service.addBook(book);
    }

    @GetMapping("/view")
    public List<Book> getAllBooks() {
        return service.getAllBooks();
    }

    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
        return "Book deleted successfully";
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book updatedBook){
        return service.updateBook(id,updatedBook);
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return service.getBookById(id);
    }

    @PutMapping("/decrease/{id}")
    public void decreaseQuantity(@PathVariable Long id) {
        service.decreaseQuantity(id);
    }

    @PutMapping("/increase/{id}")
    public void increaseQuantity(@PathVariable Long id) {
        service.increaseQuantity(id);
    }
}
