import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { updateAsRead } from "../redux/notifications";
import navLogo from "../img/navLogo.png";

function Header(props) {
  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand href='#home'>
        <img alt='' src={navLogo} height='80' className='d-inline-block align-top' />
      </Navbar.Brand>

      <Nav
        className='ml-auto'
        id='navButtons'
        activeKey='/home'
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link>Notifications</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='Settings'>Settings</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='User'>User</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default Header;
