import React, { Fragment } from "react";
import styled from "@marionebl/styled-components";
import PropTypes from "prop-types";
import { SidebarLink } from "../Sidebar";

const SubIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 1ch;
  border-radius: 50%;
`;

const FallBackIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 1ch;
  border-radius: 50%;
  background: ${props => props.color || props.theme.primary};
`;

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

SubredditList.propTypes = {
  subreddits: PropTypes.array.isRequired,
};

export default SubredditList;
