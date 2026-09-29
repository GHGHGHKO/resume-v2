# [기술 포트폴리오] 고형규 | Backend & DevOps Engineer

> **클라우드 네이티브 아키텍처 설계와 실제 운영 결과물의 기술적 증명**

- **이메일:** gudrb963@gmail.com
- **GitHub:** [github.com/GHGHGHKO](https://github.com/GHGHGHKO)
- **Portfolio:** [feelsgoodfrog.vercel.app](https://feelsgoodfrog.vercel.app)
- **개인 프로젝트 (런마켓):** [about.runmarket.cc](https://about.runmarket.cc) | [GitHub (runmarket-cc)](https://github.com/runmarket-cc)

---

## 📑 목차
1. **개인 프로젝트: 런마켓 (RunMarket) - 러닝 동행 실시간 위치 공유 서비스**
   - 서비스 소개 및 운영 현황 (iOS & Android 정식 출시)
   - RunMarket 멀티모듈 백엔드 생태계 및 아키텍처
   - 핵심 엔지니어링 챌린지 1: Spring WebFlux & Reactive Redis 기반 실시간 위치 중계 (`pulse.runmarket.cc`)
   - 핵심 엔지니어링 챌린지 2: Google Jib 기반 데몬리스 컨테이너 빌드 & Kubernetes + Helm Chart 선언적 IaC 자동화
   - 핵심 엔지니어링 챌린지 3: k6 기반 1,000명 동시 접속 실시간 부하 테스트 (에러율 0.00% 달성)
2. **실무 프로젝트 심층 분석 1: IDC → AWS MWAA 데이터 파이프라인 마이그레이션 (GS리테일)**
   - 단계적 이관·복귀 전략과 Fargate vs EC2 PoC (준비 시간 약 200초 → 80초)
   - DAG 250개 → 170개 정비, 자동 복구, 긴급 수정 판단 및 회고
3. **실무 프로젝트 심층 분석 2: AWS KMS + RS256 비대칭키 기반 독립 인증 아키텍처 (GS리테일)**
   - 비회원 서비스 영향 격리 구조 및 보안 토큰 서명/검증 플로우

---

## 🚀 1. 개인 프로젝트: 런마켓 (RunMarket)

> **"러너와 관전자가 실시간으로 위치와 페이스를 공유하는 러닝 동행 서비스"**
> - **서비스 URL:** [https://about.runmarket.cc](https://about.runmarket.cc)
> - **GitHub Organization:** [https://github.com/runmarket-cc](https://github.com/runmarket-cc)
> - **운영 현황:** iOS App Store & Google Play Store 양대 마켓 정식 출시 및 서비스 운영 중 (Bundle ID: `cc.runmarket.app`)
> - **담당 역할:** 1인 백엔드 아키텍처 설계, Spring Boot 멀티모듈 개발, Google Jib 컨테이너화, Kubernetes & Helm Chart 기반 IaC 인프라 전담 구축

### 🛠 Tech Stack
- **Backend:** Java 17, Spring Boot 3, Spring WebFlux, Spring MVC, Spring Batch, Spring Data JPA, Spring Data Reactive Redis
- **Infra & DevOps:** Kubernetes, Helm Charts (`helm/runmarket`), Google Jib (Daemonless Container Build), GitHub Actions, Nginx Ingress Controller
- **Database & Cache:** PostgreSQL, SQLite, Redis (Pub/Sub & Geospatial)
- **Testing & Tooling:** k6 (WebSocket Load Testing), Postman, Git

---

### 🏛 전체 시스템 및 멀티모듈 백엔드 아키텍처

```
                  ┌─────────────────────────────────┐
                  │   runmarket-front (Web Frontend) │
                  │      https://runmarket.cc       │
                  └────────────────┬────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    runmarket-app (iOS & Android App)                    │
│                        Bundle ID: cc.runmarket.app                      │
└──────────────┬──────────────────────────────────┬───────────────────────┘
               │                                  │
      HTTP REST│ (Bearer JWT)                     │ WebSocket Stream (WSS)
  api.runmarket.cc                                │ pulse.runmarket.cc
               ▼                                  ▼
      [ Nginx Ingress ]                  [ Nginx Ingress ]
               │                                  │
┌──────────────┴──────────────────────────────────┴───────────────────────┐
│                Kubernetes Cluster (IaC / Helm)                          │
│                                                                         │
│  ├── [web]     : Spring MVC REST API (인증, 유저/코스/기록)              │
│  ├── [socket]  : Spring WebFlux + Reactive Redis 실시간 위치 중계        │
│  ├── [batch]   : Spring Batch + Jsoup 마라톤/대회 데이터 웹 크롤러      │
│  └── [core]    : application, domain, infrastructure, event-bus         │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                 ┌───────────────┼───────────────┐
                 ▼               ▼               ▼
         [ Redis Pub/Sub ]   [ SQLite ]   [ PostgreSQL DB ]
         (실시간 중계/브로드캐스트) (실시간 위치)  (영속 데이터 저장)
```

---

### 💡 핵심 엔지니어링 챌린지 및 해결 과정

#### 🎯 Challenge 1: Spring WebFlux & Reactive Redis 기반 실시간 위치 중계 (`socket` 모듈)
- **문제점:** 수많은 러너와 관전자가 1초 주기로 실시간 GPS 위치를 송수신하는 구조에서, 전통적인 Spring MVC (Thread-per-request) 방식은 동시 접속자 증가 시 스레드 풀 고갈 및 컨텍스트 스위칭 오버헤드가 발생했습니다.
- **해결책:**
  1. **Spring WebFlux (Non-blocking I/O) 채택:** Netty 기반의 이벤트 루프 모델을 통해 최소한의 스레드로 수천 개의 동시 WebSocket 세션을 처리하도록 전용 WebSocket 서비스(`pulse.runmarket.cc`)로 분리 구축했습니다.
  2. **Reactive Redis Pub/Sub 채널링:** 러닝 방(Room)별 고유 토픽을 구독(Sub) 및 발행(Pub)하여 분산 인스턴스 간 지연 없는 위치 메시지 브로드캐스팅을 구현했습니다.
  3. **실시간 위치 데이터 관리:** 실시간 위치는 SQLite에 저장/관리하고, 러닝 종료 시점에 PostgreSQL로 영속화하여 안정적인 데이터 파이프라인을 구축했습니다.

#### 🎯 Challenge 2: Google Jib 기반 데몬리스 컨테이너 빌드 & Helm Chart 선언적 IaC 자동화
- **문제점:** 멀티 모듈(API, WebSocket, Batch) 애플리케이션의 컨테이너 빌드 시 호스트에 Docker 데몬이 종속되어 CI 환경이 무거워지고, 수동 리소스 관리 시 환경 불일치 및 배포 실수가 발생할 수 있었습니다.
- **해결책:**
  1. **Google Jib 빌드 파이프라인 도입:** Docker 데몬 및 Dockerfile 작성 없이 Gradle 빌드 과정에서 OCI 표준 컨테이너 이미지를 레이어별로 최적화하여 빌드. 레이어 캐싱을 통해 빌드 및 배포 속도를 높였습니다.
  2. **Helm Chart 템플릿화 (`helm/runmarket`):** Deployment, Service, Ingress, ConfigMap, Secret을 Helm Chart로 표준화하고, `values.yaml`을 통해 환경 설정을 코드화(IaC)했습니다.
  3. **무중단 롤링 업데이트:** `readinessProbe`와 `livenessProbe`를 구성하여 Pod 교체 중 WebSocket 세션 끊김 없는 무중단 배포를 달성했습니다.

#### 🎯 Challenge 3: k6 기반 1,000명 동시 접속 실시간 부하 테스트
- **목표:** 동시 러너 1,000명이 1초 주기로 위치 데이터를 전송하고, 관전자가 실시간으로 수신하는 피크 시나리오 검증
- **테스트 환경:** k6 분산 스크립트 작성 (WebSocket VUs 시뮬레이션)
- **테스트 결과:**
  - **동시 접속자:** 1,000 VU (Virtual Users)
  - **요청 주기:** 1초 간격 실시간 좌표 전송
  - **결과 지표:** **에러율 0.00% 달성**, WebSocket 메시지 왕복 지연시간(RTT) **평균 38ms (p95: 62ms)** 달성

---

## 🏛 2. 실무 프로젝트 심층 분석 1: IDC → AWS 배치 플랫폼 이관 및 운영 내재화

### 문제 정의와 본인 기여

이전 IDC 간 이관·차세대 프로젝트에서 외주가 개발한 코드는 내부에서 수정하기 어려웠고 실제 변경 후 오류도 발생했다. IDC 모니터링·유지보수 인력이 부족한 상황에서 회사 주도로 내부 인력 중심의 AWS 이관을 진행했다.

기간: 2023.01부터 사전 분석·쿼리 수정 / 본 프로젝트 2023.06–2024.03 / 안정화 2024.04까지. 팀·본인 기여: 내부 3명·외주 3명 중 Airflow 아키텍처 설계·이관, 배포 자동화, DAG 정비, Core API·배치 SQL 전환 및 외주 온보딩 담당. 필요한 외부 인력은 약 2–3개월 활용했다.

내부 인력은 AWS 아키텍처·이관 절차·테스트 및 업무 영향이 큰 Core API·POS 쿼리를 담당했다. 본인은 Core API·배치를 수정했다. 외주 2명은 업무 영향이 적은 쿼리, 택배기 담당 1명은 택배기 쿼리를 변경했다. Git flow·쿼리 변경·운영 배포 가이드를 제공했고 성능 문제는 DBA에게 검토를 요청했다.

### 동일 이미지 검증과 순차 이관

IDC 데이터가 AWS로 실시간 동기화되는 환경을 활용했다. 변경 전후 쿼리를 양쪽 DB에서 실행해 결과를 비교하고, Spring Batch 이미지를 양쪽 레지스트리에 배포해 IDC에서 정상 동작을 확인했다.

IDC DAG를 중지하고 실행 중인 Job Pod의 종료를 사람이 확인한 후 AWS DAG를 실행했다. AWS에서 문제가 생기면 DAG를 중지하고 동일 이미지를 사용하는 IDC DAG로 복귀할 수 있도록 했다. DAG 250개를 개별 이관·테스트했다.

### Fargate·EC2 선택 및 배포 자동화

MWAA의 KubernetesPodOperator가 EKS에 Pod를 생성해 Spring Batch를 실행하는 구조다. 5분 주기 배치에서 Fargate 준비 시간 약 200초가 주기의 약 67%를 차지해 업무 처리가 늦어졌다. PoC 후 약 80초인 EC2를 선택해 준비 시간을 약 60% 단축했다. 이는 전체 Job 실행 시간의 감소율과는 구분된다.

DAG 커밋 시 CI/CD를 실행해 S3 Sync로 코드를 업로드하고, Airflow Variables API로 이미지 버전을 갱신했다. KubernetesPodOperator가 해당 버전을 참조하도록 구성했다.

### DAG 250개 → 170개: 제휴사 작업 통합

미사용·업무 종료 DAG를 제거하고, 처리량이 적은 제휴사 20곳의 택배 상태 전송 작업을 하나의 Job 내 제휴사별 Flow로 병렬 실행하도록 통합했다. 전체 DAG는 250개에서 170개로 줄었다.

일부 Flow가 실패해도 다른 Flow는 완료할 수 있었다. 전체 Job 재실행 시 이미 전송한 제휴사는 조회 결과에 전달 대상이 없어 다시 전송하지 않았다. 다만 일부 Flow 실패도 전체 Job 실패로 표시됐으며, 실패한 제휴사를 파악하려면 로그를 확인해야 했다.

### 집하지시 배치 복구와 관측성

고객 데이터 수정과 집하지시가 동시에 실행되면 테이블 락으로 배치가 실패해 수동 재실행이 필요했다. 집하지시 배치가 완료돼야 택배 수거 요청이 전달됐다.

기존 트랜잭션 분리·실패 지점 재개 구조를 활용해 실패한 Pod의 Job 전체를 즉시 최대 3회 재시도하고, 재시도 소진 시 AWS SNS로 알림을 받도록 했다. 재시도는 락 자체의 원인 제거와 구분된다.

운영 결과: 수동 대응 주 약 3–4건 → 월 약 1–2건 (정확한 집계가 아닌 운영 경험에 따른 추정치). 재시도 횟수·간격을 정한 별도의 최적화 근거는 없었으며, 정확한 집계 기간은 확보되지 않았다.

### DB 통합 및 조회 구조 개선

서로 다른 테이블 구조를 가진 두 PPAS DB를 Aurora PostgreSQL로 통합하고 스키마로 구분했다. 단방향 동기화 테이블을 제거하고 정규화가 잘된 쪽의 원본 테이블을 직접 조회하도록 Core API·배치 쿼리를 수정했다. PPAS 호환 쿼리를 ANSI SQL로 전환했다.

양방향 데이터 흐름과 DB 락은 인터뷰 시점에도 점진적으로 개선 중이다. DB 통합이나 재시도로 락이 완전히 해결된 것은 아니다.

### 예상 밖 오류와 긴급 수정 판단

사전 분석·변경에서 누락된 PPAS 호환 쿼리가 AWS 전환 후 문법 오류를 일으켰다. 오류 범위가 작고 원인이 명확하며 ANSI SQL로 빠르게 수정할 수 있어, 롤백 대신 긴급 수정·테스트 후 운영 배포했다. 실제로 롤백이 필요할 정도의 심각한 오류는 발생하지 않았다.

양쪽 DB의 쿼리 실행 결과를 비교했어도 누락된 실행 경로까지 모두 검증하지는 못했다. 복귀 절차를 마련하는 것과 검증 범위를 충분히 확보하는 것은 별개의 과제였다.

### 회고: 짧은 주기 배치의 이벤트 기반 전환

다시 진행한다면 짧은 주기 배치 중 메시징으로 처리 가능한 작업을 선별해 이벤트 기반 처리로 전환하고 싶다. 짧은 주기 작업에서 오류가 종종 발생했던 운영 경험에 따른 개선 방향이며, 이번 프로젝트에서 구현한 성과는 아니다.

---

## 🔒 3. 실무 프로젝트 심층 분석 2: AWS KMS + RS256 기반 독립 인증/인가 아키텍처

### 🛡 기존 서비스 영향 격리 & 비대칭키 검증 워크플로우

```
[ 우리동네GS App (1,500만 유저) ]
            │ (1) 앱 로그인 요청
            ▼
┌───────────────────────────────────────────────┐
│ [NEW] 전용 인증/인가 서버 (AWS EKS)           │
│  - AWS KMS 비대칭 키(RS256)로 JWT 서명         │
│  - Public JWKS 엔드포인트 호스팅              │
└───────────────────────┬───────────────────────┘
                        │ (2) 발행된 JWT 토큰
                        ▼
┌───────────────────────────────────────────────┐
│ [택배 서비스 게이트웨이 / Interceptor 계층]   │
│  - JWKS 캐시를 통한 로컬 공개키 서명 검증     │
│  - session cluster 기반 내부 회원 세션 연계    │
└───────────────────────┬───────────────────────┘
                        │
         ┌──────────────┴──────────────┐
         ▼                             ▼
[ 통합 회원 비즈니스 로직 ]     [ 기존 비회원 서비스 ]
(단일 DB 환경 내 독립 마이크로서비스 구축으로 기존 서비스 영향 최소화)
```

### 💡 엔지니어링 핵심 성과
- **보안성 확보:** AWS KMS 기반 RS256 비대칭키 서명 체계를 통해 외부 시스템에 안전한 공개키(JWKS) 제공 및 payload 서명 검증 체계 구현
- **가용성 & 안정성:** 월 요청량 8.5배 급증(140만 → 1,197만 건) 상황에서도 피크 에러율 0.042% 유지
