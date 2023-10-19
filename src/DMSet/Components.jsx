import styled from "@emotion/styled";

/** 하단에 fix되어 항상 보이는 버튼 태그 */
export const HoverIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: white;
  border-radius: 50%;
  background-color: black;
  user-select: none;
  font-size: 25px;
  :active {
    background-color: #3b3b3b;
  }
  position: fixed;
  bottom: 10px;
  right: 10px;
  animation: ${(props) => {
      return props.status ? "trueRotate" : "falseRotate";
    }}
    300ms ease-in-out both;
  @keyframes trueRotate {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 45deg;
      background-color: #3b3b3b;
    }
  }
  @keyframes falseRotate {
    from {
      rotate: 45deg;
    }
    to {
      rotate: 0deg;
    }
  }
  @media screen and (max-width: 370px) {
    font-size: 20px;
    padding: 5px;
  }
`;
