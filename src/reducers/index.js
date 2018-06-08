import { combineReducers } from "redux";
import currentSub from "./currentSub";
import snoowrap from "./snoowrap";
import posts from "./posts";
import currentPost from "./currentPost";
import user from "./user";

export default combineReducers({
  currentSub,
  posts,
  snoowrap,
  currentPost,
  user,
});
