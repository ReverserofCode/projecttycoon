# Board Write Test
- 게시판 글쓰기에 사용될 게시글 작성용 UI들을 테스트 하기 위한 페이지 입니다.

## React Editor JS
 - 장점
    - 게시판의 글을 쓸때 Notion의 느낌이 나는 UI가 독창적인 느낌을준다.
    - 에디터를 사용할때 나오는 글들이 그대로 나오기 때문에 따로 생각하며 글을 쓸 필요가 없다.
    - Simple image플러그인을 이용해 사진을 url화 해서 저장하기 때문에 server에 사진을 따로 저장할 필요가 없다.
 - 단점
    - 게시판용으로 제작된 라이브러리가 아니기 때문에 아직 미비한 부분이 있다.
    - Simple image플러그인을 이용해 사진을 url화 할때 생각보다 용량이 크다.
    - codebox 플러그인은 수정이 가능하게 되어 버려서 복사할때는 장점이지만 다른부분에서는 단점이 될수 있다.

##  React Quill
 - 장점
    - 일반적인 게시판의 형태 이기 때문에 잠깐사용해 보면 금방 익숙해 질수 있다.
    - html태그를 text형태로 변환해서 저장하기 때문에 용량이 작다.
 - 단점
    - ToolBar에 따로 라벨을 지정할수 없기 때문에 해당 항목이 무슨 역할을 하는지 알수 없다.
    - html태그를 text형태로 변환해서 저장하기 때문에 Script를 포함해서 주입할 수 있어 사용하게 된다면 후처리가 필요하다. ( XSS 해결방안은 dompurify라이브러리로 예방이 가능하다. )

# 사용된 Module List
|Package Name                 	| version  	    |
| :--                         	| :--:     		|
|@bomdi/codebox                 |^2.0.0         |
|@editorjs/editorjs             |^2.27.2        |
|@editorjs/embed                |^2.5.3         |
|@editorjs/nested-list          |^1.3.0         |
|@editorjs/quote                |^2.5.0         |
|@editorjs/simple-image         |^1.5.1         |
|@editorjs/underline            |^1.1.0         |
|editorjs-drag-drop             |^1.1.13        |
|editorjs-header-with-alignment |^1.0.1         |
|editorjs-html                  |^3.4.3         |
|editorjs-paragraph-with-alignment|^3.0.0       |
|editorjs-table                 |^1.4.10        |
|editorjs-text-color-plugin     |^2.0.4         |
|editorjs-undo                  |^2.0.22        |
|highlight.js                   |^11.8.0        |
|react-quill                    |^2.0.0"        |
|dompurify                      |^3.0.5         |
|axios                          |^1.4.0         |
|@emotion/react                 |^11.11.1       |
|@emotion/styled                |^11.11.0       |