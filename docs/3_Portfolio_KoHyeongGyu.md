# [기술 포트폴리오] 고형규 | Backend & DevOps Engineer

> **클라우드 네이티브 아키텍처 설계와 실제 운영 결과물의 기술적 증명**

---

## 📑 목차
1. **개인 프로젝트: 런마켓 (RunMarket) - 러닝 동행 실시간 위치 공유 서비스**
   - 서비스 소개 및 운영 현황 (iOS & Android 정식 출시)
   - RunMarket 멀티모듈 백엔드 생태계 및 아키텍처 (`runmarket-pacer`)
   - 핵심 엔지니어링 챌린지 1: Spring WebFlux & Reactive Redis 기반 실시간 위치 중계 (`pulse.runmarket.cc`)
   - 핵심 엔지니어링 챌린지 2: Google Jib 기반 데몬리스 컨테이너 빌드 & Kubernetes (K3s) + Helm Chart IaC 자동화
   - 핵심 엔지니어링 챌린지 3: k6 기반 1,000명 동시 접속 실시간 부하 테스트 (에러율 0.00% 달성)
2. **실무 프로젝트 심층 분석 1: IDC → AWS MWAA 데이터 파이프라인 마이그레이션 (GS리테일)**
   - 아키텍처 전환 구조 및 Fargate vs EC2 노드그룹 벤치마크 (비용 30% 절감)
   - GitHub Actions CI/CD 파이프라인을 통한 250개 DAG 통폐합 및 안정화
3. **실무 프로젝트 심층 분석 2: AWS KMS + RS256 비대칭키 기반 독립 인증 아키텍처 (GS리테일)**
   - Blast Radius 격리 구조 및 보안 토큰 서명/검증 플로우

---

## 🚀 1. 개인 프로젝트: 런마켓 (RunMarket)

> **"러너와 관전자가 실시간으로 위치와 페이스를 공유하는 러닝 동행 서비스"**
> - **서비스 URL:** [https://about.runmarket.cc](https://about.runmarket.cc)
> - **GitHub Repository:** [https://github.com/runmarket-cc/runmarket-pacer](https://github.com/runmarket-cc/runmarket-pacer)
> - **운영 현황:** iOS App Store & Google Play Store 양대 마켓 정식 출시 및 서비스 운영 중 (Bundle ID: `cc.runmarket.app`)
> - **담당 역할:** 1인 백엔드 아키텍처 설계, Spring Boot 멀티모듈 개발, Google Jib 컨테이너화, Kubernetes(K3s) & Helm Chart 기반 IaC 인프라 전담 구축

### 🛠 Tech Stack
- **Backend:** Java 17, Spring Boot 3, Spring WebFlux, Spring MVC, Spring Batch, Spring Data JPA, Spring Data Reactive Redis
- **Infra & DevOps:** Kubernetes (K3s), Helm Charts (`helm/runmarket`), Google Jib (Daemonless Container Build), GitHub Actions, Nginx Ingress Controller
- **Database & Cache:** PostgreSQL, Redis (Pub/Sub & Geospatial)
- **Testing & Tooling:** k6 (WebSocket Load Testing), Postman, Git

---

### 🏛 전체 시스템 및 멀티모듈 아키텍처 (`runmarket-pacer`)

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
│                Kubernetes (K3s) Cluster (IaC / Helm)                    │
│                                                                         │
│  ├── [web]     : Spring MVC REST API (인증, 유저/코스/기록)              │
│  ├── [socket]  : Spring WebFlux + Reactive Redis 실시간 위치 중계        │
│  ├── [batch]   : Spring Batch + Jsoup 마라톤/대회 데이터 웹 크롤러      │
│  └── [core]    : application, domain, infrastructure, event-bus         │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                       ┌─────────┴─────────┐
                       ▼                   ▼
               [ Redis (Pub/Sub) ]   [ PostgreSQL DB ]
                (실시간 위치 캐싱)    (영속 데이터 저장)
```

---

### 💡 핵심 엔지니어링 챌린지 및 해결 과정

#### 🎯 Challenge 1: Spring WebFlux & Reactive Redis 기반 실시간 위치 중계 (`socket` 모듈)
- **문제점:** 수많은 러너와 관전자가 1초 주기로 실시간 GPS 위치를 송수신하는 구조에서, 전통적인 Spring MVC (Thread-per-request) 방식은 동시 접속자 증가 시 스레드 풀 고갈 및 심각한 컨텍스트 스위칭 오버헤드가 발생했습니다.
- **해결책:**
  1. **Spring WebFlux (Non-blocking I/O) 채택:** Netty 기반의 이벤트 루프 모델을 통해 최소한의 스레드로 수천 개의 동시 WebSocket 세션을 안정적으로 처리하도록 분리 구축했습니다 (`pulse.runmarket.cc`).
  2. **Reactive Redis Pub/Sub 채널링:** 러닝 방(Room)별 고유 토픽을 구독(Sub) 및 발행(Pub)하여 분산 인스턴스 간 지연 없는 위치 메시지 브로드캐스팅을 구현했습니다.
  3. **메모리 계층화:** 실시간 위치 데이터는 Redis In-Memory에 TTL과 함께 유지하고, 러닝 종료 시점에만 PostgreSQL로 비동기 영속화하여 DB I/O 병목을 제거했습니다.

#### 🎯 Challenge 2: Google Jib 기반 데몬리스 컨테이너 빌드 & Helm Chart 선언적 IaC 자동화
- **문제점:** 멀티 모듈(API, WebSocket, Batch) 애플리케이션의 컨테이너 빌드 시 호스트에 Docker 데몬이 종속되어 CI 환경이 무거워지고, 수동 리소스 관리 시 환경 불일치 및 배포 실수가 발생할 수 있었습니다.
- **해결책:**
  1. **Google Jib 빌드 파이프라인 도입:** Docker 데몬 및 Dockerfile 작성 없이 Gradle 빌드 과정에서 OCI 표준 컨테이너 이미지를 레이어별로 최적화하여 빌드(`gudrb963/runmarket-pacer`, `gudrb963/runmarket-pacer-socket`). 레이어 캐싱을 통해 빌드 및 푸시 속도를 극대화했습니다.
  2. **Helm Chart 템플릿화 (`helm/runmarket`):** Deployment, Service, Ingress, ConfigMap, Secret을 Helm Chart로 표준화하고, `values.yaml`을 통해 환경 설정을 코드화(IaC)했습니다.
  3. **무중단 롤링 업데이트:** `readinessProbe`와 `livenessProbe`를 정밀하게 구성하여 Pod 교체 중 WebSocket 세션 끊김 없는 무중단 배포를 완성했습니다.

#### 🎯 Challenge 3: k6 기반 1,000명 동시 접속 실시간 부하 테스트
- **목표:** 동시 러너 1,000명이 1초 주기로 위치 데이터를 전송하고, 관전자가 실시간으로 수신하는 피크 시나리오 검증
- **테스트 환경:** k6 분산 스크립트 작성 (WebSocket VUs 시뮬레이션)
- **테스트 결과:**
  - **동시 접속자:** 1,000 VU (Virtual Users)
  - **요청 주기:** 1초 간격 실시간 좌표 전송
  - **결과 지표:** **에러율 0.00% 달성**, WebSocket 메시지 왕복 지연시간(RTT) **평균 38ms (p95: 62ms)** 달성

---

## 🏛 2. 실무 프로젝트 심층 분석 1: IDC → AWS MWAA 데이터 파이프라인 마이그레이션

### 📊 아키텍처 전환 전/후 비교

```
[ AS-IS : IDC On-Premise ]
  Airflow Master (IDC Server) ──▶ Static Worker Nodes ──▶ EDB (종속 문법 SQL)
  * 문제점: 외주 구축 DAG 250개 방치, 잦은 스케줄 지연, 하드웨어 증설 한계

[ TO-BE : AWS Cloud Native ]
  GitHub Repo ──(Actions)──▶ S3 (DAGs) ──▶ AWS MWAA (Managed Airflow)
                                              │
                                              ▼ KubernetesPodOperator
                                         EC2 NodeGroup (Fast Startup)
                                              │
                                              ▼
                                         PostgreSQL RDS (ANSI SQL)
```

### 🔬 기술적 의사결정: Fargate vs EC2 노드그룹 벤치마크
- **검토 배경:** MWAA의 `KubernetesPodOperator` 실행 환경으로 서버리스인 AWS Fargate와 EC2 노드그룹을 비교 검증했습니다.
- **벤치마크 결과:**
  - **AWS Fargate:** 신규 Pod 프로비저닝 시간(약 45~90초) + Java 런타임 기동 시간으로 인해 짧은 주기의 배치 실행 시 심각한 큐 적체 발생
  - **EC2 Warm NodeGroup:** 노드 사전 프로비저닝 및 Docker 캐싱 활용으로 **Pod 기동 시간 3초 이내 보장**
- **결정:** EC2 기반 관리형 노드그룹을 채택하고 스팟 인스턴스 정책을 혼합하여 **기동 속도 확보와 비용 30% 절감**을 동시에 달성했습니다.

---

## 🔒 3. 실무 프로젝트 심층 분석 2: AWS KMS + RS256 기반 독립 인증/인가 아키텍처

### 🛡 Blast Radius 격리 & 비대칭키 검증 워크플로우

```
[ 우리동네GS App (1,500만 유저) ]
            │ (1) 앱 로그인 요청
            ▼
┌───────────────────────────────────────────────┐
│ [NEW] 전용 인증/인가 서버 (AWS EKS)           │
│  - AWS KMS 비대칭 키(RS256)로 JWT 서명         │
│  - Public JWKS 엔드포인트 호스팅 (/certs)     │
└───────────────────────┬───────────────────────┘
                        │ (2) 발행된 JWT 토큰
                        ▼
┌───────────────────────────────────────────────┐
│ [택배 서비스 게이트웨이 / Interceptor 계층]   │
│  - JWKS 캐시를 통한 로컬 공개키 서명 검증     │
│  - 내부 회원 식별 및 세션 바인딩               │
└───────────────────────┬───────────────────────┘
                        │
         ┌──────────────┴──────────────┐
         ▼                             ▼
[ 통합 회원 비즈니스 로직 ]     [ 기존 비회원 서비스 ]
(Zero Blast Radius - 비회원 서비스 영향도 원천 차단)
```

### 💡 엔지니어링 핵심 성과
- **보안성:** Secret Key 노출 위험이 있는 대칭키(HS256)를 배제하고 AWS KMS 하드웨어 보안 모듈(HSM) 기반 RS256 비대칭키 서명 체계 확립
- **가용성 & 안정성:** 월 요청량 8.5배 급증(140만 → 1,197만 건) 상황에서도 피크 에러율 0.042% 유지
