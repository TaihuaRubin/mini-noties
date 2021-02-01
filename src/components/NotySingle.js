import { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateAsRead } from "../redux/notifications";
import SingleContent from "./SingleContent";

function NotySingle(props) {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  return (
    <div className='noty-single-container'>
      <h5> {props.notification.title} </h5>
      <p>
        Date : {props.notification.publishedAt.slice(0, 10)} Time: {props.notification.publishedAt.slice(11, -1)}
      </p>

      <ButtonToolbar>
        <ButtonGroup className='mr-2'>
          <Button variant='outline-warning' onClick={() => dispatch(updateAsRead(props.notification.title))}>
            Delete
          </Button>
        </ButtonGroup>
        <Button variant='outline-warning' onClick={() => setModalShow(true)}>
          Peak 👀
        </Button>
      </ButtonToolbar>
      <SingleContent show={modalShow} onHide={() => setModalShow(false)} content={props.notification} />
    </div>
  );
}

export default NotySingle;
