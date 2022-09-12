import styled from "styled-components";

export const TweetButton = styled.button`
  background-color: var(--secondary-color);
  color: var(--main-color);
  border-radius: 8px;
  width: 80px;
  padding: 8px;
  border: none;
  cursor: pointer;
`;

export const TweetComment = styled(TweetButton)`
  width: 50px;
`;

export const FollowButton = styled(TweetButton)`
  padding: 4px;
  border-radius: 4px;
`;
export const SearchBtn = styled(TweetButton)`
  padding: 6px;
  border-radius: 4px;
  @media (min-width: 1280px) {
    padding: 8px;
    text-align: center;
    height: 30px;
  }
`;
