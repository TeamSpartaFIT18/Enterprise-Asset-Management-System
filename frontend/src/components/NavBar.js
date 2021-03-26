import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './NavBar.css';

const NavBar = () => {
  return (
    <header className='nav1'>
      <Navbar
        className='Navibar'
        bg='black'
        variant='dark'
        expand='md'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='EimskyBrand'>Eimsky</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/products'>
                <Nav.Link>
                  <p className='NavLinks'>
                    <i className='fas fa-shopping-basket'></i> Products
                  </p>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link href='#cart'>
                  <p className='NavLinks'>
                    <i className='fas fa-shopping-cart'></i> Cart
                  </p>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/signin'>
                <Nav.Link href='#sign-in'>
                  <p className='NavLinks'>
                    <i className='fas fa-user'></i> Sign in
                  </p>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
