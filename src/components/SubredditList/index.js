import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { SidebarLink } from "../Sidebar";

function SubredditList({ subreddits }) {
  if (!subreddits || !subreddits.length) {
    return "Nothing to see here";
  }

  const sorted = subreddits.sort((a, b) => {
    const nameA = a.display_name.toLowerCase();
    const nameB = b.display_name.toLowerCase();
    return nameA > nameB;
  });

  return (
    <Fragment>
      {sorted.map(sub => (
        <SidebarLink key={sub.id} to={sub.url}>
          {sub.display_name_prefixed}
        </SidebarLink>
      ))}
    </Fragment>
  );
}

SubredditList.propTypes = {
  subreddits: PropTypes.array.isRequired,
};

export default SubredditList;
