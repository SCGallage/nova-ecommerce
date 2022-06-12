import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Table } from 'reactstrap'
import CustomerNav from '../CustomerNav/CustomerNav';
import styles from './CheckOut.module.css'

const CheckOut = () => {

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")));
    const [cartTotal, setCartTotal] = useState(0);
    const { userId } = useParams();
    let totalValue = 0;

    const navigate = useNavigate();

    const addOrder = async () => {
        await axios.post('http://localhost:8085/api/v1/order', {
            total: totalValue,
            userId: userId
        }).then(response => {
            localStorage.removeItem("cartItems");
            navigate(`../${userId}/products`);
        });
    };

    return (
        <>
            <CustomerNav />
            <Container className={styles.mainContainer}>
                <h4 className={styles.table_headings}>Check Out</h4>
                <Table  bordered className={styles.table_col} hover>
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
                        </th>
                        </tr>
                    </thead>
                    <tbody> 
                        {cartItems && cartItems.map((cartItem, index) => {
                            totalValue = totalValue + (cartItem.price * parseInt(cartItem.quantity));
                            return (
                                <tr key={index}>
                                    <th scope="row">
                                        {cartItem.id}
                                    </th>
                                    <td>
                                        {cartItem.name}
                                    </td>
                                    <td>
                                        {cartItem.price}
                                    </td>
                                    <td>
                                        {cartItem.quantity}
                                    </td>
                                    <td>
                                        {cartItem.price * parseInt(cartItem.quantity)}
                                    </td>
                                </tr>  
                            );
                        })} 
                        <tr>
                            <th scope="row" colSpan={4}>
                                Total
                            </th>
                            <td>
                                {totalValue}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Button onClick={() => {addOrder()}}>
                    Confirm Order
                </Button>
            </Container>
        </>
    )
}

export default CheckOut