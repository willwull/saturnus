import React from "react";
import { Link } from "react-router-dom";
import UserMenu from "../../containers/UserMenu";
import ContentBox from "../ContentBox";
import SaturnusLogo from "../SaturnusLogo";
import HeaderButton from "./HeaderButton";
import pkg from "../../../package.json";
import AppSearchbar from "../../containers/AppSearchbar";
import { LogoWrapper, VersionTag, SiteName } from "./styles";
import "./Header.scss";

function Header() {
  return (
    <ContentBox className="header-component">
      <HeaderButton />
      <LogoWrapper>
        <Link to="/">
          <SaturnusLogo />
        </Link>
      </LogoWrapper>
      <SiteName>
        <Link to="/">Saturnus</Link>
        <VersionTag>{pkg.version}</VersionTag>
      </SiteName>
      <AppSearchbar />
      <UserMenu />
    </ContentBox>
  );
}

export default Header;
