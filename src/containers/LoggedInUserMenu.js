import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PrimaryButton from "components/Buttons/PrimaryButton";
import { getAuthUrl } from "api/authentication";
import { fetchUser } from "actions/user";

class LoggedInUserMenu extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, fetch } = this.props;
    if (user.loggedIn && !user.data.id) {
      console.log("fetch");
      // user is logged in, but we haven't fetched all data yet
      fetch();
    }
  }

  onClick = () => {
    const url = getAuthUrl(this.props.location.pathname);
    window.location = url;
  };

  render() {
    const {
      user: { loggedIn, isLoading, data },
    } = this.props;

    if (isLoading) return null;

    // user is not logged in, show sign in button
    if (!loggedIn && !data.id) {
      return (
        <PrimaryButton className="signin-btn" onClick={this.onClick}>
          Sign in
        </PrimaryButton>
      );
    }

    // user is logged in, show their profile pic and name
    return (
      <div className="user-menu">
        <img className="user-img" src={data.icon_img} alt={data.name} />
        {data.name}
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => {
      dispatch(fetchUser());
    },
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoggedInUserMenu),
);
