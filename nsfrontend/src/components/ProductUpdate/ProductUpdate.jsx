import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Input, Label, FormGroup, Form, Button, Container } from "reactstrap";
import backendIp from "../../services/Constants";
import styles from './ProductUpdate.module.css'
import AdminNav from "../AdminNav/AdminNav";

const ProductUpdate = () => {
    
    const { id } = useParams();

    const [productId] = useState(id)
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        loadProductDetails();
    }, [])

    const loadProductDetails = async () => {
        await axios.get(`http://localhost:8085/api/v1/product/getProduct/${productId}`)
            .then(response => {
                console.log(response.data);
                setName(response.data.name);
                setPrice(response.data.price);
                setQuantity(response.data.quantity);
                setDescription(response.data.description);
            });
    }

    const sendProductUpdateRequest = (event) => {
        event.preventDefault();
        const productDetails = {
            id: productId,
            name: name,
            price: price,
            quantity: quantity, 
            description: description
        }

        console.log(JSON.stringify(productDetails));
        
        axios.put('http://localhost:8085/api/v1/product/update', productDetails)
            .then(response => {
                console.log(response.data)
                navigate('../display_all');
            });
    }

    return (
        <>
        <AdminNav />
        <Container className={styles.formContainer}>
            <h4 className={styles.cardHeading}>Update Product</h4>
            <Form onSubmit={sendProductUpdateRequest}>
                <FormGroup>
                    <Label for="exampleEmail">
                    Name
                    </Label>
                    <Input
                    id="exampleEmail"
                    name="name"
                    placeholder="Enter Item Name"
                    type="text"
                    value={name}
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
                    value={price}
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
                    value={quantity}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>
                <Button color="primary" type="submit">
                    Update
                </Button>
                </Form>
            </Container>
        </>
    );

}

export default ProductUpdate;