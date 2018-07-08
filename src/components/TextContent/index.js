import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { splitUrl } from "utils";
import Icon from "../Icon";

class TextContent extends Component {
  static propTypes = {
    children: PropTypes.string,
  };

  static defaultProps = {
    children: "",
  };

  // Returns a react-router Link if it's a reddit link, otherwise a tag
  static RedditLink = ({ href, title, children }) => {
    const [domain, rest] = splitUrl(href);
    if (domain.toLowerCase().match(/(reddit\.com|saturnusapp)/)) {
      return (
        <Link to={rest} title={title}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} title={title} rel="noopener noreferrer" target="_blank">
        {children} <Icon icon="external-link" />
      </a>
    );
  };

  render() {
    const mdOptions = {
      overrides: {
        a: TextContent.RedditLink,
      },
    };

    return <Markdown options={mdOptions}>{this.props.children}</Markdown>;
  }
}

export default TextContent;
