import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import LoggedInUserMenu from "containers/LoggedInUserMenu";
import SidebarToggler from "containers/SidebarToggler";
import ContentBox from "components/ContentBox";
import Icon from "components/Icon";
import "./Header.scss";

function Header() {
  return (
    <ContentBox className="header-component">
      <SidebarToggler>
        <div className="menu-icon">
          <Icon icon="far dot-circle" />
        </div>
      </SidebarToggler>
      <div>
        <Link to="/">Saturnus</Link>
      </div>
      <LoggedInUserMenu />
    </ContentBox>
  );
}

/*
Header.propTypes = {
  currentSubName: PropTypes.string.isRequired,
  setCurrentSub: PropTypes.func.isRequired,
};
*/

export default Header;
