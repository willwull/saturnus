import React from "react";
import { Link } from "react-router-dom";
import LoggedInUserMenu from "../../containers/LoggedInUserMenu";
import ContentBox from "../ContentBox";
import SaturnusLogo from "../SaturnusLogo";
import HeaderButton from "./HeaderButton";
import pkg from "../../../package.json";
import { LogoWrapper, VersionTag, SiteName } from "./styles";
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
      <SiteName>
        <Link to="/">Saturnus</Link>
        <VersionTag>{pkg.version}</VersionTag>
      </SiteName>
      <LoggedInUserMenu />
    </ContentBox>
  );
}

export default Header;
