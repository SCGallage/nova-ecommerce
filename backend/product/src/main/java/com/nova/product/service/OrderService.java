package com.nova.product.service;

import com.nova.product.OrderCreateRequest;
import com.nova.product.Repository.OrderRepository;
import com.nova.product.model.ShoppingOrder;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {

    private OrderRepository orderRepository;

    public void createOrder(OrderCreateRequest orderCreateRequest) {
        ShoppingOrder order = ShoppingOrder.builder()
                .total(orderCreateRequest.total())
                .userId(orderCreateRequest.userId())
                .orderDate(new Date())
                .build();
        orderRepository.save(order);
    }

    public List<ShoppingOrder> getAllOrders() {
        return orderRepository.findAll();
    }
}
