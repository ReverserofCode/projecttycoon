import styled from "@emotion/styled";

/** 로그인 공통 버튼 */
export const SubmitButton = styled.div`
  display: flex;
  max-width: 450px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  height: 50px;
  color: white;
  background-color: #0b666a;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  :hover {
    background-color: #08838a;
  }
  :active {
    scale: 0.98;
  }
`;
