import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import './NavBar.css'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'


const NavBar = () => {

	const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
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
					<Route render={({ history }) => <SearchBox history={history} />} />
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
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
								<LinkContainer to='/profile'>
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Item onClick={logoutHandler}>
									Logout
								</NavDropdown.Item>
								</NavDropdown>
              				) : (
							<LinkContainer to='/login'>
								<Nav.Link href='#login'>
									<p className='NavLinks'>
										<i className='fas fa-user'></i> Sign in
									</p>
								</Nav.Link>
							</LinkContainer>
							  )}
							  {userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminmenu'>
								<LinkContainer to='/admin/userlist'>
									<NavDropdown.Item>Users</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/productlist'>
									<NavDropdown.Item>Products</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to='/admin/orderlist'>
									<NavDropdown.Item>Orders</NavDropdown.Item>
								</LinkContainer>
								</NavDropdown>
              				 )}

						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default NavBar
