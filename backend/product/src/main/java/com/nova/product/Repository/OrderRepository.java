package com.nova.product.Repository;

import com.nova.product.model.ShoppingOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<ShoppingOrder, Integer> {
}
