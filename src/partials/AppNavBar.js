import React from 'react'
import {
        Nav, Navbar, NavDropdown, 
       } from 'react-bootstrap';
import {NavLink} from 'react-router-dom' 

const AppNavBar =(props)=>{	

	const user = props.user()


	const onLogout=()=>{

		console.log("logout")
		localStorage.removeItem('user')
		props.updateSession()
		window.location.reload(false)
	}

	return(

			
			<Navbar ref={props.innerRef} fixed="top" bg="" variant="" className="nav-transparent" expand="lg">

			  <Navbar.Brand href="/" className="branding">Dayo</Navbar.Brand>
			  <Navbar.Toggle aria-controls="basic-navbar-nav" className="nav-toggle-style" />
			  <Navbar.Collapse id="basic-navbar-nav">
			  	{
			  	  user!==undefined?

			  	  	<Nav className="ml-auto">
			  	  		{
							user.role===2? 
								<React.Fragment>
									<Nav.Link as={NavLink} activeClassName="active" to="/discover" >Discover</Nav.Link>
									<NavDropdown  alignRight title={user.name} id="basic-nav-dropdown">
									  <NavDropdown.Item as={NavLink} to={`/bookings/${user.id}`}>Bookings</NavDropdown.Item>
									  <NavDropdown.Divider />
									  <NavDropdown.Item onClick={()=> onLogout()}>Logout</NavDropdown.Item>
									</NavDropdown>
								</React.Fragment>
								: ''
			  	  		}
			  	  		{
							user.role===1? 
								<React.Fragment>
									<Nav.Link as={NavLink} activeClassName="active" to="/discover" >Discover</Nav.Link>
									<Nav.Link as={NavLink} activeClassName="active" to="/manage" >Manage</Nav.Link>
									<NavDropdown  alignRight title={user.name} id="basic-nav-dropdown">
									  <NavDropdown.Item as={NavLink} to={`/bookings/${user.id}`}>Bookings</NavDropdown.Item>
									  <NavDropdown.Divider />
									  <NavDropdown.Item onClick={()=> onLogout()}>Logout</NavDropdown.Item>
									</NavDropdown>
								</React.Fragment>
								: ''
			  	  		}
			  	  	  
			  	  	</Nav> :

			  	  	<Nav className="ml-auto">
			  	  	  <Nav.Link as={NavLink} activeClassName="active" to="/discover" >Discover</Nav.Link>
			  	  	  <Nav.Link as={NavLink} activeClassName="active" to="/login" >Login</Nav.Link>
			  	  	  <Nav.Link as={NavLink} activeClassName="active" to="/register" >Register</Nav.Link>
			  	  	</Nav>
			  	  	

			  	}
		
			  </Navbar.Collapse>
			</Navbar>

		);
}

export default AppNavBar;