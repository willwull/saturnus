import React from "react";
import { Submission } from "snoowrap";
import Menu from "../Menu";
import { copyToClipboard } from "../../utils";
import Icon from "../Icon";

function copyPostLink(post: Submission) {
  const url = window.location.host + post.permalink;
  copyToClipboard(url);
}

function copyContentLink(post: Submission) {
  copyToClipboard(post.url);
}

type Props = {
  post: Submission;
};

function PostShareMenu({ post }: Props) {
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

export default PostShareMenu;