import pkg from "../../package.json";

const browserUA = navigator.userAgent.toLowerCase();

export default {
  userAgent: `${browserUA}:saturnus:v${pkg.version} (by /u/arkazain)`,
  clientId: process.env.REACT_APP_REDDIT_CLIENT_ID!,
};
