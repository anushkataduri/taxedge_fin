package com.taxedge.customer.repository;

import com.taxedge.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, String> {
	
	boolean existsByAadhaar(String aadhaar);

    boolean existsByPan(String pan);
}
