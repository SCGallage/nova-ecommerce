import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, CardBody, CardTitle, CardImg, Input, Label, FormGroup, Form, Button, Container } from "reactstrap";
import backendIp from "../../services/Constants";
import { validEmail, validPassword } from "../../services/RegEx";
import styles from "./Register.module.css";

const Register = () => {

    const [firstName, setFistName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const [passwdErr, setPassErr] = useState(null);
    const [passwdMatch, setPasswordMatch] = useState(null);

    const navigate = useNavigate();

    const sendRegistationRequest = (event) => {
        event.preventDefault();
        const registrationRequest = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            userType: "customer"
        }

        axios.post(backendIp + '/api/v1/user/register', registrationRequest)
            .then(response => {
                console.log(response.data)
                navigate('/login')
            });
        console.log(JSON.stringify(registrationRequest));
    };

    const validatePassword = (password) => {

        console.log(validPassword.test(password));
        if(!validPassword.test(password)){
            setPassErr(true);
            return;
        }
        setPassErr(false);

    }

    const checkPasswordMatch = () => {
        if (conPassword === password){
            setPasswordMatch(true);
            return;
        }

        setPasswordMatch(false);
    }

    return (
        <>
        <Container className={styles.login_card}>
        <Row>
            <Col className={styles.card_left}>
                <img className={styles.cardImage} src="./4957136.jpg" alt="loginimage" />
            </Col>
            <Col className={styles.paddingtest}>
                <h4 className={styles.registerHeading}>Register</h4>
                <Form onSubmit={sendRegistationRequest} >
                <FormGroup>
                        <Row>
                            <Col>
                                <Label for="examplePassword">
                                First Name
                                </Label>
                                <Input
                                id="examplePassword"
                                name="firstName"
                                placeholder="Enter First Name"
                                type="text"
                                onChange={(e) => {
                                    setFistName(e.target.value);
                                    console.log(e.target.value);
                                }}
                                 required/>
                            </Col>
                            <Col>
                                <Label for="examplePassword">
                                Last Name
                                </Label>
                                <Input
                                id="examplePassword"
                                name="lastName"
                                placeholder="Enter First Name"
                                type="text"
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                    console.log(e.target.value);
                                }}
                                required/>
                            </Col>
                        </Row>
                    </FormGroup>
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
                        required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">
                        Password
                        </Label>
                        <Input
                        id="examplePassword"
                        name="password"
                        placeholder="Enter New Password"
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                            console.log(e.target.value);
                        }}
                        invalid={(passwdErr != null ? passwdErr : false)}
                        valid={(passwdErr != null ? !passwdErr : false)}
                        required/>
                    </FormGroup>
                    <FormGroup >
                        <Label for="examplePassword">
                        Confirm Password
                        </Label>
                        <Input
                        id="examplePassword"
                        name="password"
                        placeholder="Confirm Password"
                        type="password"
                        onChange={(e) => {
                            setConPassword(e.target.value);
                            checkPasswordMatch();
                            console.log(e.target.value);
                        }}
                        invalid={(passwdMatch != null ? passwdMatch : false)}
                        valid={(passwdMatch != null ? !passwdMatch : false)}
                        required/>
                        <Row style={{marginTop: '20px'}}>
                            <Col>
                                <Button
                                    color="primary"
                                    type="submit"
                                    className={[styles.btn, styles.signup]}
                                >
                                    Sign Up
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    color="secondary"
                                    className={styles.btn}
                                    onClick={() => navigate('login')}
                                >
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
        </Container>
        </>
    );

}

export default Register;