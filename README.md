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

## React Markdown
 - 장점
   - Git에서 README.md 를 제작할때 사용하는 Markdown 언어를 그대로 담고 있기 때문에 Markdown언어를 공부하고 활용하는 연습에 사용되기 좋다.
   - Html태그를 이용할수 있어 꾸미기에 적합하다.
   - Markdown에서 사용하는 CodeBlock을 그대로 사용할수 있기 때문에 코드의 색채가 다채로워지고 많은 언어를 지원한다.
   - Custom ToolBar를 제작하기 위한 문서가 잘되어 있어서 문서를 읽거나 혹은 블로그를 보고 활용하기 좋다.
 - 단점
   - 기존 UI가 직관적이지 않아 수정사항이 많이 필요하다.
   - Markdown언어가 Git에서 사용된다고는 하지만 실제로 공부를 하는 사람은 적기 때문에 초기에 사용되기에는 미비한 점이 있다.
   - XSS 취약점이 있지만 해결하기 위한 라이브러리가 존재하긴한다.

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
|@uiw/react-md-editor           |^3.23.5        |
|axios                          |^1.4.0         |
|@emotion/react                 |^11.11.1       |
|@emotion/styled                |^11.11.0       |