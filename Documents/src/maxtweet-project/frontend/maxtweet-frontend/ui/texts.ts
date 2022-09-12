import styled from "styled-components";

export const MainTitle = styled.h1`
  font-size: 20px;
`;

export const RegularGrayText = styled.p`
  color: var(--gray);
  font-size: 16px;
  @media (min-width: 1280px) {
    font-size: 20px;
  }
`;
export const MediumGrayText = styled(RegularGrayText)`
  font-size: 16px;
`;
export const MediumGrayTextBold = styled(RegularGrayText)`
  font-size: 16px;
  font-weight: bold;
`;
export const RegularTextBold = styled.p`
  font-weight: bold;
  color: var(--black);
  font-size: 16px;
`;
export const RegularTextBlack = styled.p`
  color: var(--black);
  font-size: 16px;
`;
export const RegularGrayTextSmall = styled(RegularGrayText)`
  font-size: 14px;
  margin: 0;
`;
export const RegularBlackSmallTextBold = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;
export const RegularTextBlue = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: var(--secondary-color);
`;
export const TextForTweetDescription = styled(RegularGrayText)`
  color: var(--black);
  font-size: 15px;
`;

export const SmallTextForTweetCard = styled.p`
  font-size: 12px;
`;
