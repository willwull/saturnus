import React, { Component } from "react";
import { SearchForm, Input } from "./styles";
import Icon from "../Icon";

class Searchbar extends Component {
  render() {
    return (
      <SearchForm>
        <Icon icon="far search" />
        <Input type="text" placeholder="Search" />
      </SearchForm>
    );
  }
}

export default Searchbar;
