import React from "react";
import { Circle, GildingIcon, GildingWrapper } from "./styles";

type Props = {
  count: number;
  type?: "gold" | "platinum" | "silver";
};

function GildingCounter({ count, type }: Props) {
  const icons = {
    gold: "star",
    platinum: "diamond",
    silver: "splotch",
  };

  return (
    <GildingWrapper type={type!} className="gold-icon">
      <span className="fa-layers fa-fw">
        <Circle type={type!} icon="circle" fixedWidth />
        <GildingIcon icon={icons[type!]} transform="shrink-6" fixedWidth />
      </span>
      {count}
    </GildingWrapper>
  );
}

GildingCounter.defaultProps = {
  type: "gold",
};

export default GildingCounter;
