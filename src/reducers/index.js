import { combineReducers } from "redux";
import currentSub from "./currentSub";
import snoowrap from "./snoowrap";
import posts from "./posts";

export default combineReducers({ currentSub, posts, snoowrap });
