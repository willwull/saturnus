import React from "react";
import PropTypes from "prop-types";
import FaIcon from "@fortawesome/react-fontawesome";
import { splitUrl, isImgUrl } from "utils";
import "./LinkPreview.scss";

function LinkPreview({ post }) {
  const [domain, rest] = splitUrl(post.url);

  // if image link, use image icon, otherwise safari
  const icon =
    isImgUrl(post.url) || post.domain === "imgur.com"
      ? ["fa", "image"]
      : ["fab", "safari"];

  // big thumbnail for certain links
  let bigPreview;
  if (post.preview) {
    bigPreview = (
      <img
        className="big-preview"
        src={post.preview.images[0].source.url}
        alt={post.title}
      />
    );
  }

  return (
    <a href={post.url} className="link-preview-component">
      {bigPreview}
      <div className="link-bar">
        <div className="thumbnail">
          <FaIcon icon={icon} />
        </div>

        <div className="url">
          <span className="domain">{domain}</span>
          <span className="rest-url">{rest}</span>
        </div>

        <div className="arrow">
          <FaIcon icon="chevron-right" />
        </div>
      </div>
    </a>
  );
}

LinkPreview.propTypes = {
  post: PropTypes.object.isRequired,
};

export default LinkPreview;
