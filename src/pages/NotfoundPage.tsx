import React from "react";
import { Helmet } from "react-helmet";
import Page from "../components/Page";
import ImageMessage from "../components/ImageMessage";

function NotfoundPage() {
  return (
    <Page>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <ImageMessage page={"404"} />
    </Page>
  );
}

export default NotfoundPage;
