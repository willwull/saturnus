import React from "react";
import PropTypes from "prop-types";
import FaIcon from "@fortawesome/react-fontawesome";
import "./Loading.scss";

function Loading({ type }) {
  const spinner = <FaIcon icon="spinner-third" spin />;
  switch (type) {
    case "regular":
      return <div className="loading-reg">{spinner}</div>;
    case "fullscreen":
      return <div className="loading-fullscreen">{spinner}</div>;
    case "inline":
      return <div className="loading-inline">{spinner}</div>;
    default:
      return null;
  }
}

Loading.propTypes = {
  type: PropTypes.oneOf(["regular", "fullscreen", "inline"]).isRequired,
};

export default Loading;
