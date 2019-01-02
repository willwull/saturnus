import { combineReducers } from "redux";
import theme, { ThemeState } from "./theme";
import subreddits, { SubredditState } from "./subreddits";
import snoowrap, { SnoowrapState } from "./snoowrap";
import posts from "./posts";
import currentPost from "./currentPost";
import user, { UserState } from "./user";
import sidebar from "./sidebar";

export type ReduxState = {
  theme: ThemeState;
  sidebar: any; // TODO
  subreddits: SubredditState;
  posts: any; // TODO
  snoowrap: SnoowrapState;
  currentPost: any; // TODO
  user: UserState;
};

export default combineReducers<ReduxState>({
  theme,
  sidebar,
  subreddits,
  posts,
  snoowrap,
  currentPost,
  user,
});
