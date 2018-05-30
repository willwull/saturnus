import React, { Component } from "react";
import authenticate from "./api/authentication";
import Post from "./components/Post";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    try {
      const snoo = await authenticate();
      const posts = await snoo.getHot();
      console.log(posts);
      this.setState({ posts });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="post-feed">
        {posts.length !== 0 &&
          posts.map(post => <Post key={post.id} post={post} />)}
      </div>
    );
  }
}

export default App;
