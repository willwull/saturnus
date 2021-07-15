import React from "react";
import Menu from "../components/Menu";
import { Bookmark } from "react-feather";
import { Submission } from "snoowrap";
import { DispatchType } from "../reducers";
import { saveContent } from "../actions/user";
import { connect } from "react-redux";

type OwnProps = {
  post: Submission;
};

type DispatchProps = {
  save: (post: Submission) => void;
};

type Props = OwnProps & DispatchProps;

function SavePostMenuItem({ save, post }: Props) {
  function savePost() {
    save(post);
  }

  const label = post.saved ? "Unsave post" : "Save post";

  return (
    <Menu.Item onClick={savePost}>
      <Bookmark size={20} /> {label}
    </Menu.Item>
  );
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    save: (post) => {
      dispatch(saveContent(post));
    },
  };
}

export default connect(null, mapDispatchToProps)(SavePostMenuItem);
