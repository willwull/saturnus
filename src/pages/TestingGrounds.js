import React from "react";
import Dropdown from "../components/Dropdown";
import Menu from "../components/Menu";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import AppSidebar from "../containers/AppSidebar";
import { openDialog } from "../components/Popovers";

class TestingGrounds extends React.Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawer = () => {
    this.setState(state => ({
      drawerOpen: !state.drawerOpen,
    }));
  };

  hideDrawer = () => {
    this.setState({ drawerOpen: false });
  };

  openPopover = () => {
    openDialog({
      text: "Bruh",
      title: "Bruh",
      onPrimary: () => null,
      primaryLabel: "Idk lol",
    });
  };

  render() {
    const menuOverlay = (
      <Menu>
        <Menu.Item>Save post</Menu.Item>
        <Menu.Item>Give gold</Menu.Item>
        <Menu.Item>Hide</Menu.Item>
        <Menu.Item>Report</Menu.Item>
        <Menu.Item>Here is a longer menu item lol</Menu.Item>
      </Menu>
    );
    const style = {
      width: "650px",
      margin: "70px auto 0 auto",
    };

    return (
      <div className="main-content" style={style}>
        <Dropdown overlay={menuOverlay} placement="bottomRight">
          Open dropdown
        </Dropdown>

        <PrimaryButton onClick={this.openPopover}>Popover</PrimaryButton>
        <PrimaryButton onClick={this.toggleDrawer}>Drawer</PrimaryButton>
        <AppSidebar open={this.state.drawerOpen} onClose={this.hideDrawer}>
          Sidebar
        </AppSidebar>

        <p>Here is some text</p>
        <p>Here is some more</p>
        <p>jdlkajsld adasdasd</p>
        <p>jdlkajsld adasdasd</p>
        <img width="400" src="https://i.redd.it/sh5ioxp3iz211.jpg" alt="" />
        <p>jdlkajsld adasdasd</p>
        <p>jdlkajsld adasdasd</p>
        <p>jdlkajsld adasdasd</p>
        <p>jdlkajsld adasdasd</p>
        <p>jdlkajsld adasdasd</p>
      </div>
    );
  }
}

// TestingGrounds.propTypes = {};

export default TestingGrounds;
