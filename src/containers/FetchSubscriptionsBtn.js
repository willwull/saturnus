import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import Icon from "../components/Icon";
import { fetchMySubs } from "../actions/user";

const FetchBtn = styled.button`
  font-size: 0.8em;
  &:disabled {
    opacity: 0.5;
    cursor: normal;
  }
`;

class FetchSubscriptionsBtn extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    fetch: PropTypes.func.isRequired,
  };

  render() {
    const { fetch, isLoading } = this.props;
    let icon = <Icon icon="far sync-alt" />;
    if (isLoading) {
      icon = <Icon icon="far sync-alt" spin />;
    }

    return (
      <FetchBtn onClick={fetch} disabled={isLoading}>
        {icon}
      </FetchBtn>
    );
  }
}

function mapStateToProps({ user: { subsLoading } }) {
  return {
    isLoading: subsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => {
      dispatch(fetchMySubs({ skipCache: true }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FetchSubscriptionsBtn);
