import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSubreddit, subscribeToSub } from "../actions/subreddits";
import Banner from "../components/Banner";
import { Subreddit } from "snoowrap";
import { RootState, DispatchType } from "../reducers";
import Modal from "../components/Modal";
import TextContent from "../components/TextContent";
import { numberWithSpaces } from "../utils";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { BannerImg } from "../components/Banner/styles";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import { Plus, Check } from "react-feather";
import { openDialog } from "../components/Popovers";

type StateProps = {
  data: Subreddit | null;
  isLoadingSubscription: boolean;
  isLoading: boolean;
  error: boolean;
  isLoggedIn: boolean;
};

type DispatchProps = {
  getSub: (subredditName: string) => void;
  subscribe: (subreddit: Subreddit, action: "sub" | "unsub") => void;
};

type OwnProps = {
  subreddit: string;
};

type Props = StateProps & DispatchProps & OwnProps & RouteComponentProps;

type State = {
  modalIsOpen: boolean;
};

class SubredditBanner extends Component<Props, State> {
  state = {
    modalIsOpen: false,
  };

  componentDidMount() {
    const { getSub, subreddit } = this.props;
    getSub(subreddit);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.subreddit !== prevProps.subreddit) {
      this.props.getSub(this.props.subreddit);
    }

    if (this.props.location !== prevProps.location) {
      this.setState({ modalIsOpen: false });
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  toggleModal = () => {
    this.setState((state) => ({
      modalIsOpen: !state.modalIsOpen,
    }));
  };

  onPrimary = (isSubsribed: boolean) => {
    const { data, subscribe } = this.props;

    if (!isSubsribed) {
      subscribe(data!, "sub");
      return;
    }

    openDialog({
      title: "Unsubscribe?",
      text: "Are you sure you want to unsubscribe?",
      primaryLabel: "Unsubscribe",
      onPrimary: () => subscribe(data!, "unsub"),
      type: "destructive",
      focusOnCancel: true,
    });
  };

  render() {
    const { data, isLoading, isLoadingSubscription, isLoggedIn } = this.props;

    if (isLoading || !data) {
      return <BannerImg />;
    }

    const title = data.display_name_prefixed;
    const subtitle = `${numberWithSpaces(
      data.subscribers,
    )} subscribers • ${numberWithSpaces(data.active_user_count)} online`;

    const bannerSrc = data.banner_background_image || data.banner_img;
    const iconColor = data.key_color || data.primary_color;

    let btn;
    if (data.user_is_subscriber) {
      btn = (
        <PrimaryButton
          disabled={!isLoggedIn || isLoadingSubscription}
          onClick={() => this.onPrimary(true)}
        >
          <Check size={20} /> Subscribed
        </PrimaryButton>
      );
    } else {
      btn = (
        <PrimaryButton
          disabled={!isLoggedIn || isLoadingSubscription}
          onClick={() => this.onPrimary(false)}
        >
          <Plus /> Subscribe
        </PrimaryButton>
      );
    }

    const showFullDescriptionBtn =
      data.description_html != null &&
      data.description_html !== data.public_description_html;

    return (
      <>
        <Banner
          title={title}
          subtitle={subtitle}
          iconSrc={data.icon_img}
          iconColor={iconColor}
          bannerSrc={bannerSrc}
          bannerColor={data.banner_background_color}
          primaryAction={btn}
        >
          <TextContent>{data.public_description_html}</TextContent>
          {showFullDescriptionBtn && (
            <SecondaryButton onClick={this.openModal}>
              Read full description
            </SecondaryButton>
          )}
        </Banner>

        <Modal isOpen={this.state.modalIsOpen} hideFunc={this.toggleModal}>
          <TextContent>{data.description_html}</TextContent>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(
  { subreddits, user }: RootState,
  ownProps: OwnProps,
): StateProps {
  const currentSub = subreddits[ownProps.subreddit] || {
    data: null,
    isLoading: false,
    isLoadingSubscription: false,
    error: false,
  };

  return {
    ...currentSub,
    isLoggedIn: user.loggedIn,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    getSub: (subredditName) => {
      dispatch(fetchSubreddit(subredditName));
    },
    subscribe: (subreddit, action) => {
      dispatch(subscribeToSub(subreddit, action));
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubredditBanner),
);
