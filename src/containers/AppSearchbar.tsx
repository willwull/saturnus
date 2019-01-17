import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { RootState, DispatchType } from "../reducers";
import { setSearchValue } from "../actions/search";
import { connect } from "react-redux";
import Searchbar from "../components/Searchbar";

type StateProps = {
  query: string;
};

type DispatchProps = {
  setValue: (query: string) => void;
};

type Props = StateProps & DispatchProps & RouteComponentProps;

class AppSearchbar extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.setCorrectValue();
  }

  setCorrectValue() {
    const { location, setValue } = this.props;
    const queryString = location.search;
    const searchParams = new URLSearchParams(queryString);
    const q = searchParams.get("q");

    if (q) {
      setValue(q);
    } else if (location.pathname === "/") {
      this.clearFunc();
    } else if (location.pathname.includes("/r/")) {
      // [0] is "", [1] is "r"
      const subredditName = location.pathname.split("/")[2];
      setValue(`r/${subredditName} `);
    }
  }

  onSubmit = () => {
    const { history, query } = this.props;
    history.push(`/search?q=${query}`);
  };

  onChange = (query: string) => {
    this.props.setValue(query);
  };

  clearFunc = () => {
    this.props.setValue("");
  };

  componentDidUpdate(prevProps: Props) {
    // if we navigate away from the search page, clear the search bar
    const { location, match } = this.props;

    if (prevProps.location !== location) {
      this.setCorrectValue();
    }
  }

  render() {
    const { query } = this.props;

    return (
      <Searchbar
        value={query}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        clearFunc={this.clearFunc}
      />
    );
  }
}

function mapStateToProps({ search }: RootState): StateProps {
  return {
    query: search.query,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    setValue: (query: string) => {
      dispatch(setSearchValue(query));
    },
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AppSearchbar),
);
