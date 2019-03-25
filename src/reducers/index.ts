import { combineReducers, Dispatch, Action } from "redux";
import theme, { ThemeState } from "./theme";
import subreddits, { SubredditState } from "./subreddits";
import snoowrap, { SnoowrapState } from "./snoowrap";
import posts, { PostsState } from "./posts";
import currentPost from "./currentPost";
import user, { UserState } from "./user";
import sidebar from "./sidebar";
import { ThunkDispatch } from "redux-thunk";
import search, { SearchState } from "./search";

export type RootState = {
  theme: ThemeState;
  sidebar: any; // TODO
  subreddits: SubredditState;
  posts: PostsState;
  snoowrap: SnoowrapState;
  currentPost: any; // TODO
  user: UserState;
  search: SearchState;
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
  search,
});
