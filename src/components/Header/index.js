import React from "react";
import PropTypes from "prop-types";
import "./Header.scss";
import PrimaryButton from "../Buttons/PrimaryButton";

function Header({ currentSubName, setCurrentSub }) {
  const onSubmit = event => {
    event.preventDefault();
    const inputVal = event.target.elements["sub-name"].value;
    setCurrentSub(inputVal);
  };

  return (
    <div className="header-component">
      Header {currentSubName}
      <form onSubmit={onSubmit}>
        <input type="text" name="sub-name" />
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
