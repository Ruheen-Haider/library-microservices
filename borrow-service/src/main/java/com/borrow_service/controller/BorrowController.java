package com.borrow_service.controller;

import com.borrow_service.model.Borrow;
import com.borrow_service.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/borrow")
public class BorrowController {
    @Autowired
    private BorrowService borrowService;

    @PostMapping("/{bookId}")
    public String borrowBook(@PathVariable Long bookId, @RequestParam String username){
        return borrowService.borrowBook(username,bookId);
    }

    @PutMapping("/return/{borrowId}")
    public String returnBook(@PathVariable Long borrowId) {
        return borrowService.returnBook(borrowId);
    }


    @GetMapping("/history")
    public List<Borrow> getHistory(@RequestParam String username) {
        return borrowService.getBorrowHistory(username);
    }

}
