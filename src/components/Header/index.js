import React from "react";
import PropTypes from "prop-types";
import FaIcon from "@fortawesome/react-fontawesome";

import PrimaryButton from "components/Buttons/PrimaryButton";
import "./Header.scss";

function Header({ currentSubName, setCurrentSub }) {
  const onSubmit = event => {
    event.preventDefault();
    const inputVal = event.target.elements["sub-name"].value;
    setCurrentSub(inputVal);
  };

  return (
    <div className="header-component">
      <div className="icon">
        <FaIcon icon={["far", "dot-circle"]} />
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" name="sub-name" placeholder={currentSubName} />
        <PrimaryButton>Set subreddit</PrimaryButton>
      </form>
    </div>
  );
}

Header.propTypes = {
  currentSubName: PropTypes.string.isRequired,
  setCurrentSub: PropTypes.func.isRequired,
};

export default Header;
