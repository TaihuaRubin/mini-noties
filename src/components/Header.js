import { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import navLogo from "../img/navLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotifications } from "../redux/notifications";

function Header(props) {
  /** Handle scrolling effect on navbar */
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

  /** Handle get new notifications */
  const dispatch = useDispatch();
  const gotNew = useSelector((state) => state.notificationReducer.uptodate);
  const handleRefresh = async () => {
    await dispatch(fetchNotifications("nonprofit"));
    if (gotNew) alert("You're Up-to-Date! :) ");
  };

  return (
    <Navbar
      className='nav-bar-colors'
      bg={scrollState === "top" ? "outline-secondary" : "dark"}
      variant='dark'
      sticky='top'
    >
      <Navbar.Brand>
        <img alt='' src={navLogo} height='50' className='d-inline-block align-top' />
      </Navbar.Brand>

      <Nav className='ml-auto' id='navButtons'>
        <Nav.Item>
          <Nav.Link onClick={handleRefresh}> Get New Notifications</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default Header;
