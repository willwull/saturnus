import React from "react";
import SaturnusLogo from "../SaturnusLogo";
import { IconImg, Fallback } from "./styles";

type Props = {
  imageSrc?: string;
  color?: string;
};

function BannerIcon({ imageSrc, color }: Props) {
  if (!imageSrc) {
    return (
      <Fallback color={color}>
        <SaturnusLogo />
      </Fallback>
    );
  }

  return <IconImg src={imageSrc} color={color} />;
}

export default BannerIcon;
