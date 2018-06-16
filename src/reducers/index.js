import { combineReducers } from "redux";
import theme from "./theme";
import subreddits from "./subreddits";
import snoowrap from "./snoowrap";
import posts from "./posts";
import currentPost from "./currentPost";
import user from "./user";
import sidebar from "./sidebar";

export default combineReducers({
  theme,
  sidebar,
  subreddits,
  posts,
  snoowrap,
  currentPost,
  user,
});
