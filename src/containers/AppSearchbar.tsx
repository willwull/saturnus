import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import Searchbar from "../components/Searchbar";

type Props = RouteComponentProps;

type State = {
  query: string;
};

class AppSearchbar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const initialValue = this.getInitialValue();
    this.state = {
      query: initialValue,
    };
  }

  getInitialValue(): string {
    const { location } = this.props;
    const queryString = location.search;
    const searchParams = new URLSearchParams(queryString);
    const q = searchParams.get("q");
    const restrictSr = searchParams.get("restrict_sr");

    if (q && !restrictSr) {
      // we are on the search result page
      return q;
    }
    if (location.pathname === "/") {
      // we are on the home page, clear search bar
      return "";
    }
    if (location.pathname.includes("/r/")) {
      // [0] is "", [1] is "r"
      const subredditName = location.pathname.split("/")[2];

      if (/\/r\/\S+\/search/.test(location.pathname)) {
        // we are on the subreddit search page
        return `r/${subredditName} ${q}`;
      }
      // we are on a subreddit feed
      return `r/${subredditName} `;
    }
    return "";
  }

  onSubmit = () => {
    const { history } = this.props;
    const { query } = this.state;

    const [subreddit, ...restOfQuery] = query.split(/\s+/);
    const searchIncludesSubreddit = /r\/\S+/.test(subreddit);

    if (
      searchIncludesSubreddit &&
      restOfQuery.length > 0 &&
      restOfQuery[0] !== ""
    ) {
      const q = restOfQuery.join(" ");
      history.push(`/${subreddit}/search?q=${q}&restrict_sr=true`);
    } else {
      history.push(`/search?q=${query}`);
    }
  };

  onChange = (query: string) => {
    this.setState({ query });
  };

  componentDidUpdate(prevProps: Props) {
    // if we navigate away from the search page, clear the search bar
    const { location } = this.props;

    if (prevProps.location !== location) {
      this.setState({
        query: this.getInitialValue(),
      });
    }
  }

  render() {
    return (
      <Searchbar
        value={this.state.query}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export default withRouter(AppSearchbar);
