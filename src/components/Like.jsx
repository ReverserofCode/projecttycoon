import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ScrapDelete, ScrapPost } from "../functional/Scrap";
import { GetMyData } from "../functional/GetMyData";
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

function Like() {
  const [like, setLike] = useState(false);
  const [myData, setMyData] = useState();
  useEffect(() => {
    GetMyData().then((res) => {
      setMyData(res);
      let buf = res?.myScraplist;
      let path = window.location.href.split("/");
      for (let i = 0; i < buf?.length; i++) {
        console.log(buf[i].projectId);
        if (path[4] === String(buf[i]?.projectId)) {
          setLike(true);
          break;
        }
      }
    });
  }, []);
  return (
    <Container>
      {like ? (
        <AiFillHeart
          color="#ff3434"
          onClick={() => {
            if (myData !== undefined) {
              let path = window.location.href.split("/");
              ScrapDelete(path[4], myData?.memberId);
              setLike(!like);
            }
          }}
        />
      ) : (
        <AiOutlineHeart
          color="#000000"
          onClick={() => {
            if (myData !== undefined) {
              let path = window.location.href.split("/");
              ScrapPost(path[4], myData?.memberId);
              setLike(!like);
            }
          }}
        />
      )}
    </Container>
  );
}

export default Like;
