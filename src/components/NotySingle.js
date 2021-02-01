import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { updateAsRead } from "../redux/notifications";
import SingleContent from "./SingleContent";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function NotySingle(props) {
  // const { title, source, description, publishedAt } = props.notification;
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  return (
    <div className='noty-single-container'>
      <h2> Title: {props.notification.title} </h2>
      <h4> Author: {props.notification.source.name}</h4>
      <p> Description: {props.notification.description} </p>
      <p> Published At: {props.notification.publishedAt}</p>
      <p> Publication: {props.notification.source.url}</p>
      <button onClick={() => dispatch(updateAsRead(props.notification.title))}> Open to Read More </button>
      <button variant='primary' onClick={() => setModalShow(true)}>
        {" "}
        Open Modal
      </button>
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default NotySingle;
