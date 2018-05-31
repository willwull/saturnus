import React from "react";
import PropTypes from "prop-types";
import FaIcon from "@fortawesome/react-fontawesome";
import { splitUrl } from "../../utils";
import "./LinkPreview.scss";

function LinkPreview({ post }) {
  const [domain, rest] = splitUrl(post.url);

  return (
    <a href={post.url} className="link-preview-component">
      <div className="link-bar">
        <div className="thumbnail">
          <FaIcon icon={["fab", "safari"]} />
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
