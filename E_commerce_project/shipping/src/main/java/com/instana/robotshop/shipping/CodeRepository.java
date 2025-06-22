package com.instana.robotshop.shipping;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface CodeRepository extends PagingAndSortingRepository<Code, Long> {
    // Inherits all CRUD methods
}
