import Snoowrap from "snoowrap";
import { appOnlyOauth } from "./authentication";
import credentials from "./credentials";

class Reddit {
  _snoo = null;

  /**
   * Creates an instance of Snoowrap.
   * Authenticates with app only OAuth by default.
   *
   * TODO: authenticate with logged in users
   */
  async authenticate() {
    // TODO: check localStorage for access token and create a new instance of snoowrap with that
    try {
      const appOnly = await appOnlyOauth();
      this._snoo = new Snoowrap({
        userAgent: credentials.userAgent,
        accessToken: appOnly.access_token,
      });
    } catch (error) {
      throw new Error("Couldn't authenticate, please try refreshing the page");
    }
  }

  /**
   * Returns an authenticated instance of snoowrap.
   *
   * @returns {Snoowrap}
   */
  getSnoowrap() {
    if (!this._snoo) {
      throw new Error("Not authenticated with Reddit yet");
    }
    return this._snoo;
  }
}

// export a singleton instance of Reddit
const reddit = new Reddit();
export default reddit;
