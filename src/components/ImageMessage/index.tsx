import React from "react";

// image from unDraw.co
import { ReactComponent as NoSavedContentImg } from "../../images/no-saved-content.svg";
import { ReactComponent as NotFoundImg } from "../../images/not-found.svg";
import { MessageWrapper } from "./styles";

type Props = {
  page: "404" | "NoSavedContent";
};

function ImageMessage({ page }: Props) {
  let img;
  let text;

  switch (page) {
    case "404":
      img = <NotFoundImg />;
      text = "This page doesn't seem to exist";
      break;
    case "NoSavedContent":
      img = <NoSavedContentImg />;
      text = "Looks like you haven't saved anything yet!";
      break;
  }

  return (
    <MessageWrapper>
      {img}
      <br />
      <h1>{text}</h1>
    </MessageWrapper>
  );
}

export default ImageMessage;
