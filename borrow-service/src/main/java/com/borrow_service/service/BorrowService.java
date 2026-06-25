package com.borrow_service.service;

import com.borrow_service.model.Book;
import com.borrow_service.model.Borrow;
import com.borrow_service.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowService {
    @Autowired
    private BorrowRepository borrowRepository;

    private final String LIBRARY_URL = "http://localhost:8082/books";

    public String borrowBook(String username, Long bookId){

        RestTemplate restTemplate = new RestTemplate();
        // ✅ Get book from library-service
        Book book =restTemplate.getForObject(
                LIBRARY_URL+"/"+bookId,
                Book.class
        );
        if (book==null || book.getQuantity()<=0){
            throw new RuntimeException("Book not available");
        }
        //decrease quantity
        restTemplate.put(
                LIBRARY_URL + "/decrease/" + bookId,
                null
        );

       // save borrow
        Borrow borrow = new Borrow();
        borrow.setBookId(book.getId());
        borrow.setUsername(username);
        borrow.setBookTitle(book.getTitle());
        borrow.setBorrowDate(LocalDate.now());

        borrowRepository.save(borrow);

        return "Book borrowed successfully";
    }

    public String returnBook(Long borrowId){

        RestTemplate restTemplate = new RestTemplate();

        // find borrow record
        Borrow borrow = borrowRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow not found"));

        // call library-service to increase quantity
        restTemplate.put(
                "http://localhost:8082/books/increase/" + borrow.getBookId(),
                null
        );


       //  mark return date
        borrow.setReturnDate(LocalDate.now());

        borrowRepository.save(borrow);

        return "Book returned ";

    }

    public List<Borrow> getBorrowHistory(String username) {

        return borrowRepository.findByUsername(username);
    }

}
