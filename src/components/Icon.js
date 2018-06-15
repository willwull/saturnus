import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

function Icon({ icon, ...rest }) {
  let iconArgs = icon.split(" ");

  if (iconArgs.length === 1) {
    iconArgs = iconArgs[0];
  }

  return <FontAwesomeIcon icon={iconArgs} className="icon" {...rest} />;
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
