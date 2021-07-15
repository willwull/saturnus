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
  RightAccessory,
} from "./styles";
import {
  ExternalLink as ExternalLinkIcon,
  Image,
  Compass,
} from "react-feather";

type Props = {
  post: Submission;
};

function LinkPreview({ post }: Props) {
  const [domain, rest] = splitUrl(post.url);

  const isInternalLink = /(reddit\.com|saturnusapp)/.test(domain);

  let Icon;
  if (isImgUrl(post.url) || post.domain === "imgur.com") {
    Icon = Image;
  } else {
    Icon = Compass;
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
          <Icon />
        </Thumbnail>

        <Url>
          <Domain>{domain}</Domain>
          <span>{rest}</span>
        </Url>

        {!isInternalLink && (
          <RightAccessory>
            <ExternalLinkIcon size={20} />
          </RightAccessory>
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
