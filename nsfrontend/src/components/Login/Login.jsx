import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Input, Label, FormGroup, Form, Button, Container } from "reactstrap";
import backendIp from "../../services/Constants";
import styles from "./Login.module.css";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const sendLoginRequest = (event) => {
        event.preventDefault();
        const loginRequest = {
            email: email,
            password: password
        }

        axios.post(backendIp + '/api/v1/user/login', loginRequest)
            .then(response => {
                console.log(response.data)
                if (response.data.validity && response.data.userType === "customer"){
                    localStorage.setItem("userName", `${response.data.firstName} ${response.data.lastName}`);
                    navigate(`../customer/${response.data.Id}/products`);
                } else if (response.data.validity && response.data.userType === "admin"){
                    localStorage.setItem("userName", `${response.data.firstName} ${response.data.lastName}`);
                    navigate(`../admin/dashboard`);
                }
            });
        console.log(JSON.stringify(loginRequest));
    };

    return (
        <>
        <Container className={styles.login_card}>
        <Row>
            <Col className={styles.card_left}>
                <img className={styles.cardImage} src="./login.jpg" alt="loginimage" />
            </Col>
            <Col className={styles.paddingtest}>
                <h4 className={styles.registerHeading}>Login</h4>
                <Form onSubmit={sendLoginRequest}>
                    <FormGroup>
                        <Label for="exampleEmail">
                        Email
                        </Label>
                        <Input
                        id="exampleEmail"
                        name="email"
                        placeholder="Enter Email"
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            console.log(e.target.value);
                        }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">
                        Password
                        </Label>
                        <Input
                        id="examplePassword"
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            console.log(e.target.value);
                        }}
                        />
                    </FormGroup>
                    <Row>
                            <Col>
                                <Button
                                    color="primary"
                                    type="submit"
                                    className={[styles.btn, styles.signup]}
                                >
                                    Login
                                </Button>
                            </Col>
                    </Row>
                    <Row>
                            <Col>
                                <Button
                                    color="secondary"
                                    className={styles.btn}
                                    onClick={() => navigate('../')}
                                >
                                    Sign Up
                                </Button>
                            </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
        </Container>
        </>
    );

}

export default Login;