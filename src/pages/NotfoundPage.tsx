import React from "react";
import Page from "../components/Page";
import ImageMessage from "../components/ImageMessage";

function NotfoundPage() {
  return (
    <Page>
      <ImageMessage page={"404"} />
    </Page>
  );
}

export default NotfoundPage;
