import React from "react";
import "./Loading.scss";

type Props = {
  type: "regular" | "fullscreen" | "inline";
};

function Loading({ type }: Props) {
  switch (type) {
    case "regular":
      return (
        <div className="loading-wrapper">
          <div
            className="loading-inline"
            style={{
              height: 30,
              width: 30,
            }}
          />
        </div>
      );
    case "fullscreen":
      return <div className="loading-fullscreen" />;
    case "inline":
      return (
        <div
          className="loading-inline"
          style={{
            height: 16,
            width: 16,
            borderWidth: 2,
          }}
        />
      );
    default:
      return null;
  }
}

export default Loading;
