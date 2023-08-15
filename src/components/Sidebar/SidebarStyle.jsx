import styled from "@emotion/styled";

export const MainHeader = styled.div`
  font-size: 25px;
  font-weight: 600;
  user-select: none;
`;
export const Base = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 24px 0 40px 50px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--main-color-main-color-2, #0b666a);
  min-width: 250px;
  gap: 25px;
  border-radius: 10px;
`;
export const FilterHeader = styled.div`
  font-size: 25px;
  user-select: none;
  color: #0b666a;
`;
