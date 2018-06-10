import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

function Icon({ icon, ...rest }) {
  const iconArgs = icon.split(" ");
  return <FontAwesomeIcon icon={iconArgs} className="icon" {...rest} />;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
