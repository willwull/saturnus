import styled, { css } from "styled-components";

export const BannerWrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.contentBg};
`;

type BannerImgProps = {
  imgSrc: string;
  bgColor: string;
};

function bannerImg(src: string) {
  if (src !== "") {
    return `url(${src})`;
  }
  return "";
}

function bannerBgColor(color: string, fallback: string) {
  if (color !== "") {
    return color;
  }
  return fallback;
}

export const BannerImg = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${(props: any) =>
    bannerBgColor(props.bgColor, props.theme.primary)};
  background-image: ${(props: BannerImgProps) => bannerImg(props.imgSrc)};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 40px;
`;

type IconProps = {
  theme: any;
  color?: string;
};

const commonCSS = css`
  display: inline-block;
  border-radius: 50%;
  border: 4px solid white;
  width: 100px;
  height: 100px;
  margin-right: 1ch;
  margin-top: -50px;
  background-color: ${(props: IconProps) => props.color || props.theme.primary};
`;

export const InfoContainer = styled.div`
  max-width: 750px;
  margin: 0 auto;
  padding-bottom: 16px;

  h1 {
    margin: 0;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  h1 {
    display: flex;
    align-items: center;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 20px;
    }

    button {
      font-size: 12px;
    }
  }

  @media (max-width: 400px) {
    flex-direction: column;
    align-items: flex-start;

    button {
      margin-top: 8px;
      margin-bottom: 12px;
    }
  }
`;

export const SubStats = styled.div`
  font-size: 14px;
  opacity: 0.6;
  margin-top: 5px;
`;

export const IconImg = styled.img`
  ${commonCSS};
`;

export const Fallback = styled.div`
  ${commonCSS};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: white;
`;

export const ReadMoreBtn = styled.button`
  opacity: 0.5;
  color: ${props => props.theme.primary};
`;
