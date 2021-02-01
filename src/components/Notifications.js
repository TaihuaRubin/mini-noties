import React, { Component } from "react";
import { connect } from "react-redux";
import NotySingle from "./NotySingle";
import { fetchNotifications } from "../redux/notifications";

class Notifications extends Component {
  componentDidMount() {
    this.props.fetchNotifications("tech");
  }

  render() {
    console.log(this.props, "this props in notifications");

    return (
      <div className='notifications-container'>
        <h2> Notifications</h2>
        <NotySingle />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadSuccess: state.notificationReducer.loadSuccess,
  loading: state.notificationReducer.loading,
  notifications: state.notificationReducer.notifications,
});
export default connect(mapStateToProps, { fetchNotifications })(Notifications);
