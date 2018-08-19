import React from "react";
import PropTypes from "prop-types";
import Menu from "components/Menu";
import { copyToClipboard } from "utils";
import Icon from "../Icon";

function copyPostLink(post) {
  const url = window.location.host + post.permalink;
  copyToClipboard(url);
}

function copyContentLink(post) {
  copyToClipboard(post.url);
}

function PostShareMenu({ post }) {
  return (
    <Menu>
      <Menu.Item onClick={() => copyPostLink(post)}>
        <Icon icon="far copy" fixedWidth /> Copy post link
      </Menu.Item>

      {!post.is_self && (
        <Menu.Item onClick={() => copyContentLink(post)}>
          <Icon icon="far link" fixedWidth /> Copy content link
        </Menu.Item>
      )}
    </Menu>
  );
}

PostShareMenu.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostShareMenu;
