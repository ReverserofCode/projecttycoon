import styled from "@emotion/styled";

export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  font-weight: 600;
  user-select: none;
  width: 100%;
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
  width: 100%;
  gap: 25px;
  border-radius: 10px;
`;
export const FilterHeader = styled.div`
  font-size: 25px;
  user-select: none;
  color: #0b666a;
`;
export const SubmitButton = styled.div`
  transition: 100ms;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 5px;
  border: 1px solid var(--main-color-main-color-2, #0b666a);
  width: 100%;
  font-size: 25px;
  color: #0b666a;
  user-select: none;
  cursor: pointer;
  :hover {
    background: var(--main-color-main-color-2, #0b656a26);
  }
  :active {
    background-color: white;
  }
`;
