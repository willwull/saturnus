import React, { Fragment } from "react";
import { SidebarLink } from "../Sidebar";
import { FallBackIcon, SubIcon, ListLetter } from "./styles";

type SimpleSubreddit = {
  id: string;
  url: string;
  icon_img: string;
  key_color: string;
  display_name: string;
  display_name_prefixed: string;
};

type SubGroup = {
  [key: string]: {
    letter: string;
    subs: SimpleSubreddit[];
  };
};

type Props = {
  subreddits: SimpleSubreddit[];
};

function SubredditList({ subreddits }: Props) {
  if (!subreddits || !subreddits.length) {
    return <div>"Nothing to see here"</div>;
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

  // Take all subreddits and group them by the first letter
  const subsByLetter = sorted.reduce(
    (acc: SubGroup, sub) => {
      let firstLetter = sub.display_name[0].toUpperCase();

      // Numbers should be grouped under #
      if (!isNaN(Number(firstLetter))) {
        firstLetter = "#";
      }

      if (!acc[firstLetter]) {
        acc[firstLetter] = {
          letter: firstLetter,
          subs: [sub],
        };
        return acc;
      }

      acc[firstLetter].subs.push(sub);
      return acc;
    },
    {} as SubGroup,
  );

  return (
    <Fragment>
      {Object.values(subsByLetter).map(subGroup => (
        <Fragment key={subGroup.letter}>
          <ListLetter>{subGroup.letter}</ListLetter>
          <Fragment>
            {subGroup.subs.map(sub => (
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
        </Fragment>
      ))}
    </Fragment>
  );
}

export default SubredditList;
