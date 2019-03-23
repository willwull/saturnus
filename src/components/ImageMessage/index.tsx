import React from "react";

// image from unDraw.co
import { ReactComponent as NotFoundImg } from "../../images/no-saved-content.svg";
import { MessageWrapper } from "./styles";

function ImageMessage() {
  return (
    <MessageWrapper>
      <NotFoundImg />
      <br />
      <h1>Looks like you haven't saved anything yet!</h1>
    </MessageWrapper>
  );
}

export default ImageMessage;
