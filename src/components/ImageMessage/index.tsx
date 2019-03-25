import React from "react";

// image from unDraw.co
import { ReactComponent as BugImg } from "../../images/bug.svg";
import { ReactComponent as NotFoundImg } from "../../images/not-found.svg";
import { ReactComponent as NoSavedContentImg } from "../../images/no-saved-content.svg";
import { MessageWrapper } from "./styles";
import { PrimaryLink } from "../Buttons/PrimaryButton";

type Props = {
  page: "404" | "NoSavedContent" | "Bug";
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
    case "Bug":
      img = <BugImg />;
      text = "Something went wrong :(";
      break;
  }

  return (
    <MessageWrapper>
      {img}
      <br />
      <h1>{text}</h1>
      <PrimaryLink to="/">Go back home</PrimaryLink>
    </MessageWrapper>
  );
}

export default ImageMessage;
