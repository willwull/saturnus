import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "@marionebl/styled-components";

import LoggedInUserMenu from "containers/LoggedInUserMenu";
import SidebarToggler from "containers/SidebarToggler";
import ContentBox from "components/ContentBox";
import SaturnusLogo from "../SaturnusLogo";
import "./Header.scss";

const LogoWrapper = styled.div`
  background: ${props => props.theme.primary};
  color: white;
  font-size: 20px;
  padding: 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Header() {
  return (
    <ContentBox className="header-component">
      <SidebarToggler>
        <LogoWrapper>
          <SaturnusLogo />
        </LogoWrapper>
      </SidebarToggler>
      <div>
        <Link to="/">Saturnus</Link>
      </div>
      <LoggedInUserMenu />
    </ContentBox>
  );
}

/*
Header.propTypes = {
  currentSubName: PropTypes.string.isRequired,
  setCurrentSub: PropTypes.func.isRequired,
};
*/

export default Header;
