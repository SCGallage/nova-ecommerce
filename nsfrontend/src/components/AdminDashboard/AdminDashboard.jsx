import axios from 'axios'
import React, { useEffect, useState } from 'react'
import backendIp from '../../services/Constants'
import { Container, Table } from 'reactstrap'
import AdminNav from '../AdminNav/AdminNav'
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {

    const [userList, setUserList] = useState(null);
    const [orderList, setOrderList] = useState(null);

    const loadUserAndOrderData = async () => {
        await axios.all([axios.get(backendIp + '/api/v1/user'), axios.get('http://localhost:8085/api/v1/order')]).then(axios.spread((...responses) => {
            const userList = responses[0].data
            const orderList = responses[1].data

            console.log(userList);
            console.log(orderList);
            setUserList(userList);
            setOrderList(orderList); 
          }));
    }

    useEffect(() => {
        loadUserAndOrderData();
    }, []);

  return (
    <>
        <AdminNav style={{alignSelf: 'flex-start'}} />
        <Container>
            <div className={styles.mainContainer}>
            <h4 className={styles.table_headings}>Users List</h4>
                <Table bordered className={styles.table_col}>
                    <thead>
                        <tr>
                        <th>
                            #
                        </th>
                        <th>
                            First Name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Email
                        </th>
                        </tr>
                    </thead>
                    <tbody> 
                        {userList && userList.map((user, index) => {
                            //setCartTotal(cartTotal + (cartItem.price * parseInt(cartItem.quantity)))
                            return (
                                <tr key={index}>
                                    <th scope="row">
                                        {user.Id}
                                    </th>
                                    <td>
                                        {user.firstName}
                                    </td>
                                    <td>
                                        {user.lastName}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                </tr>  
                            );
                        })} 
                    </tbody>
                </Table>
                </div>
                <div className={styles.mainContainer}>
                <h4 className={styles.table_headings}>Orders List</h4>
                <Table className={styles.table_col} bordered>
                    <thead>
                        <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Total
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            User ID
                        </th>
                        </tr>
                    </thead>
                    <tbody> 
                        {orderList && orderList.map((order, index) => {
                            //setCartTotal(cartTotal + (cartItem.price * parseInt(cartItem.quantity)))
                            return (
                                <tr key={index}>
                                    <th scope="row">
                                        {order.id}
                                    </th>
                                    <td>
                                        {order.total}
                                    </td>
                                    <td>
                                        {order.orderDate}
                                    </td>
                                    <td>
                                        {order.userId}
                                    </td>
                                </tr>  
                            );
                        })} 
                    </tbody>
                </Table>
                </div>
            </Container>
    </>
  )
}

export default AdminDashboard