import styled, { css } from "styled-components";

type BannerWrapperProps = {
  imgSrc: string;
};

export const BannerWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${props => props.theme.primary};
  background-image: ${(props: BannerWrapperProps) => `url(${props.imgSrc})`};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 40px;
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;

  @media (max-width: 560px) {
    font-size: 1.5em;
  }

  @media (max-width: 399px) {
    flex-direction: column;
    font-size: 1.2em;
  }
`;

type IconProps = {
  theme: any;
  color?: string;
};

const commonCSS = css`
  display: inline-block;
  border-radius: 50%;
  border: 2px solid white;
  width: 50px;
  height: 50px;
  margin-right: 1ch;
  background-color: ${(props: IconProps) => props.color || props.theme.primary};

  @media (max-width: 399px) {
    margin-bottom: 8px;
    margin-right: 0;
  }
`;

export const IconImg = styled.img`
  ${commonCSS};
`;

export const Fallback = styled.div`
  ${commonCSS};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`;
