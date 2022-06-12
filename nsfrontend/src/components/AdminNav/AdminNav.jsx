import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Button  } from "reactstrap";

const AdminNav = () => {

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
                <NavLink href="/admin/product/display_all">
                    Products List
                </NavLink>
                </NavItem>
                
            </Nav>
            <NavbarText>
                {localStorage.getItem('userName')}
            </NavbarText>
            </Collapse>
        </Navbar>
    );
}

export default AdminNav;