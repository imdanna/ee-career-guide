# 배포 현황

- 사이트: **전기전자**
- Render 작업 공간: **단아's workspace**
- 새 GitHub 저장소: https://github.com/imdanna/ee-career-guide
- 저장소 상태: 비공개, 원본 업로드 완료
- 배포 설정: Static Site / Build `true` / Publish `dist`
- 현재 상태: Render의 새 비공개 저장소 접근 권한 확인 대기

Render 서비스 생성 요청은 저장소를 읽지 못해 거절됐으며, 새 서비스가 생성되지 않았음을 목록에서 확인했습니다. 배포 성공이나 공개 주소를 아직 확인하지 않았습니다.

ChatGPT의 GitHub 플러그인과 Render의 GitHub 원본 접근 연결은 별개입니다. ChatGPT 플러그인 없이도 배포 작업을 계속할 수 있지만, Render가 원본을 가져올 방법은 필요합니다.

비공개 저장소를 유지하려면 [Render GitHub 앱 설정](https://github.com/apps/render/installations/new)의 Repository access에 `ee-career-guide`를 추가합니다. [공식 안내](https://render.com/docs/git-provider)

원본을 공개 저장소로 바꾸는 방법은 사용자 선택 후에만 적용합니다.

## 확인한 동작

- 기본 고1 주제 6개, 전체 학년 18개 표시
- 산업·학년·검색의 조합, 영문 대소문자와 앞뒤 공백 처리
- 한국어 검색, 빈 결과 안내와 전체 보기 복구
- 추천 질문에서 상세 주제로 이동
- 주제 선택에 따른 5단계 10분 발표안 갱신
- 키보드 Enter로 상세 내용 펼치기
- 1280px 및 390px 화면에서 확인, 모바일 가로 넘침 없음
- 브라우저 경고·오류 없음
- 내용·출처 연결 자동 검증 통과
- Render 공식 JSON Schema 검증 통과

인쇄용 스타일은 포함했으며 실제 프린터 출력은 수행하지 않았습니다. Render CLI는 설치되어 있지 않아 CLI 검증은 수행하지 않았습니다.
