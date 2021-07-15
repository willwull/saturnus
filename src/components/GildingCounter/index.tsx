import React from "react";
import { GildingWrapper } from "./styles";
import { Star, Hexagon, Circle as CircleIcon } from "react-feather";

type Props = {
  count: number;
  type?: "gold" | "platinum" | "silver";
};

function GildingCounter({ count, type }: Props) {
  const icons = {
    gold: Star,
    platinum: Hexagon,
    silver: CircleIcon,
  };

  const GildingIcon = icons[type!];

  return (
    <GildingWrapper type={type!} className="gold-icon">
      <GildingIcon size={14} />
      {count}
    </GildingWrapper>
  );
}

GildingCounter.defaultProps = {
  type: "gold",
};

export default GildingCounter;
