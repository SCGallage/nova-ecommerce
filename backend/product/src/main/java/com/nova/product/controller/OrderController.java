package com.nova.product.controller;

import com.nova.product.OrderCreateRequest;
import com.nova.product.model.ShoppingOrder;
import com.nova.product.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("api/v1/order")
@AllArgsConstructor
public class OrderController {

    private OrderService orderService;

    @PostMapping
    public void createOrder(@RequestBody OrderCreateRequest orderCreateRequest) {
        orderService.createOrder(orderCreateRequest);
    }

    @GetMapping
    public List<ShoppingOrder> getAllOrders() {
        return orderService.getAllOrders();
    }

}
