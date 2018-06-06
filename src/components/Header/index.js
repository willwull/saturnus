import React from "react";
// import PropTypes from "prop-types";
import FaIcon from "@fortawesome/react-fontawesome";

import "./Header.scss";

function Header() {
  return (
    <div className="header-component">
      <div className="icon">
        <FaIcon icon={["far", "dot-circle"]} />
      </div>
      Saturnus
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
