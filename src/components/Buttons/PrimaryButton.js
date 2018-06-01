import React from "react";
import PropTypes from "prop-types";
import "./Buttons.scss";

function PrimaryButton({ className, ...props }) {
  return <button {...props} className={`${className} primary-btn`} />;
}

PrimaryButton.defaultProps = {
  className: "",
};

PrimaryButton.propTypes = {
  className: PropTypes.string,
};

export default PrimaryButton;
