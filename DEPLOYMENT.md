# 배포 현황

- 사이트: **전기전자**
- Render 작업 공간: **단아's workspace**
- 새 GitHub 저장소: https://github.com/imdanna/ee-career-guide
- 저장소 상태: 사용자 선택에 따라 공개로 전환, 원본 업로드 완료
- 배포 설정: Static Site / Build `true` / Publish `dist`
- 현재 상태: **배포 완료 · live**
- 공개 주소: https://ee-career-guide.onrender.com
- 관리 화면: https://dashboard.render.com/static/srv-dbfh0b7b9u1s73ctr3b0
- Render 서비스 ID: `srv-dbfh0b7b9u1s73ctr3b0`
- 배포 ID: `dep-dbfh0bnb9u1s73ctr540`
- 배포 원본 커밋: `dfaec20e48c4da28546e23742bdc2a0af822f59f`
- 확인일: 2026년 10월 26일

Render의 배포 상태가 live임을 확인했고, 공개 사이트에서 수정된 제목·삭제 문구·학년 필터·검색·주제별 10분 발표안 동작을 확인했습니다. 게시된 정적 파일 5개의 내용이 로컬 완성본과 일치합니다.

ChatGPT의 GitHub 플러그인과 Render의 GitHub 원본 접근 연결은 별개입니다. ChatGPT 플러그인 없이도 배포 작업을 계속할 수 있지만, Render가 원본을 가져올 방법은 필요합니다.

사용자는 소스를 공개 저장소로 바꿔 바로 Render에 배포하는 방식을 선택했습니다. 별도의 ChatGPT GitHub 플러그인은 이 배포에 사용하지 않았습니다. 기존 플러그인의 연결 해제는 수행하지 않았습니다.

Render 설정에는 자동 배포가 켜져 있습니다. 다만 공개 저장소 URL 방식의 자동 배포 여부는 Git 제공자 연결에 따라 달라집니다. 수정 후 반영이 시작되지 않으면 관리 화면에서 Deploy latest commit으로 배포합니다. [공식 안내](https://render.com/docs/deploys)

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
