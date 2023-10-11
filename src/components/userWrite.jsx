import styled from "@emotion/styled";

const Wrap=styled.div`
     max-width: 1000px;
     margin: 0 auto;
     padding: 4px;
`
const TitleWrap=styled.div`
    width: 100%;
    border-bottom: 2px gray solid;
`
const Title=styled.h3`
    
`
const WriteProjectWrap=styled.div`
    width: 100%;
    /* border: 1px gray solid; */
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`
const WirteProject=styled.div`
    max-width: 240px;
    height: 170px;
    width: 100%;
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
    padding: 12px 12px;
    box-sizing: border-box;
    display: flex;
    border:1px #0B666A solid;
    border-radius: 15px;
    @media screen and (max-width: 500px ){
        max-width: 320px;
        width: 100%;
        height: 200px;
}
`
const Font=styled.div`
    font-size: 14px;
    font-weight: 800;
`
const CommentWrap=styled.div`
    width: 100%;
    border:1px #0B666A solid;
    padding: 12px 12px;
    border-radius: 5px;
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.1);
`
const Box=styled.div`
    margin-bottom: 50px;
`
function UserWrite(){
    return(
        <Wrap>
            <Box>
                <TitleWrap>
                    <Title>개설한 프로젝트</Title>
                </TitleWrap>
                <WriteProjectWrap>
                    <WirteProject>
                        <img></img>
                        <Font>프로젝트 제목</Font>
                    </WirteProject>
                    <WirteProject>
                        <img></img>
                        <Font>프로젝트 제목</Font>
                    </WirteProject>
                    <WirteProject>
                        <img></img>
                        <Font>프로젝트 제목</Font>
                    </WirteProject>
                    <WirteProject>
                        <img></img>
                        <Font>프로젝트 제목</Font>
                    </WirteProject>
                    <WirteProject>
                        <img></img>
                        <Font>프로젝트 제목</Font>
                    </WirteProject>
                </WriteProjectWrap>
            </Box>
            <Box>
                <TitleWrap>
                    <Title>게시한 댓글</Title>
                </TitleWrap>
                <WriteProjectWrap>
                    <CommentWrap>
                        안녕
                    </CommentWrap>
                    <CommentWrap>
                        안녕
                    </CommentWrap>
                    <CommentWrap>
                        안녕
                    </CommentWrap>
                    <CommentWrap>
                        안녕
                    </CommentWrap>
                </WriteProjectWrap>
            </Box>
        </Wrap>
    )
}
 export default UserWrite;