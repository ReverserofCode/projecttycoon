/** 카카오 로그인 페이지 불러오기
 */
export const KakaoLogin = () => {
  /**
   * RESTAPIKEY = 로그인 활성화가 가능한 키
   * -> 이후 설정후 확인이 불가하도록 변경 필요
   */
  const RESTAPIKEY = "777cadaafac1cb2cb8aa5dc765cde3f4";
  /** REDIRECTURI = 로그인 이후 연결될 페이지
   * -> 이후 수정해서 Profile 페이지로 넘어가게 할것 (확인용도) & 데이터 및 토큰을 서버로 전송
   */
  const REDIRECTURI = `http://projecttycoon.com/auth/kakao`;
  const KAKAOLOGIN = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${RESTAPIKEY}&redirect_uri=${REDIRECTURI}`;
  window.location.href = KAKAOLOGIN;
};
