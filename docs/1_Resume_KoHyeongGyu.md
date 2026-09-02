# [이력서] 고형규 | Backend & DevOps Engineer

> **1,500만 유저 대규모 트래픽 안정화와 Observability 기반의 기민한 배포·인프라를 주도하는 5년 차 엔지니어**

- **이메일:** gudrb963@gmail.com
- **GitHub:** [github.com/GHGHGHKO](https://github.com/GHGHGHKO)
- **Blog:** [pepega.tistory.com](https://pepega.tistory.com)
- **개인 프로젝트 (런마켓):** [about.runmarket.cc](https://about.runmarket.cc) | [GitHub: runmarket-pacer](https://github.com/runmarket-cc/runmarket-pacer)

---

## 📌 Summary

- **대규모 트래픽 안정화 & 클라우드 인프라 이관:** GS리테일에서 1,500만 유저 앱 '우리동네GS'와 택배 서비스의 회원 통합 전용 인증 서버 구축(월 1,200만 req 수용) 및 일 1,280만 req 규모 레거시 시스템의 AWS 클라우드 무중단 이관을 리드했습니다.
- **Observability 기반의 기민한 운영 배포:** Datadog 기반의 정밀한 모니터링 체계를 바탕으로 병목과 장애를 선제 탐지하고, 잦은 프로덕션 배포와 신속한 장애 복구 사이클을 주도했습니다.
- **컨테이너 인프라 & CI/CD 최적화:** Google Jib 기반 데몬리스 컨테이너 빌드, Docker 빌드 시간 90% 단축(20분 → 2분), MWAA 데이터 파이프라인 최적화(DAG 250개 → 170개, 클라우드 비용 30% 절감), Kubernetes(K3s)/Helm 기반 선언적 IaC 환경을 직접 설계하고 운영했습니다.

---

## 🛠 Technical Skills

| 구분 | 주요 기술 스택 |
| :--- | :--- |
| **Cloud & Infra** | AWS (EC2, EKS, RDS, S3, KMS, MWAA), Linux, Kubernetes (K3s), Docker, Helm Chart |
| **CI/CD & Container Build** | GitHub Actions, Google Jib (Daemonless Build), Dockerfile 최적화, IaC, Bash Scripting |
| **Observability** | Datadog (APM, Metrics, Log Management, Dashboard, Alerting), CloudWatch |
| **Backend & DB** | Java 17, Spring Boot 3, Spring WebFlux, Spring Batch, JPA, PostgreSQL, Redis / Valkey |
| **Data & Messaging**| Apache Airflow / AWS MWAA, WebSocket, Reactive Redis, Python |
| **Testing & Tools** | k6 부하 테스트, Git, JIRA, Confluence, Slack |

---

## 💼 Work Experience

### **GS리테일** (GS네트웍스에서 인사이동)
*백엔드 & 인프라 엔지니어 | 2022.10 – 현재 (재직 중)*

- **[우리동네GS × 택배 회원 연동 · 리드]**
  - 1,500만 다운로드 앱 '우리동네GS' 가입 시 택배 회원으로 자동 연계되는 통합 회원 체계 구축
  - RS256 + AWS KMS 기반 전용 인증 서버 분리로 기존 비회원 서비스 영향 범위 격리
  - 연동 후 월 요청량 140만 → 1,197만 건(8.5배) 안정적 수용 및 피크 에러율 0.042% 유지
- **[택배 서비스 IDC → AWS 클라우드 이관 · 리드]**
  - 서비스 13개, 일 1,280만 req(피크 82만 req/h) 규모의 레거시 시스템 AWS 클라우드 이관
  - IDC Airflow(250 DAGs) → AWS MWAA(170 DAGs) 파이프라인 재설계 및 클라우드 운영 비용 30% 절감
  - EDB 벤더 종속 쿼리 ANSI SQL 전수 표준화 및 외주 의존도 제거
- **[CRM 서비스 안정화 & 배포 파이프라인 개선]**
  - 비밀번호 변경 API의 OTP 인증 세션 검증 로직 추가로 계정 탈취 보안 취약점 원천 차단
  - Dockerfile 레이어 최적화 및 배포 아티팩트 경량화로 프론트엔드 빌드 시간 20분 → 2분(90% 단축)
  - 병목 DB 쿼리 실행시간 1초 → 200ms(80% 단축)

---

### **GS네트웍스**
*백엔드 개발자 (매니저) | 2021.08 – 2022.10*

- **[대외 제휴 배송조회 API 고가용성 구축]**
  - 네이버, 당근, 토스 등 주요 제휴사가 공유하는 배송조회 API의 Connection Timeout 병목 해소
  - DB + Redis Layered Cache 및 Retry/Recover 패턴 구현으로 Redis 장애 시 DB Fallback 보장
  - 배송 상태별 Dynamic TTL 캐싱 적용으로 외부 API 중복 호출 차단 및 응답 지연 개선

---

### **마인드패스 (공동창업)**
*공동창업자 & 엔지니어 | 2018.12 – 2021.01*

- On-Premise Linux 서버 배포 환경 구축 및 서비스 인프라 전담 운영
- GoogleNet 기반 이미지/OCR 모델 서빙 API 개발 및 정부 지원사업 5,000만 원 수혜
- Raspberry Pi 기반 센서 데이터 수집 파이프라인 개발 및 건국대학교병원 파일럿 테스트 진행

---

## 🚀 Projects & Activities

- **런마켓 (RunMarket) - 러닝 동행 실시간 위치 공유 서비스 (2025 ~ 현재)**
  - 러너와 관전자가 실시간으로 위치와 페이스를 공유하는 서비스 (iOS App Store & Google Play Store 양대 마켓 출시 운영 중)
  - Spring Boot 멀티모듈 (`web` REST API, `socket` WebFlux WebSocket, `batch` 크롤러, `core` 도메인) 백엔드 전담 구축
  - Google Jib 기반 데몬리스 OCI 컨테이너 이미지 빌드 & Kubernetes (K3s) + Helm Chart 선언적 IaC 배포 자동화
  - k6 기반 1,000명 동시 접속 1초 주기 위치 수집 시뮬레이션 부하 테스트 (에러율 0.00% 달성)
- **사내 기술 세미나: 'Rust 핵심 개념과 메모리 안전성 모델' (2024)**
  - 소유권(Ownership), 차용(Borrowing) 등 Rust의 메모리 관리 메커니즘 사내 엔지니어 공유
- **모두의연구소 코칭스터디 기술 멘토링 (2023 ~ 2025)**
  - 누적 400명+ 학습자 대상 Python 기초 및 데이터 처리 멘토링, 문제 해결 중심 코드 리뷰

---

## 🎓 Education

- **건국대학교 글로컬캠퍼스** | 컴퓨터공학과 학사 (2014.03 – 2021.02)
