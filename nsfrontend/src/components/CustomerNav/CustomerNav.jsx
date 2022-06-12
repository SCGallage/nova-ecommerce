import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Button  } from "reactstrap";
import styles from './CustomerNav.module.css';

const CustomerNav = () => {

    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")));
    const navigate = useNavigate();
    const { userId } = useParams();

    const removeItemFromCart = (index) => {
        let newCartItems = cartItems;
        newCartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        console.log(newCartItems);
        setCartItems([...newCartItems]);
    }

    return (
        <Navbar
            color="dark"
            expand="md"
            dark
        >
            <NavbarBrand href="/">
            Product Catalogue
            </NavbarBrand>
            <NavbarToggler onClick={function noRefCheck(){}} />
            <Collapse navbar>
            <Nav
                className="me-auto"
                navbar
            >
                <NavItem>
                <NavLink href={`/customer/${userId}/products`}>
                    Products
                </NavLink>
                </NavItem>
                <UncontrolledDropdown
                inNavbar
                nav
                >
                <DropdownToggle
                    caret
                    nav
                >
                    Shopping Cart
                </DropdownToggle>
                <DropdownMenu right>
                    {cartItems && cartItems.map((cartItem, index) => {
                        return (
                            <DropdownItem key={index}>
                                {cartItem.name}({cartItem.quantity} Items)
                                <Button  
                                    onClick={() => removeItemFromCart(index)}
                                    color="warning"
                                    className={styles.btn}
                                >
                                    Remove
                                </Button>
                            </DropdownItem>
                        );
                    })}
                    <DropdownItem>
                        <Button 
                            onClick={() => {navigate(`../${userId}/checkout`, { replace: true })}}
                            color="primary" 
                            style={{marginLeft: '0px'}}
                            className={styles.btn}
                        >
                            Checkout
                        </Button>
                    </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
            <NavbarText>
                {localStorage.getItem('userName')}
            </NavbarText>
            </Collapse>
        </Navbar>
    );
}

export default CustomerNav;