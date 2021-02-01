import React, { Component } from "react";
import { connect } from "react-redux";
import NotySingle from "./NotySingle";
import { fetchNotifications } from "../redux/notifications";
import { fetchFromLocalStorage } from "../redux/localStorage";
import { Spinner, Jumbotron, Button } from "react-bootstrap";

class Notifications extends Component {
  componentDidMount() {
    this.props.fetchNotifications("nonprofit");
  }

  render() {
    /** Case: still loading */
    if (this.props.loading) {
      return (
        <div>
          <Spinner animation='border' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
          <p>loading....</p>
        </div>
      );
    } else {
      /** Case: data fetch Unsucessful
       *  display data stored in localStorage
       *  as well as a message telling user that the data presented may not be up to date
       */
      if (this.props.loadSuccess === false) {
        let localData = fetchFromLocalStorage();
        return (
          <div className='notifications-container'>
            <Jumbotron>
              <h1>Oooops!</h1>
              <p>
                We couldn't connect you to the server. Your notifications may not be the most up-to-date. But dont
                worry, we are working on fixing it.
              </p>
            </Jumbotron>

            {localData && localData.map((notification, idx) => <NotySingle key={idx} notification={notification} />)}
          </div>
        );
      }

      // if everything behaves normally
      return (
        <div className='notifications-container'>
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
  history: state.notificationReducer.history,
});
export default connect(mapStateToProps, { fetchNotifications })(Notifications);
