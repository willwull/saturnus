import React from "react";
import Icon from "../Icon";
import "./Loading.scss";

type Props = {
  type: "regular" | "fullscreen" | "inline";
};

function Loading({ type }: Props) {
  const spinner = <Icon icon="spinner-third" spin />;
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

export default Loading;
