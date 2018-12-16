import React, { Fragment } from "react";
import { SidebarLink } from "../Sidebar";
import { FallBackIcon, SubIcon } from "./styles";

type SimpleSubreddit = {
  id: string;
  url: string;
  icon_img: string;
  key_color: string;
  display_name: string;
  display_name_prefixed: string;
};

type Props = {
  subreddits: SimpleSubreddit[];
};

function SubredditList({ subreddits }: Props) {
  if (!subreddits || !subreddits.length) {
    return "Nothing to see here";
  }

  const sorted = subreddits.sort((a: SimpleSubreddit, b: SimpleSubreddit) => {
    const nameA = a.display_name.toLowerCase();
    const nameB = b.display_name.toLowerCase();
    if (nameA > nameB) {
      return 1;
    }
    if (nameA < nameB) {
      return -1;
    }
    return 0;
  });

  return (
    <Fragment>
      {sorted.map(sub => (
        <SidebarLink key={sub.id} to={sub.url}>
          {sub.icon_img ? (
            <SubIcon src={sub.icon_img} />
          ) : (
            <FallBackIcon color={sub.key_color} />
          )}

          {sub.display_name_prefixed}
        </SidebarLink>
      ))}
    </Fragment>
  );
}

export default SubredditList;
