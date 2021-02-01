import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateAsRead } from "../redux/notifications";

function SingleContent(props) {
  const { title, description, content, publishedAt, source, url } = props.content;
  const dispatch = useDispatch();

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header className='modal-header' closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Source: {source["name"]}</p>
        <p>Date: {publishedAt.slice(0, 10)}</p>
        <p> Time: {publishedAt.slice(11, -1)}</p>
        <p>{description}</p>
      </Modal.Body>
      <Modal.Footer className='modal-footer'>
        <a onClick={() => dispatch(updateAsRead(title))} href={url} target='_blank'>
          <Button variant='warning' onClick={props.onHide}>
            Read at {source["name"]}
          </Button>
        </a>
        <Button variant='warning' onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SingleContent;
