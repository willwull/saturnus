import { combineReducers, Dispatch, Action } from "redux";
import { ThunkDispatch } from "redux-thunk";

import user, { UserState } from "./user";
import posts, { PostsState } from "./posts";
import theme, { ThemeState } from "./theme";
import search, { SearchState } from "./search";
import sidebar, { SidebarState } from "./sidebar";
import comments, { CommentsState } from "./comments";
import snoowrap, { SnoowrapState } from "./snoowrap";
import userpages, { UserPagesState } from "./userpages";
import subreddits, { SubredditState } from "./subreddits";
import currentPost, { CurrentPostState } from "./currentPost";

export type RootState = {
  user: UserState;
  posts: PostsState;
  theme: ThemeState;
  search: SearchState;
  sidebar: SidebarState;
  comments: CommentsState;
  snoowrap: SnoowrapState;
  userpages: UserPagesState;
  subreddits: SubredditState;
  currentPost: CurrentPostState;
};

export default combineReducers<RootState>({
  user,
  posts,
  theme,
  search,
  sidebar,
  comments,
  snoowrap,
  userpages,
  subreddits,
  currentPost,
});

export type DispatchType = Dispatch<Action> &
  ThunkDispatch<RootState, any, Action>;
