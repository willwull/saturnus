import pkg from "../../package.json";

const browserUA = navigator.userAgent.toLowerCase();

export default {
  userAgent: `${browserUA}:saturnus:v${pkg.version} (by /u/arkazain)`,
  clientId: "enter your app id here",
};
