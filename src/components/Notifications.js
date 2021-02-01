import React, { Component } from "react";
import { connect } from "react-redux";
import NotySingle from "./NotySingle";
import { fetchNotifications } from "../redux/notifications";
import { fetchFromLocalStorage } from "../redux/localStorage";

class Notifications extends Component {
  componentDidMount() {
    this.props.fetchNotifications("tech");
  }

  render() {
    /** Case: still loading */
    if (this.props.loading) {
      return <div> loading....</div>;
    } else {
      /** Case: data fetch Unsucessful
       *  display data stored in localStorage
       *  as well as a message telling user that the data presented may not be up to date
       */
      if (this.props.loadSuccess === false) {
        let notifications = fetchFromLocalStorage();
        return (
          <div className='notifications-container'>
            <h3>
              Oops! We couldn't connect to the server... your notifications may not be the most up to date. (Dont worry!
              We're working on it.)
            </h3>
            {notifications.map((notification, idx) => (
              <NotySingle key={idx} notification={notification} />
            ))}
          </div>
        );
      }

      // if everything behaves normally
      return (
        <div className='notifications-container'>
          <h2> Notifications</h2>
          {this.props.notifications.map((notification, idx) => (
            <NotySingle key={idx} notification={notification} />
          ))}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  loadSuccess: state.notificationReducer.loadSuccess,
  loading: state.notificationReducer.loading,
  notifications: state.notificationReducer.notifications,
});
export default connect(mapStateToProps, { fetchNotifications })(Notifications);
