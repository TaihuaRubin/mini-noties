import { useState } from "react";
import { Modal, Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { updateAsRead } from "../redux/notifications";
import SingleContent from "./SingleContent";

function NotySingle(props) {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  return (
    <div className='noty-single-container'>
      <h5> {props.notification.title} </h5>
      <p> Time: {props.notification.publishedAt}</p>

      <ButtonToolbar>
        <ButtonGroup className='mr-2'>
          <Button variant='outline-warning' onClick={() => dispatch(updateAsRead(props.notification.title))}>
            Archive
          </Button>
        </ButtonGroup>
        <Button variant='outline-warning' onClick={() => setModalShow(true)}>
          Open To Read More
        </Button>
      </ButtonToolbar>
      <SingleContent show={modalShow} onHide={() => setModalShow(false)} content={props.notification} />
    </div>
  );
}

export default NotySingle;
