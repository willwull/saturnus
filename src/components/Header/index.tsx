import React from "react";
import { Link } from "react-router-dom";
import LoggedInUserMenu from "../../containers/LoggedInUserMenu";
import ContentBox from "../ContentBox";
import SaturnusLogo from "../SaturnusLogo";
import { LogoWrapper } from "./styles";
import HeaderButton from "./HeaderButton";
import "./Header.scss";

function Header() {
  return (
    <ContentBox className="header-component">
      <HeaderButton />
      <Link to="/">
        <LogoWrapper>
          <SaturnusLogo />
        </LogoWrapper>
      </Link>
      <div>
        <Link to="/">Saturnus</Link>
      </div>
      <LoggedInUserMenu />
    </ContentBox>
  );
}

export default Header;
