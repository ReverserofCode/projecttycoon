import styled from "@emotion/styled";
/** 사이드바에서 사용되는 메인 제목 태그 */
export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  font-weight: 600;
  user-select: none;
  width: 100%;
`;
/** 사이드바에서 사용되는 자체 배경 태그 */
export const Base = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px 0 20px 40px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--main-color-main-color-2, #071952);
  min-width: 250px;
  width: 100%;
  gap: 15px;
  border-radius: 10px;
`;
/** 사이드 바의 필터의 제목 태그 */
export const FilterHeader = styled.div`
  font-size: 25px;
  user-select: none;
  font-weight: 600;
  color: #071952;
`;
/** 사이드바의 필터적용후 사용되는 submit 태그 */
export const SubmitButton = styled.div`
  transition: 100ms;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 5px;
  border: 1px solid var(--main-color-main-color-2, #071952);
  width: 100%;
  height: 50px;
  font-size: 25px;
  font-weight: 600;
  color: #ffffff;
  background-color: #07305e;
  user-select: none;
  cursor: pointer;
  :hover {
    background: var(--main-color-main-color-2, #082d56c4);
    color: #ffffff;
  }
  :active {
    background-color: white;
  }
`;