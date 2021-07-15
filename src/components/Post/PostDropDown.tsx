import React from "react";
import { Submission } from "snoowrap";
import Menu from "../Menu";
import { copyToClipboard } from "../../utils";
import { Copy, Link, ExternalLink } from "react-feather";
import SavePostMenuItem from "../../containers/SavePostMenuItem";
import LoggedIn from "../../containers/LoggedIn";

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

function PostDropDown({ post }: Props) {
  return (
    <Menu>
      <LoggedIn>
        <SavePostMenuItem post={post} />
      </LoggedIn>

      <Menu.Item onClick={() => copyPostLink(post)}>
        <Copy size={20} /> Copy post link
      </Menu.Item>

      {!post.is_self && (
        <Menu.Item onClick={() => copyContentLink(post)}>
          <Link size={20} /> Copy content link
        </Menu.Item>
      )}

      {!post.is_self && (
        <Menu.A href={post.url} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={20} /> Open content link
        </Menu.A>
      )}
    </Menu>
  );
}

export default PostDropDown;
