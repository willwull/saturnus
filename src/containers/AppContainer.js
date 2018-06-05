import { connect } from "react-redux";

import { setSnoowrap } from "actions";
import App from "App";

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setSnoowrap: snoowrap => {
    dispatch(setSnoowrap, snoowrap);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
