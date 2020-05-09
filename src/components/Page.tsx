import styled from "styled-components";

const Page = styled.div`
  max-width: 850px;
  margin: 70px auto 20px auto;
`;

export const BannerPage = styled.div`
  margin-top: 50px;
`;

export const BannerPageContent = styled.div`
  max-width: 850px;
  margin: 0px auto 20px auto;
`;

export const PadOnNarrow = styled.div`
  @media (max-width: 874px) {
    padding: 0 var(--content-padding);
  }
`;

export default Page;
