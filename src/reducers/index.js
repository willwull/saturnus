import { combineReducers } from "redux";
import theme from "./theme";
import currentSub from "./currentSub";
import snoowrap from "./snoowrap";
import posts from "./posts";
import currentPost from "./currentPost";
import user from "./user";
import sidebar from "./sidebar";

export default combineReducers({
  theme,
  sidebar,
  currentSub,
  posts,
  snoowrap,
  currentPost,
  user,
});
