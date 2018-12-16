import React from "react";
import { Submission } from "snoowrap";
import { splitUrl, isImgUrl } from "../../utils";
import {
  ExternalLink,
  BigPreviewImg,
  LinkBar,
  Thumbnail,
  Url,
  Domain,
} from "./styles";
import Icon from "../Icon";

type Props = {
  post: Submission;
};

function LinkPreview({ post }: Props) {
  const [domain, rest] = splitUrl(post.url);

  // if image link, use image icon, otherwise safari
  const icon =
    isImgUrl(post.url) || post.domain === "imgur.com"
      ? "fa image"
      : "fab safari";

  // big thumbnail for certain links
  let bigPreview;
  if (post.preview) {
    bigPreview = (
      <BigPreviewImg
        className="big-preview"
        src={post.preview.images[0].source.url}
        alt={post.title}
      />
    );
  }

  return (
    <ExternalLink href={post.url} rel="noopener noreferrer" target="_blank">
      {bigPreview}
      <LinkBar>
        <Thumbnail>
          <Icon icon={icon} />
        </Thumbnail>

        <Url>
          <Domain>{domain}</Domain>
          <span>{rest}</span>
        </Url>

        <div className="arrow">
          <Icon icon="external-link" />
        </div>
      </LinkBar>
    </ExternalLink>
  );
}

export default LinkPreview;
