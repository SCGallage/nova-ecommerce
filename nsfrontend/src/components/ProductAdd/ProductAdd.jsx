import React, { useState } from "react";
import axios from "axios";
import { Container, Input, Label, FormGroup, Form, Button } from "reactstrap";
import styles from './ProductAdd.module.css';
import { useNavigate } from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav";

const ProductAdd = () => {
    
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const sendProductAddRequest = (event) => {
        event.preventDefault();
        const productDetails = {
            name: name,
            price: price,
            quantity: quantity, 
            description: description
        }

        console.log(JSON.stringify(productDetails));
        
        axios.post('http://localhost:8085/api/v1/product/add', productDetails)
            .then(response => {
                console.log(response.data)
                navigate('../display_all')
            });
    }

    return (
        <>
        <AdminNav />
        <Container className={styles.formContainer}>
            <h4 className={styles.cardHeading}>Add Product</h4>
            <Form onSubmit={sendProductAddRequest}>
                <FormGroup>
                    <Label for="exampleEmail">
                    Name
                    </Label>
                    <Input
                    id="exampleEmail"
                    name="name"
                    placeholder="Enter Item Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                    Price
                    </Label>
                    <Input
                    id="examplePassword"
                    name="price"
                    placeholder="Enter Item Price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                    Quantity
                    </Label>
                    <Input
                    id="examplePassword"
                    name="quantity"
                    placeholder="Enter Item Quantity"
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">
                    Description
                    </Label>
                    <Input
                    id="exampleText"
                    name="text"
                    type="textarea"
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>
                <Button>
                    Add Product
                </Button>
                </Form>
            </Container>    
        </>
    );

}

export default ProductAdd;