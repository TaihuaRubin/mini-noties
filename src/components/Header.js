import { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import navLogo from "../img/navLogo.png";

function Header(props) {
  let listener = null;
  const [scrollState, setScrollState] = useState("top");

  useEffect(() => {
    listener = document.addEventListener("scroll", (e) => {
      var scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 120) {
        if (scrollState !== "amir") {
          setScrollState("amir");
        }
      } else {
        if (scrollState !== "top") {
          setScrollState("top");
        }
      }
    });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);

  return (
    <Navbar
      className='nav-bar-colors'
      bg={scrollState === "top" ? "outline-secondary" : "dark"}
      variant='dark'
      sticky='top'
    >
      <Navbar.Brand href='#home'>
        <img alt='' src={navLogo} height='50' className='d-inline-block align-top' />
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
