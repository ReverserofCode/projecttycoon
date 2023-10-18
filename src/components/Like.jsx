import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ScrapDelete, ScrapPost } from "../functional/Scrap";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 0;
  font-size: 25px;
  background-color: white;
  border: 1px solid #dddddd;
  padding: 5px;
  border-radius: 50%;
`;

function Like({ userData }) {
  const [like, setLike] = useState(false);
  useEffect(() => {
    let buf = userData?.scrappedProjects;
    let path = window.location.href.split("/");
    for (let i = 0; i < buf?.length; i++) {
      if (path[4] === buf[i]?.projectId) {
        setLike(true);
      }
    }
  }, [userData?.scrappedProjects]);
  return (
    <Container
      onClick={() => {
        if (userData !== undefined) setLike(!like);
      }}
    >
      {like ? (
        <AiFillHeart
          color="#ff3434"
          onClick={() => {
            if (userData !== undefined) {
              let path = window.location.href.split("/");
              ScrapDelete(path[4], userData?.memberId);
            }
          }}
        />
      ) : (
        <AiOutlineHeart
          color="#000000"
          onClick={() => {
            if (userData !== undefined) {
              let path = window.location.href.split("/");
              ScrapPost(path[4], userData?.memberId);
            }
          }}
        />
      )}
    </Container>
  );
}

export default Like;
