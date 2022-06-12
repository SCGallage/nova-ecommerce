package com.nova.product.service;

import com.nova.product.ProductAddRequest;
import com.nova.product.Repository.ProductRepository;
import com.nova.product.model.Product;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {

    private ProductRepository productRepository;

    public void addProduct(@RequestBody ProductAddRequest productAddRequest) {
        Product product = Product.builder()
                .name(productAddRequest.name())
                .price(productAddRequest.price())
                .quantity(productAddRequest.quantity())
                .description(productAddRequest.description())
                .build();

        productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProduct(Integer productId) {
        return productRepository.findById(productId);
    }

    public void updateProduct(Product product) {
        productRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}
