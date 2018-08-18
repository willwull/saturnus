# Saturnus

A work in progress browser client for Reddit.

Ever since the new Reddit was launched, many users have voiced their dislike of how clunky it feels. The aim of this project is to create a more light-weight Reddit experience, inspired by the popular iOS app Apollo.

## Installing locally

### Reddit API

This project uses Reddit's API. If you want to try it out yourself, you need to go [here](https://ssl.reddit.com/prefs/apps/) and create a new web app. You can then create a new file, `src/api/credentials.js` with the same content as `src/api/credentials-empty.js`, except with the correct info filled in.

### FontAwesome

This project uses some pro icons of FontAwesome from their NPM packages. You can probably replace the imports in `src/index.js` with the free versions of the icon packs, but no guarantees it will work.
