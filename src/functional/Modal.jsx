import React from "react";
import styled from "@emotion/styled";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  width: 300px;
  height: 100px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  font-size: 1.1em;
  font-family: "맑은고딕";
`;
const CloseBtn = styled.button`
  position: absolute;
  bottom: 15px;
  right: 20px;
  width: 70px;
  height: 30px;
  cursor: pointer;
  font-size: 1em;
  font-family: "맑은고딕";
`;
function Modal(props) {
  return (
    <ModalBackdrop>
      <ModalContent>
        {props.children}
        <CloseBtn onClick={props.onClose}>닫기</CloseBtn>
      </ModalContent>
    </ModalBackdrop>
  );
}

export default Modal;
