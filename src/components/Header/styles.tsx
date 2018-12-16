import styled from "styled-components";

export const LogoWrapper = styled.div`
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
