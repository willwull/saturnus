/**
 * Models related to Reddit API
 */

export type AppOnlyTokens = {
  access_token: string;
  token_type: "bearer";
  device_id: "DO_NOT_TRACK_THIS_DEVICE";
  expires_in: 3600;
  scope: "*";
};

export type AuthTokens = {
  access_token: string;
  token_type: "bearer";
  expires_in: 3600;
  scope: string;
  refresh_token: string;
};

/**
 * Models related to Redux state
 */
