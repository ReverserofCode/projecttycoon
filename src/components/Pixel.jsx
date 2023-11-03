import styled from "@emotion/styled";

export const PixelText40 = styled.span`
  font-family: "NeoDunggeunmo Pro";
  white-space: nowrap;
  padding: 10px 0 0 0;
  font-size:32px;
  margin-bottom: ${(props) => props.margin_bottom};
  color: ${(props) => props.color};
  @media (max-width: 890px) {
    font-size: 25px;
  }
   @media (max-width: 760px) {
       font-size: 23px;
  }
  @media (max-width: 750px) {
       font-size: 21px;
  }
  @media (max-width: 650px) {
    font-size: 19px;
  }
  @media (max-width: 460px) {
    font-size: 18px;
  }
  @media (max-width: 380px) {
    font-size: 14px;
  }
`;
