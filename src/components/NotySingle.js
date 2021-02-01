import { updateAsRead } from "../redux/notifications";

function NotySingle(props) {
  // const { title, source, description, publishedAt } = props.notification;

  return (
    <div className='noty-single-container'>
      <h2> Title: {props.notification.title} </h2>
      <h4> Author: {props.notification.source.name}</h4>
      <p> Description: {props.notification.description} </p>
      <p> Published At: {props.notification.publishedAt}</p>
      <p> Publication: {props.notification.source.url}</p>
      <button onClick={() => updateAsRead(props.notification.title)}> Open to Read More </button>
    </div>
  );
}

export default NotySingle;
