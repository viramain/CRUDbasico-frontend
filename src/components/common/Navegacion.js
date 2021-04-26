import React from "react";
import {Navbar,Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const Navegacion = () => {
return (
    <Navbar bg="danger" expand="lg" variant='dark'>
            <Navbar.Brand href="/">CRUD Cafetería</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink className='nav-link' exact={true} to='/'>Inicio</NavLink>
                    <NavLink className='nav-link' exact={true} to='/productos'>Productos</NavLink>
                    <NavLink className='nav-link' exact={true} to='/productos/nuevo'>Nuevo Producto</NavLink>
                    <NavLink className='nav-link' exact={true} to='/productos/editar'>Editar Producto</NavLink>
                </Nav>
            </Navbar.Collapse>
    </Navbar>    
);
};

export default Navegacion;
