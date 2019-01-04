import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Icon from "../components/Icon";
import { fetchMySubs } from "../actions/user";
import { RootState, DispatchType } from "../reducers";

const FetchBtn = styled.button`
  font-size: 0.8em;
  &:disabled {
    opacity: 0.5;
    cursor: normal;
  }
`;

type StateProps = {
  isLoading: boolean;
};

type DispatchProps = {
  fetch: () => void;
};

type Props = StateProps & DispatchProps;

class FetchSubscriptionsBtn extends Component<Props, {}> {
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

function mapStateToProps({ user: { subsLoading } }: RootState): StateProps {
  return {
    isLoading: subsLoading,
  };
}

function mapDispatchToProps(dispatch: DispatchType) {
  return {
    fetch: () => {
      dispatch(fetchMySubs({ skipCache: true }));
    },
  };
}

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(FetchSubscriptionsBtn);
