import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import './NavBar.css'

const NavBar = () => {
	const dispatch = useDispatch()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const logoutHandler = () => {
		dispatch(logout())
	}

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
						<Navbar.Brand className='EimskyBrand'>EIMSKY</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<LinkContainer to='/products'>
								<Nav.Link className='NavLinks'>
									<i className='fas fa-shopping-basket'></i> Products
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/cart'>
								<Nav.Link className='NavLinks'>
									<i className='fas fa-shopping-cart'></i> Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id='username'
									className='NavLinks'
								>
									<LinkContainer to='/profile'>
										<NavDropdown.Item className='NavLinks'>
											Profile
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item
										onClick={logoutHandler}
										className='NavLinks'
									>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link href='#sign-in' className='NavLinks'>
										<i className='fas fa-user'></i> Sign in
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default NavBar
