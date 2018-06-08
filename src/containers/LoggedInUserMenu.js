import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import PrimaryButton from "components/Buttons/PrimaryButton";
import { getAuthUrl } from "api/authentication";
import { fetchUser } from "actions/user";

function onClick() {
  const url = getAuthUrl();
  window.open(url, "_blank");
}

class LoggedInUserMenu extends Component {
  static propTypes = {
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

  render() {
    console.log(this.props);
    const {
      user: { loggedIn, isLoading, data },
    } = this.props;

    if (isLoading) return null;

    if (!loggedIn && !data.id) {
      return (
        <PrimaryButton className="signin-btn" onClick={onClick}>
          Sign in
        </PrimaryButton>
      );
    }

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoggedInUserMenu);
