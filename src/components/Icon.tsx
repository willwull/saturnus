import React from "react";
import * as FeatherIcon from "react-feather";

const ICON_DICTIONARY = {};
interface Props {
  icon?: string; // temp
  size?: "24" | "16";
  name?: string;
}

function Icon({ icon, name, size = "24" }: Props) {
  if (icon != null) {
    return <FeatherIcon.AlertCircle size={size} />;
  }
  // temporary
  return null;
}

export default Icon;
