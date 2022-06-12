package com.nova.product.controller;

import com.nova.product.ProductAddRequest;
import com.nova.product.model.Product;
import com.nova.product.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("api/v1/product")
@AllArgsConstructor
public class ProductController {

    private ProductService productService;

    @PostMapping(value = "/add")
    public void addProduct(@RequestBody ProductAddRequest productAddRequest) {
        log.info("Product Name {}", productAddRequest.name());
        productService.addProduct(productAddRequest);
    }

    @GetMapping("/")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping(value = "/getProduct/{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productService.getProduct(id).get();
    }

    @PutMapping(value = "/update")
    public void updateProduct(@RequestBody Product product) {
        productService.updateProduct(product);
    }

    @DeleteMapping(value = "/delete/{id}")
    public void deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
    }

}
