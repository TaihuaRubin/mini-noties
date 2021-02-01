import { useState } from "react";
import { Modal, Button, Container, Row, Col, Image } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { updateAsRead } from "../redux/notifications";

function SingleContent(props) {
  const { title, description, content, publishedAt, source } = props.content;

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Author: {source["name"]}</p>
        <p>Publication: {publishedAt}</p>
        <p>{description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SingleContent;
