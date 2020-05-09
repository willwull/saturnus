import React, { Component } from "react";
import parse, { ParserOptions } from "html-react-parser";
import domToReact from "html-react-parser/lib/dom-to-react";
import { splitUrl } from "../../utils";
import Icon from "../Icon";
import TextLink from "../Base/TextLink";

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
    const lowerCaseDomain = domain.toLowerCase();
    if (lowerCaseDomain.match(/(reddit\.com|saturnusapp)/)) {
      return (
        <TextLink to={rest} color="primary">
          {children}
        </TextLink>
      );
    }

    if (href.startsWith("/r/")) {
      return <TextLink to={href}>{children}</TextLink>;
    }

    return (
      <TextLink externalUrl={href} color="primary">
        {children}
      </TextLink>
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
    return parse(str, TextContent.ParserOptions);
  }
}

export default TextContent;
