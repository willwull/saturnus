import React, { Component } from "react";
import FaIcon from "@fortawesome/react-fontawesome";

import authenticate from "./api/authentication";
import Post from "./components/Post";
import PrimaryButton from "./components/Buttons/PrimaryButton";

class App extends Component {
  state = {
    isLoading: true,
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
    this.setState({ isLoading: false });
  }

  loadMore = async () => {
    try {
      const { posts } = this.state;
      // fetchMore will return a Listing with _both_ previous and new posts
      const postsWithNew = await posts.fetchMore({ amount: 25 });
      this.setState({ posts: postsWithNew });
    } catch (error) {
      console.log(error);
      console.log("Oops?");
    }
  };

  render() {
    const { isLoading, posts } = this.state;

    if (isLoading) {
      return (
        <div className="loading-container">
          <FaIcon icon="spinner-third" spin />
        </div>
      );
    }

    return (
      <div className="post-feed">
        {posts.length !== 0 &&
          posts.map(post => <Post key={post.id} post={post} />)}

        <PrimaryButton className="load-more-btn" onClick={this.loadMore}>
          Load more
        </PrimaryButton>
      </div>
    );
  }
}

export default App;
