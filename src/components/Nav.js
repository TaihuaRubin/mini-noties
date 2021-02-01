import { useState } from "react";
import { Navbar } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { updateAsRead } from "../redux/notifications";

function Nav(props) {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>
          <img alt='' src='../img/navLogo.png' width='30' height='30' className='d-inline-block align-top' /> Mini
          Noties
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default Nav;
