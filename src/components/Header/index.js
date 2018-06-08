import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FaIcon from "@fortawesome/react-fontawesome";

import PrimaryButton from "components/Buttons/PrimaryButton";
import LoggedInUserMenu from "containers/LoggedInUserMenu";
import "./Header.scss";

function Header() {
  return (
    <div className="header-component">
      <Link to="/">
        <div className="icon">
          <FaIcon icon={["far", "dot-circle"]} />
        </div>
      </Link>
      <Link to="/">Saturnus</Link>
      <LoggedInUserMenu />
    </div>
  );
}

/*
Header.propTypes = {
  currentSubName: PropTypes.string.isRequired,
  setCurrentSub: PropTypes.func.isRequired,
};
*/

export default Header;
