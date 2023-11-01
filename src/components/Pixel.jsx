import styled from "@emotion/styled";

export const PixelText40 = styled.span`
  font-family: "NeoDunggeunmo Pro";
  white-space: nowrap;
  padding: 10px 0 0 0;
  /* font-size:32px; */
  color: ${(props) => props.color};
  @media (max-width: 760px) {
    font-size: 20px;
  }
  @media (max-width: 650px) {
    font-size: 17px;
  }
  @media (max-width: 550px) {
    font-size: 13px;
  }
  @media (max-width: 460px) {
    font-size: 12px;
  }
  @media (max-width: 380px) {
    font-size: 11px;
  }
`;
