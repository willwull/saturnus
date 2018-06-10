import { combineReducers } from "redux";
import currentSub from "./currentSub";
import snoowrap from "./snoowrap";
import posts from "./posts";
import currentPost from "./currentPost";
import user from "./user";
import sidebar from "./sidebar";

export default combineReducers({
  sidebar,
  currentSub,
  posts,
  snoowrap,
  currentPost,
  user,
});
