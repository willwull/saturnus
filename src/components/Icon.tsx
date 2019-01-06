import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  findIconDefinition,
  IconName,
  IconPrefix,
} from "@fortawesome/fontawesome-svg-core";

interface Props {
  icon: string;
  fixedWidth?: boolean;
  spin?: boolean;
  transform?: string;
}

function Icon({ icon, ...rest }: Props) {
  const iconArgs = icon.split(" ");

  let faIcon;
  if (iconArgs.length === 1) {
    faIcon = findIconDefinition({
      prefix: "fas",
      iconName: iconArgs[0] as IconName,
    });
  } else {
    faIcon = findIconDefinition({
      prefix: iconArgs[0] as IconPrefix,
      iconName: iconArgs[1] as IconName,
    });
  }

  return <FontAwesomeIcon icon={faIcon} className="icon" {...rest} />;
}

export default Icon;
