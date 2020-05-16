import React, { Component, ChangeEvent, FormEvent } from "react";
import { SearchForm, Input, ClearButton } from "./styles";
import Icon from "../Icon";

type Props = {
  value: string;
  onChange: (query: string) => void;
  onSubmit: () => void;
};

class Searchbar extends Component<Props, {}> {
  inputRef = React.createRef<HTMLInputElement>();

  onSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.props.onSubmit();
    this.inputRef.current!.blur();
  };

  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.target.value);
  };

  clearInput = () => {
    this.props.onChange("");
    this.inputRef.current!.focus();
  };

  render() {
    const { value } = this.props;
    const showClearBtn = value !== "";

    return (
      <SearchForm onSubmit={this.onSubmit}>
        <Icon icon="far search" />
        <Input
          ref={this.inputRef}
          type="text"
          value={value}
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

export default Searchbar;
