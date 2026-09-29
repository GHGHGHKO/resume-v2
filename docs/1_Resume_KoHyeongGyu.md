# [이력서] 고형규 | Backend & DevOps Engineer

> **1,500만 유저 대규모 트래픽 안정화와 Observability 기반의 기민한 배포·인프라를 주도하는 5년 차 엔지니어**

- **이메일:** gudrb963@gmail.com
- **GitHub:** [github.com/GHGHGHKO](https://github.com/GHGHGHKO)
- **Portfolio:** [feelsgoodfrog.vercel.app](https://feelsgoodfrog.vercel.app)
- **개인 프로젝트 (런마켓):** [about.runmarket.cc](https://about.runmarket.cc) | [GitHub (runmarket-cc)](https://github.com/runmarket-cc)

---

## 📌 Summary

- **대규모 트래픽 안정화 & 클라우드 인프라 이관:** GS리테일에서 1,500만 유저 앱 '우리동네GS'와 택배 서비스의 회원 통합(우리동네GS 가입 시 택배 회원 연동/가입) 전용 인증 서버 구축(월 1,200만 req 수용) 및 일 1,280만 req 규모 레거시 시스템의 AWS 이관에서 배치 플랫폼과 Core API·배치 SQL 전환을 담당했습니다.
- **Observability 기반의 기민한 운영 배포:** Datadog 기반의 정밀한 모니터링 체계를 바탕으로 병목과 장애를 선제 탐지하고, 잦은 프로덕션 배포와 신속한 수정 사이클을 주도했습니다.
- **데이터 파이프라인 & 컨테이너 최적화:** 3,000만 회원 CI 암호화 및 GS SHOP Kafka 연동 파이프라인(Lag 관리), MWAA 데이터 파이프라인 최적화(DAG 250개 → 170개, 내부 운영 체계 구축), Google Jib 기반 데몬리스 컨테이너 빌드, Docker 빌드 시간 90% 단축(20분 → 2분)을 직접 주도했습니다.

---

## 🛠 Technical Skills

| 구분 | 주요 기술 스택 |
| :--- | :--- |
| **Cloud & Infra** | AWS (EC2, EKS, RDS, S3, KMS, MWAA), Linux, Kubernetes, Docker, Helm Chart |
| **CI/CD & Container Build** | GitHub Actions, Google Jib (Daemonless Build), Dockerfile 최적화, IaC, Bash Scripting |
| **Observability** | Datadog (APM, Metrics, Log Management, Dashboard, Alerting), CloudWatch |
| **Backend & DB** | Java 17, Spring Boot 3, Spring WebFlux, Spring Batch, JPA, PostgreSQL, Redis / Valkey, SQLite |
| **Data & Messaging**| Apache Kafka (Lag Management), Apache Airflow / AWS MWAA (170 DAGs), WebSocket, Python |
| **Testing & Tools** | k6 부하 테스트, Git, JIRA, Confluence, Slack |

---

## 💼 Work Experience

### **GS리테일** (GS네트웍스에서 인사이동)
*소속: 통합서비스팀 | 직책: 백엔드 | 2022.10 – 현재 (재직 중)*

- **[우리동네GS × 택배 회원 연동 · 리드]**
  - 1,500만 유저 앱 '우리동네GS' 가입 시 택배 시스템 회원 여부에 따라 연동/가입을 처리하는 회원 통합 체계 구축
  - RS256 + AWS KMS 기반 전용 인증 서버 분리 구축으로 기존 서비스 영향 최소화
  - session cluster 기반의 레거시 홈페이지 인입 계층에 Interceptor를 구성하여 JWT 검증 및 내부 회원 세션 연계 생성
  - 연동 후 월 요청량 140만 → 1,197만 건(8.5배) 안정적 수용 및 피크 에러율 0.042% 유지
- **[택배 서비스 IDC → AWS 배치 플랫폼 이관 및 운영 내재화]**
  - **기간:** 2023.01부터 사전 분석·쿼리 수정 / 본 프로젝트 2023.06–2024.03 / 안정화 2024.04까지
  - **팀·본인 기여:** 내부 3명·외주 3명 중 Airflow 아키텍처 설계·이관, 배포 자동화, DAG 정비, Core API·배치 SQL 전환 및 외주 온보딩 담당
  - **문제·역할:** 외주 의존으로 변경·유지보수가 어려웠던 배치 환경의 MWAA·EKS 이관 및 내부 운영 체계 구축 담당.
  - **단계적 전환:** 동일 이미지를 IDC·AWS에 배포해 IDC에서 검증하고, 실행 Pod 종료를 확인한 뒤 DAG를 순차 전환. IDC 복귀 절차 마련.
  - **실행 환경 선정:** 5분 주기 배치의 처리 지연을 줄이기 위해 Fargate·EC2 PoC 수행. 준비 시간 약 200초 → 80초인 EC2 선택.
  - **DAG 정비:** 미사용 DAG 제거 및 저처리량 제휴사 20곳의 전송 작업을 병렬 Flow로 통합하여 DAG 250개 → 170개로 축소.
  - **자동 복구:** 기존 실패 지점 재개 구조에 자동 재시도·SNS 알림을 적용. 수동 대응 주 약 3–4건 → 월 약 1–2건 (정확한 집계가 아닌 운영 경험에 따른 추정치).
  - **DB 전환:** Core API·배치의 PPAS 호환 쿼리를 ANSI SQL로 변경하고, 단방향 동기화 테이블 대신 원본 테이블을 직접 조회하도록 전환.
- **[CRM CI 암호화 & 서비스 안정화 · 진행 중]**
  - 3,000만 회원 평문 CI 암호화 전환: API 및 배치 쿼리 변경 후 암호화 컬럼에 안전하게 적재
  - CRM DB와 연동된 GS SHOP에 Kafka 기반 개인정보 실시간 동기화 파이프라인 구축 및 Consumer Lag 관리
  - 비밀번호 변경 API의 OTP 인증 세션 검증 및 인가(Authorization) 검증 누락 보안 취약점 해결로 계정 탈취 원천 차단
  - 쿼리 80% 개선(1s → 200ms) 및 Dockerfile 수정으로 빌드 시간 20분 → 2분(90% 단축)

---

### **GS네트웍스**
*소속: 시스템파트 | 직책: 백엔드 | 2021.08 – 2022.10*

- **[배송조회 API 고가용성 구축]**
  - 네이버, 당근, 토스 등 제휴사가 공유하는 배송조회 API의 Connection Timeout 병목 해소
  - 캐시 레이어(Redis + DB) 및 Fallback 패턴 구현으로 Redis 장애 시 무중단 DB Fallback 보장
  - 배송조회 및 토큰 발급에 단일 TTL 캐시를 적용하여 외부 API 중복 호출 차단 및 응답 지연 개선

---

### **마인드패스 (공동창업)**
*직책: 공동창업자 | 2018.12 – 2021.01*

- On-Premise Linux 서버 배포 환경 구축 및 서비스 인프라 전담 운영
- GoogleNet 기반 이미지/OCR 모델 서빙 API 개발 및 정부 지원사업 5,000만 원 수혜
- Raspberry Pi 기반 센서 데이터 수집 파이프라인 개발 및 건국대학교병원 파일럿 테스트 진행

---

## 🚀 Projects & Activities

- **런마켓 (RunMarket) - 러닝 동행 실시간 위치 공유 서비스 (2025 ~ 현재)**
  - 러너와 관전자가 실시간으로 위치와 페이스를 공유하는 서비스 (iOS App Store & Google Play Store 양대 마켓 정식 출시 운영 중)
  - Spring Boot 멀티모듈 (`web` REST API, `socket` WebFlux WebSocket, `batch` 크롤러, `core` 도메인) 백엔드 전담 구축
  - Google Jib 기반 데몬리스 컨테이너 이미지 빌드 & Kubernetes + Helm Chart 선언적 IaC 배포 자동화
  - k6 기반 1,000명 동시 접속 1초 주기 위치 수집 시뮬레이션 부하 테스트 (에러율 0.00% 달성)
  - 서비스 소개: [about.runmarket.cc](https://about.runmarket.cc) | GitHub: [github.com/runmarket-cc](https://github.com/runmarket-cc)
- **사내 기술 세미나: 'Rust 핵심 개념과 메모리 안전성 모델' (2024)**
  - 소유권(Ownership), 차용(Borrowing) 등 Rust의 메모리 관리 메커니즘 사내 엔지니어 공유
- **모두의연구소 코칭스터디 기술 멘토링 (2023 ~ 2025)**
  - 누적 400명+ 학습자 대상 Python 기초 및 데이터 처리 멘토링, 문제 해결 중심 코드 리뷰

---

## 🎓 Education

- **건국대학교 글로컬캠퍼스** | 컴퓨터공학과 학사 (2014.03 – 2021.02)
