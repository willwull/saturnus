import React, { Fragment } from "react";
import { Submission } from "snoowrap";
import { splitUrl, isImgUrl } from "../../utils";
import {
  ExternalLink,
  BigPreviewImg,
  LinkBar,
  Thumbnail,
  Url,
  Domain,
  InternalLink,
} from "./styles";
import Icon from "../Icon";

type Props = {
  post: Submission;
};

function LinkPreview({ post }: Props) {
  const [domain, rest] = splitUrl(post.url);

  const isInternalLink = /(reddit\.com|saturnusapp)/.test(domain);

  let icon;
  if (isImgUrl(post.url) || post.domain === "imgur.com") {
    icon = "fa image";
  } else if (isInternalLink) {
    icon = "fab reddit-alien";
  } else {
    icon = "fab safari";
  }

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

  const content = (
    <Fragment>
      {bigPreview}
      <LinkBar>
        <Thumbnail>
          <Icon icon={icon} />
        </Thumbnail>

        <Url>
          <Domain>{domain}</Domain>
          <span>{rest}</span>
        </Url>

        {!isInternalLink && (
          <div className="arrow">
            <Icon icon="external-link" />
          </div>
        )}
      </LinkBar>
    </Fragment>
  );

  if (isInternalLink) {
    return <InternalLink to={rest}>{content}</InternalLink>;
  }

  return (
    <ExternalLink href={post.url} rel="noopener noreferrer" target="_blank">
      {content}
    </ExternalLink>
  );
}

export default LinkPreview;
