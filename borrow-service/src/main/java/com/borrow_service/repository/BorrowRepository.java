package com.borrow_service.repository;

import com.borrow_service.model.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowRepository extends JpaRepository<Borrow,Long> {
    List<Borrow> findByUsername(String username);
}
