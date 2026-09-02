# [기술 포트폴리오] 고형규 | Backend & DevOps Engineer

> **클라우드 네이티브 아키텍처 설계와 실제 운영 결과물의 기술적 증명**

---

## 📑 목차
1. **개인 프로젝트: 런마켓 (RunMarket) - 러닝 동행 실시간 위치 공유 서비스**
   - 서비스 소개 및 기술 스택
   - 전체 시스템 아키텍처 다이어그램
   - 핵심 엔지니어링 챌린지 1: Spring WebFlux & Reactive Redis 기반 실시간 위치 중계
   - 핵심 엔지니어링 챌린지 2: Kubernetes(K3s) & Helm Chart 기반 선언적 IaC 자동화
   - 핵심 엔지니어링 챌린지 3: k6 기반 1,000명 동시 접속 실시간 부하 테스트 (0% 에러율)
2. **실무 프로젝트 심층 분석 1: IDC → AWS MWAA 데이터 파이프라인 마이그레이션**
   - 아키텍처 전환 구조 및 Fargate vs EC2 노드그룹 벤치마크
   - CI/CD 파이프라인을 통한 250개 DAG 최적화
3. **실무 프로젝트 심층 분석 2: AWS KMS + RS256 비대칭키 기반 독립 인증 아키텍처**
   - Blast Radius 격리 구조 및 보안 토큰 서명/검증 플로우

---

## 🚀 1. 개인 프로젝트: 런마켓 (RunMarket)

> **"러너와 관전자가 실시간으로 위치와 페이스를 공유하는 러닝 동행 서비스"**
> - **서비스 URL:** [https://about.runmarket.cc](https://about.runmarket.cc)
> - **상태:** iOS App Store 출시 및 운영 중
> - **역할:** 1인 백엔드 개발 및 클라우드 인프라(IaC/K8s) 전담 구축

### 🛠 Tech Stack
- **Backend:** Java 17, Spring Boot 3, Spring WebFlux, Spring Data JPA, Spring Data Reactive Redis
- **Infra & DevOps:** Kubernetes (K3s), Helm Chart, Docker, GitHub Actions, Nginx Ingress Controller
- **Database & Cache:** PostgreSQL, Redis (Pub/Sub & Geospatial)
- **Testing & Tooling:** k6 (Performance/Load Test), Postman, Git

---

### 🏛 전체 시스템 아키텍처

```
[ iOS App Client (Runners & Spectators) ]
                  │
                  ▼ HTTPS / WSS (WebSocket)
      [ Nginx Ingress Controller ]
                  │
  ┌───────────────┴────────────────┐
  │ Kubernetes (K3s) Cluster      │
  │                                │
  │  ┌──────────────────────────┐  │
  │  │  runmarket-websocket     │  │ ◀── Spring WebFlux (Non-blocking I/O)
  │  │  (실시간 위치 중계 Pod)   │  │
  │  └────────────┬─────────────┘  │
  │               │                │
  │  ┌────────────┴─────────────┐  │
  │  │  runmarket-api (REST)    │  │ ◀── Spring Boot (User/Course API)
  │  └────────────┬─────────────┘  │
  │               │                │
  │  ┌────────────┴─────────────┐  │
  │  │  runmarket-batch         │  │ ◀── 데이터 집계 및 크롤링
  │  └────────────┬─────────────┘  │
  └───────────────┼────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
[ Redis (Pub/Sub) ]   [ PostgreSQL DB ]
 (실시간 위치 캐싱)    (영속 데이터 저장)
```

---

### 💡 엔지니어링 챌린지 및 해결 과정

#### 🎯 Challenge 1: 실시간 대규모 위치 브로드캐스팅 성능 최적화
- **문제점:** 수많은 러너와 관전자가 1초 주기로 GPS 위치를 송수신하는 구조에서, 전통적인 Spring MVC (Thread-per-request) 방식은 동시 접속자 증가 시 스레드 풀 고갈 및 심각한 컨텍스트 스위칭 오버헤드가 발생했습니다.
- **해결책:**
  1. **Spring WebFlux (Reactive Streams) 도입:** Netty 기반의 Non-blocking Event Loop 모델을 채택하여 최소한의 스레드로 수천 개의 WebSocket 커넥션을 유지하도록 전환했습니다.
  2. **Reactive Redis Pub/Sub 채널링:** 러닝 방(Room)별로 고유한 채널을 생성하고, Redis Reactive Subscriber를 통해 분산 서버 환경에서도 지연 없는 위치 메시지 브로드캐스팅을 구현했습니다.
  3. **메모리 최적화:** 실시간 위치 데이터는 Redis In-Memory에 TTL과 함께 유지하고, 러닝 종료 시점에만 PostgreSQL로 영속화하여 DB I/O 병목을 제거했습니다.

#### 🎯 Challenge 2: Kubernetes(K3s) & Helm Chart 기반 선언적 IaC 배포
- **문제점:** 멀티 모듈(API, WebSocket, Batch)로 구성된 애플리케이션의 설정(ConfigMap, Secret)과 리소스(Deployment, Service, Ingress)를 수동 관리할 경우 환경 불일치와 배포 실수가 발생할 위험이 있었습니다.
- **해결책:**
  1. **Helm Chart 템플릿화:** 공통 인프라 템플릿을 Helm Chart로 작성하고, `values-dev.yaml`, `values-prod.yaml`을 분리하여 환경별 설정을 코드화(IaC)했습니다.
  2. **롤링 업데이트 무중단 배포:** `readinessProbe`, `livenessProbe`를 정밀 구성하여 Pod 교체 중 연결 끊김 없는 배포 환경을 완성했습니다.
  3. **GitHub Actions 파이프라인:** 코드 푸시 시 Docker Multi-stage 빌드 → 이미지 레지스트리 푸시 → Helm Chart 업그레이드가 전자동으로 이어지도록 구성했습니다.

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
