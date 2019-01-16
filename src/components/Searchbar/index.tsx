import React, { Component, ChangeEvent, FormEvent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { SearchForm, Input, ClearButton } from "./styles";
import Icon from "../Icon";

type Props = RouteComponentProps;

type State = {
  searchValue: string;
};

class Searchbar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const queryString = this.props.location.search;
    const searchParams = new URLSearchParams(queryString);
    const q = searchParams.get("q");

    this.state = {
      searchValue: q || "",
    };
  }

  inputRef = React.createRef<HTMLInputElement>();

  onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const { history } = this.props;
    history.push(`/search?q=${this.state.searchValue}`);
  };

  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
  };

  clearInput = () => {
    this.setState({ searchValue: "" }, () => {
      this.inputRef.current!.focus();
    });
  };

  render() {
    const { searchValue } = this.state;
    const showClearBtn = searchValue !== "";

    return (
      <SearchForm onSubmit={this.onSubmit}>
        <Icon icon="far search" />
        <Input
          ref={this.inputRef}
          type="text"
          value={searchValue}
          onChange={this.onInputChange}
          placeholder="Search"
        />
        {showClearBtn && (
          <ClearButton type="button" onClick={this.clearInput}>
            <Icon icon="far times" />
          </ClearButton>
        )}
      </SearchForm>
    );
  }
}

export default withRouter(Searchbar);
