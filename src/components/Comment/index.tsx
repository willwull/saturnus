import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Comment as CommentType } from "snoowrap";
import scrollIntoView from "smooth-scroll-into-view-if-needed";
import moment from "moment-mini";

import { shortenNumber } from "../../utils";
import GoldCounter from "../GoldCounter";
import TextContent from "../TextContent";
import Icon from "../Icon";
import {
  CommentBody,
  ChildWrapper,
  CommentTitle,
  CommentComponent,
  Collapser,
  CollapseStrip,
  CommentScrollAnchor,
} from "./styles";

// Snoowrap type is wrong??
export interface CommentInterface extends CommentType {
  depth: number;
  is_submitter: boolean;
}

type Props = {
  comment: CommentInterface;
} & RouteComponentProps;

interface State {
  isCollapsed: boolean;
}

class Comment extends Component<Props, State> {
  state = {
    isCollapsed: false,
  };

  scrollRef = React.createRef<HTMLDivElement>();

  toggleCollapse = () => {
    this.setState(
      state => ({
        isCollapsed: !state.isCollapsed,
      }),
      () => {
        scrollIntoView(this.scrollRef.current!, {
          behavior: "smooth",
          scrollMode: "if-needed",
          block: "start",
        });
      },
    );
  };

  render() {
    const { comment } = this.props;
    if (comment.depth > 5) {
      return null;
    }

    let authorNameClass = "comment-author";
    if (comment.distinguished === "moderator") {
      authorNameClass += " mod";
    } else if (comment.is_submitter) {
      authorNameClass += " op";
    }

    let score;
    if (comment.score_hidden) {
      score = "-";
    } else {
      score = shortenNumber(comment.score);
    }

    // If the post page is in modal mode, it has top:50px applied.
    // If not, the component is at top: 0.
    // Therefore, the scroll anchor should have a different offset
    // depending on the mode of the post page
    const { location } = this.props;
    const isModal = location.state && location.state.modal;

    // TODO: isModal is always true, should be false on initial render
    comment.depth === 0 && console.log(location.state);

    return (
      <CommentComponent>
        <CommentScrollAnchor isModal={isModal} innerRef={this.scrollRef} />
        <div>
          <Collapser onClick={this.toggleCollapse} tabIndex={0}>
            <CollapseStrip />
          </Collapser>
        </div>
        <div>
          <CommentTitle onClick={this.toggleCollapse}>
            {/* Stickied icon */}
            {comment.stickied && (
              <span className="mod">
                <Icon icon="thumbtack" />{" "}
              </span>
            )}

            <b className={authorNameClass}>{comment.author.name}</b>

            <span className="secondary">
              <Icon icon="far long-arrow-up" /> {score}
              {" · "}
              {moment.unix(comment.created_utc).fromNow()}
            </span>

            {comment.gilded !== 0 && (
              <span>
                {" · "}
                <GoldCounter count={comment.gilded} />
              </span>
            )}
          </CommentTitle>
          <CommentBody isCollapsed={this.state.isCollapsed}>
            <TextContent>{comment.body_html}</TextContent>

            {comment.replies.length !== 0 &&
              comment.depth !== 5 &&
              comment.replies.map((reply: any) => (
                <ChildWrapper key={reply.id}>
                  <Comment {...this.props} comment={reply} />
                </ChildWrapper>
              ))}
          </CommentBody>
        </div>
      </CommentComponent>
    );
  }
}

export default withRouter(Comment);
