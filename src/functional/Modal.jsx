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
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

function Modal(props) {
  return (
    <ModalBackdrop>
      <ModalContent>
        {props.children}
        <button onClick={props.onClose}>닫기</button>
      </ModalContent>
    </ModalBackdrop>
  );
}

export default Modal;
