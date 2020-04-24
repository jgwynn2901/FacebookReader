import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navbar,Nav,Button } from 'react-bootstrap';

const isAuthenticated = true;
const user = { id: 5, name: 'JohnG' };

const NavbarMain = ({ icon, title }) => {
  useEffect(() => {
    //loadUser();
    // eslint-disable-next-line
  }, []);
  
  //const onLogout = () => {
    //logout();
    //clearContacts();
  //};
  
  const authLinks = (
    <Fragment>
      <Navbar.Text>{user && user.name + ' '} </Navbar.Text>
      <Button variant="light"><i className='fas fa-sign-out-alt' />
          <span className='hide-sm'>Logout</span></Button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Nav.Link href="/register">Register</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>      
    </Fragment>
  );
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home"><i className={icon} /> {title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"> 
        </Nav>
        <Nav>{isAuthenticated ? authLinks : guestLinks}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

NavbarMain.defaultProps = {
  title: 'Facebook Reader',
  icon: 'fab fa-facebook'
};

NavbarMain.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default NavbarMain;
