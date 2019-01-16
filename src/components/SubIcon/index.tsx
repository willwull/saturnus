import React from "react";
import { Icon, FallBackIcon } from "./styles";

type Props = {
  icon?: string;
  color?: string;
  size: number;
};

function SubIcon({ icon, color, size }: Props) {
  if (icon) {
    return <Icon src={icon} size={size} />;
  }

  return <FallBackIcon color={color} size={size} />;
}

export default SubIcon;
