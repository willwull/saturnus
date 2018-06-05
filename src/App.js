import React, { Component } from "react";
import FaIcon from "@fortawesome/react-fontawesome";

import authenticate from "api/authentication";
import Header from "components/Header";
import PostFeed from "components/PostFeed";
import PrimaryButton from "components/Buttons/PrimaryButton";

class App extends Component {
  state = {
    isLoading: true,
    currentSubName: "",
    posts: [],
  };

  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.currentSubName !== prevState.currentSubName) {
      this.loadPosts();
    }
  }

  loadPosts = async () => {
    const { currentSubName } = this.state;
    this.setState({ isLoading: true });

    try {
      const snoo = await authenticate();
      const posts = await snoo.getHot(currentSubName);
      console.log(posts);
      this.setState({ posts });
    } catch (error) {
      console.log(error);
    }
    this.setState({ isLoading: false });
  };

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

  setCurrentSub = currentSubName => {
    this.setState({ currentSubName });
  };

  render() {
    const { isLoading, currentSubName, posts } = this.state;

    if (isLoading) {
      return (
        <div className="loading-container">
          <FaIcon icon="spinner-third" spin />
        </div>
      );
    }

    return (
      <>
        <Header
          currentSubName={currentSubName}
          setCurrentSub={this.setCurrentSub}
        />
        <PostFeed posts={posts} loadMore={this.loadMore} />
      </>
    );
  }
}

export default App;
