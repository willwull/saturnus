# Saturnus

A work in progress browser client for Reddit.

Ever since the new Reddit was launched, many users have voiced their dislike of how clunky it feels. The aim of this project is to create a more light-weight Reddit experience, inspired by the popular iOS app Apollo.

## Installing locally

### Reddit API

This project uses Reddit's API. If you want to try it out yourself, you need to go [here](https://ssl.reddit.com/prefs/apps/) and create a new web app. You should then copy `.env.example` into `.env` and add your Reddit Client ID.

## Helpful editor extensions

Throughout this project, I organize content within files by using comments like this:

```js
// MARK: Helper functions

function thing() {}
```

This is actually a convention I learned in Swift, but I've found it useful in JS as well. I recommend the VS Code extension [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) with the following config:

```json
"todohighlight.keywords": [
    {
      "text": "MARK:",
      "isWholeLine": true,
      "backgroundColor": "lightblue",
      "color": "#ffffff"
    }
  ]
```

This config will highlight the lines that contain the MARK comments. Obviously, you can use any other colors if you prefer.
