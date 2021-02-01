function NotySingle(props) {
  // const { title, source, description, publishedAt } = props.notification;

  return (
    <div className='noty-single-container'>
      <h2> Title: {props.notification.title} </h2>
      <h4> Author: {props.notification.source.name}</h4>
      <p> Description: {props.notification.description} </p>
      <p> Published At: {props.notification.publishedAt}</p>
      <p> Publication: {props.notification.source.url}</p>
    </div>
  );
}

export default NotySingle;
