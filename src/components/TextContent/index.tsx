import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import parse, { ParserOptions } from "html-react-parser";
import domToReact from "html-react-parser/lib/dom-to-react";
import { splitUrl } from "../../utils";
import Icon from "../Icon";
import styled from "styled-components";

const TextContentStyles = styled.div`
  a {
    color: ${props => props.theme.primary};
  }
`;

type Props = {
  children: string;
};

type RedditLinkProps = {
  href: string;
  children: React.ReactNode;
};

class TextContent extends Component<Props, {}> {
  static defaultProps = {
    children: "",
  };

  // Returns a react-router Link if it's a reddit link, otherwise a tag
  static RedditLink = ({ href, children }: RedditLinkProps) => {
    const [domain, rest] = splitUrl(href);
    if (domain.toLowerCase().match(/(reddit\.com|saturnusapp)/)) {
      return <Link to={rest}>{children}</Link>;
    }

    if (href.startsWith("/r/")) {
      return <Link to={href}>{children}</Link>;
    }

    return (
      <a href={href} rel="noopener noreferrer" target="_blank">
        {children} <Icon icon="external-link" />
      </a>
    );
  };

  static ParserOptions: ParserOptions = {
    replace: domNode => {
      if (domNode.name === "a") {
        return (
          <TextContent.RedditLink href={domNode.attribs.href}>
            {domToReact(domNode.children, TextContent.ParserOptions)}
          </TextContent.RedditLink>
        );
      }
      return domNode;
    },
  };

  render() {
    // post.selftext_html and comment.body_html can be null
    const str = this.props.children || "";
    return (
      <TextContentStyles>
        {parse(str, TextContent.ParserOptions)}
      </TextContentStyles>
    );
  }
}

export default TextContent;
