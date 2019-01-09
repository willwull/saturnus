import React, { Fragment } from "react";
import { SidebarLink } from "../Sidebar";
import { FallBackIcon, SubIcon, ListLetter } from "./styles";

export type SimpleSubreddit = {
  id: string;
  url: string;
  icon_img: string;
  key_color: string;
  display_name: string;
  display_name_prefixed: string;
  user_has_favorited: boolean;
};

type SubGroup = {
  [key: string]: {
    letter: string;
    subs: SimpleSubreddit[];
  };
};

function mapSubToListElem(sub: SimpleSubreddit) {
  return (
    <SidebarLink key={sub.id} to={sub.url}>
      {sub.icon_img ? (
        <SubIcon src={sub.icon_img} />
      ) : (
        <FallBackIcon color={sub.key_color} />
      )}

      {sub.display_name_prefixed}
    </SidebarLink>
  );
}

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

  const faveSubs = sorted.filter(sub => sub.user_has_favorited);

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
      {faveSubs.length > 0 && (
        <Fragment>
          <ListLetter>Favorites</ListLetter>
          <Fragment>{faveSubs.map(mapSubToListElem)}</Fragment>
        </Fragment>
      )}
      {Object.values(subsByLetter).map(subGroup => (
        <Fragment key={subGroup.letter}>
          <ListLetter>{subGroup.letter}</ListLetter>
          <Fragment>{subGroup.subs.map(mapSubToListElem)}</Fragment>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default SubredditList;
