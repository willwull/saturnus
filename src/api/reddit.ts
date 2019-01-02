import Snoowrap from "snoowrap";
import credentials from "./credentials";

class Reddit {
  private _snoo: Snoowrap | null = null;

  /**
   * Creates an instance of Snoowrap with app only OAuth by default.
   *
   * @param {String} accessToken
   */
  initAppOnly(accessToken: string): void {
    // TODO: check localStorage for access token and create a new instance of snoowrap with that
    this._snoo = new Snoowrap({
      userAgent: credentials.userAgent,
      accessToken,
    });

    // proxies and promises don't work well in Safari at the moment, so
    // methods like snoowrap.getSubscriptions().fetchAll() will fail
    // https://github.com/not-an-aardvark/snoowrap/issues/80
    this._snoo.config({
      proxies: false,
    });
  }

  /**
   * Creates an instance of Snoowrap, authenticated user.
   * Use this function if user has signed in in the past, and the refresh
   * token is already known / stored somewhere.
   *
   * @param {String} refreshToken
   */
  initRefreshToken(refreshToken: string): void {
    console.log(`Refresh token passed to initRefreshToken: ${refreshToken}`);
    this._snoo = new Snoowrap({
      userAgent: credentials.userAgent,
      clientId: credentials.clientId,
      clientSecret: "",
      refreshToken,
    });
    this._snoo.config({ proxies: false });
  }

  /**
   * Returns an authenticated instance of snoowrap.
   *
   * @returns {Snoowrap}
   */
  getSnoowrap(): Snoowrap {
    if (!this._snoo) {
      throw new Error("Not authenticated with Reddit yet");
    }
    return this._snoo;
  }
}

// export a singleton instance of Reddit
const reddit = new Reddit();
export default reddit;
