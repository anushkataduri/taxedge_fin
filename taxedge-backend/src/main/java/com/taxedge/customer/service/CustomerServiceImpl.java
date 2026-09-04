package com.taxedge.customer.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.taxedge.customer.dto.CustomerDto;
import com.taxedge.customer.entity.Customer;
import com.taxedge.customer.exception.DuplicateResourceException;
import com.taxedge.customer.helper.CustomerHelper;
import com.taxedge.customer.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String registerCustomer(CustomerDto customerDto) {

        validateUniqueFields(customerDto);

        Customer customer = Customer.builder()
                .custId(CustomerHelper.generateCustomerId())
                .name(customerDto.getName())
                .email(customerDto.getEmail())
                .mobileNumber(customerDto.getMobileNumber())
                .aadhaar(customerDto.getAadhaar())
                .pan(customerDto.getPan())
                .dob(customerDto.getDob())
                .customerType(customerDto.getCustomerType())
                .address(customerDto.getAddress())
                .password(passwordEncoder.encode(customerDto.getPassword()))
                .createdAt(LocalDateTime.now())
                .build();

        customerRepository.save(customer);

        return "Registeration Successful";
    }

  
    private void validateUniqueFields(CustomerDto dto) {

        if (isPresent(dto.getAadhaar()) && customerRepository.existsByAadhaar(dto.getAadhaar())) {
            throw new DuplicateResourceException("aadhaar", "Aadhaar already registered");
        }

        if (isPresent(dto.getPan()) && customerRepository.existsByPan(dto.getPan())) {
            throw new DuplicateResourceException("pan", "PAN already registered");
        }
    }

    private boolean isPresent(String value) {
        return value != null && !value.isBlank();
    }
}