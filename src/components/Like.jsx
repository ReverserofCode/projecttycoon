import styled from "@emotion/styled";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 0;
  font-size: 25px;
  background-color: #dddddd;
  padding: 5px;
  border-radius: 50%;
`;

function Like({ userData }) {
  const [like, setLike] = useState(false);
  return (
    <Container
      onClick={() => {
        if (userData !== undefined) setLike(!like);
      }}
    >
      {like ? (
        <AiOutlineHeart color="#000000" />
      ) : (
        <AiFillHeart color="#ff3434" />
      )}
    </Container>
  );
}

export default Like;
