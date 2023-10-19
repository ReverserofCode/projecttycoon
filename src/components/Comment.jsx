import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { CommentGet, CommentPost, CommentDelete } from "../functional/Comment";
import { RiDeleteBin6Line } from "react-icons/ri";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const CommentWrap = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  border-top: 1px solid #d9d9d9;
  padding: 0 10px;
  position: relative;
`;
const CommentDeleteButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  color: #c9c9c9;
  :hover {
    color: black;
  }
`;
const CommentNick = styled.p`
  color: black;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 0;
  @media screen and (max-width: 430px) {
    font-size: 15px;
  }
`;
const CommentContents = styled.p`
  color: black;
`;
const CommentInputZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  border-top: 1px solid #d9d9d9;
  gap: 10px;
  padding-bottom: 10px;
`;
const CommentInputText = styled.textarea`
  width: 100%;
  height: 125px;
  resize: none;
  border: 2px solid #d9d9d9;
  border-radius: 5px;
  outline: none;
  font-family: "Noto Sans KR", sans-serif;
  padding: 10px;
  box-sizing: border-box;
`;
const CommentInputButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border-radius: 10px;
  background: #0b666a;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 5px 30px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: white;
  user-select: none;
  cursor: pointer;
  :active {
    scale: 0.97;
  }
`;

function Comment({ userData }) {
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const handleCommentGen = useCallback(() => {
    let contents = [];
    for (let i = commentList?.length - 1; i >= 0; i--) {
      contents.push(
        <CommentWrap key={`comment ${i}`}>
          {userData?.memberId === commentList[i].commentWriter.memberId ? (
            <CommentDeleteButton
              onClick={() => {
                let path = window.location.href.split("/");
                CommentDelete(path[4], commentList[i].commentId).then(() => {
                  let path = window.location.href.split("/");
                  CommentGet(path[4]).then((res) => {
                    setCommentList(res);
                  });
                });
              }}
            >
              <RiDeleteBin6Line></RiDeleteBin6Line>
            </CommentDeleteButton>
          ) : (
            ""
          )}
          <CommentNick>
            {commentList[i].commentWriter.memberNickname}
          </CommentNick>
          <CommentContents>{commentList[i].commentContent}</CommentContents>
        </CommentWrap>
      );
    }
    return contents;
  }, [commentList, userData?.memberId]);
  useEffect(() => {
    const path = window.location.href.split("/");
    CommentGet(path[4]).then((res) => {
      setCommentList(res);
    });
  }, []);
  return (
    <Container>
      <CommentInputZone>
        <CommentInputText
          placeholder={
            userData === ""
              ? "댓글을 입력하시려면 로그인을 해주세요"
              : "댓글을 입력해 주세요"
          }
          value={comment}
          onChange={(e) => {
            e.preventDefault();
            setComment(e.target.value);
          }}
          readOnly={userData === ""}
        ></CommentInputText>
        <CommentInputButton
          onClick={() => {
            const path = window.location.href.split("/");
            CommentPost(path[4], userData?.memberId, comment).then((res) => {
              CommentGet(path[4]).then((res) => {
                setCommentList(res);
                setComment("");
              });
            });
          }}
        >
          등록
        </CommentInputButton>
      </CommentInputZone>
      {handleCommentGen()}
    </Container>
  );
}

export default Comment;
