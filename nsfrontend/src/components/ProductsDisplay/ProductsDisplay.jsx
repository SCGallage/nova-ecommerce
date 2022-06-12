import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Container } from "reactstrap";
import backendIp from "../../services/Constants";
import { useNavigate } from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav";
import styles from './ProductsDisplay.module.css'

const ProductsDisplay = () => {
    
    const [products, setProducts] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {
        loadProducts();
    }, []);

    const deleteProduct = async (productId) => {
        axios.delete(`http://localhost:8085/api/v1/product/delete/${productId}`);
        console.log(productId)
        await loadProducts();
    }

    const loadProducts = async () => {
        await axios.get('http://localhost:8085/api/v1/product/')
            .then(response => {
                console.log(response.data)
                setProducts(response.data)
            });
    }

    return (
        <>
            <AdminNav />
            <Container className={styles.mainContainer}>
                <h4 className={styles.table_headings}>Product List</h4>
                <Button onClick={() => navigate('../add')} className={styles.addBtn}>
                    Add Product
                </Button>
           <Table className={styles.table_col} bordered>
                <thead>
                    <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        Actions
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">
                                    {product?.id}
                                </th>
                                <td>
                                    {product?.name}
                                </td>
                                <td>
                                    {product?.price}
                                </td>
                                <td>
                                    {product?.quantity}
                                </td>
                                <td>
                                    {product?.description}
                                </td>
                                <td>
                                <Button
                                    color="primary"
                                    onClick={() => navigate(`../update/${product.id}`)}
                                    className={[styles.actionBtn, styles.updateBtn]}
                                >
                                    Update
                                </Button><Button
                                    color="danger"
                                    onClick={() => {
                                        deleteProduct(product?.id)
                                        window.location.reload();
                                    }}
                                    className={styles.actionBtn}
                                >
                                    Delete
                                </Button>
                                </td>
                             </tr>
                        );
                    })}
                </tbody>
                </Table> 
                </Container>
        </>
    );

}

export default ProductsDisplay;