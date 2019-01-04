import { combineReducers, Dispatch, Action } from "redux";
import theme, { ThemeState } from "./theme";
import subreddits, { SubredditState } from "./subreddits";
import snoowrap, { SnoowrapState } from "./snoowrap";
import posts from "./posts";
import currentPost from "./currentPost";
import user, { UserState } from "./user";
import sidebar from "./sidebar";
import { ThunkDispatch } from "redux-thunk";

export type RootState = {
  theme: ThemeState;
  sidebar: any; // TODO
  subreddits: SubredditState;
  posts: any; // TODO
  snoowrap: SnoowrapState;
  currentPost: any; // TODO
  user: UserState;
};

export type DispatchType = Dispatch<Action> &
  ThunkDispatch<RootState, any, Action>;

export default combineReducers<RootState>({
  theme,
  sidebar,
  subreddits,
  posts,
  snoowrap,
  currentPost,
  user,
});
