import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Input } from "reactstrap";
import CustomerNav from "../CustomerNav/CustomerNav";
import styles from './CustomerProductDisplay.module.css'

const CustomerProductDisplay = () => {

    const getAllCustomerProducts = async () => {
        await axios.get('http://localhost:8085/api/v1/product/')
            .then(response => {
                console.log(response.data);
                setProducts(response.data);
            });
    };

    const [products, setProducts] = useState(null);
    const [quantity, selectedItemQuantity] = useState(null);

    useEffect(() => {
        getAllCustomerProducts();
    }, []);

    const addItemToCart = (id, name, price) => {
        let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

        cartItems.push({
            id: id,
            name: name,
            price: price, 
            quantity: quantity
        });

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        window.location.reload();
        
    }

    return (
        <>
        <CustomerNav />
        <Container fluid="md" className={styles.mainContainer}>
            <h4 className={styles.table_headings}>Products</h4>
            <hr />
            <Row sm="4">
                {products && products.map((product, index) => {
                    return (
                        <Col className="col-sm" key={index}>
                            <Card key={index} className={styles.product_color}>
                                <CardBody>
                                <CardTitle tag="h5">
                                    {product.name}
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                    Price: {`Rs. ${product.price}`}
                                </CardSubtitle>
                                <CardText>
                                    {product.description}
                                </CardText>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder="Enter Quantity"
                                    type="number"
                                    value={(product.id ? product.id : '')}
                                    readOnly
                                    hidden
                                />
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder="Enter Quantity"
                                    type="number"
                                    onChange={(e) => {console.log(e.target.value); selectedItemQuantity(e.target.value)}}
                                />
                                <Button
                                    onClick={() => {console.log("Hello"); addItemToCart(product.id, product.name, product.price)}}
                                    className={styles.quantityInput}
                                    color="primary"
                                >
                                    Add To Cart
                                </Button>
                                </CardBody>
                            </Card>
                        </Col>   
                    );
                })}
            </Row>
        </Container>
        </>
    );
}

export default CustomerProductDisplay;