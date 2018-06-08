import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FaIcon from "@fortawesome/react-fontawesome";

import { getAuthUrl } from "api/authentication";
import PrimaryButton from "../Buttons/PrimaryButton";
import "./Header.scss";

function onClick() {
  const url = getAuthUrl();
  window.open(url, "_blank");
}

function Header() {
  return (
    <div className="header-component">
      <Link to="/">
        <div className="icon">
          <FaIcon icon={["far", "dot-circle"]} />
        </div>
      </Link>
      <Link to="/">Saturnus</Link>
      <PrimaryButton className="signin-btn" onClick={onClick}>
        Sign in
      </PrimaryButton>
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
