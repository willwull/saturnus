import Snoowrap from "snoowrap";
import credentials from "./credentials";
import { REDIRECT_URI, getAuthTokens } from "./authentication";

class Reddit {
  _snoo = null;

  /**
   * Creates an instance of Snoowrap with app only OAuth by default.
   *
   * @param {Object} accessToken
   */
  initAppOnly(accessToken) {
    // TODO: check localStorage for access token and create a new instance of snoowrap with that
    this._snoo = new Snoowrap({
      userAgent: credentials.userAgent,
      accessToken,
    });
  }

  /**
   * Creates an instance of Snoowrap, authenticated user.
   * Use this function when the user signs in for the first time and is
   * redirected back to this app from reddit.
   *
   * @param {String} code
   */
  async initAuthCode(code) {
    const tokens = await getAuthTokens(code);
    this._snoo = new Snoowrap({
      userAgent: credentials.userAgent,
      clientId: credentials.clientId,
      clientSecret: "",
      refreshToken: tokens.refresh_token,
    });
  }

  /**
   * Creates an instance of Snoowrap, authenticated user.
   * Use this function if user has signed in in the past, and the refresh
   * token is already known / stored somewhere.
   *
   * @param {String} refreshToken
   */
  initRefreshToken(refreshToken) {
    console.log(`Refresh token passed to initRefreshToken: ${refreshToken}`);
    this._snoo = new Snoowrap({
      userAgent: credentials.userAgent,
      clientId: credentials.clientId,
      clientSecret: "",
      refreshToken,
    });
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
