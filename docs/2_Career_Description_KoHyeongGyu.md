# [경력기술서] 고형규 | Work Experience Detail

> **5년 차 백엔드 & DevOps 엔지니어 | Java · Spring Boot · AWS · Kubernetes**

- **이메일:** gudrb963@gmail.com
- **GitHub:** [github.com/GHGHGHKO](https://github.com/GHGHGHKO)
- **Portfolio:** [feelsgoodfrog.vercel.app](https://feelsgoodfrog.vercel.app)
- **개인 프로젝트 (런마켓):** [about.runmarket.cc](https://about.runmarket.cc) | [GitHub (runmarket-cc)](https://github.com/runmarket-cc)

---

## 1. GS리테일 (2022.10 – 현재)

- **소속:** 통합서비스팀
- **직책:** 백엔드
- **주요 업무:** 대규모 트래픽 백엔드 서비스 개발, 전용 인증 서버 구축, 클라우드 인프라(AWS) 이관 및 데이터 파이프라인 최적화

---

### [프로젝트 1] 택배 서비스 IDC → AWS 클라우드 이관 및 MWAA 최적화
- **기간:** 2023.01 – 2023.10 (10개월)
- **기술 스택:** AWS (EKS, MWAA, EC2, RDS), Apache Airflow, PostgreSQL, Docker, GitHub Actions, ANSI SQL
- **규모:** 13개 마이크로서비스, 이기종 DB 2개, 일 평균 1,280만 req(피크 82만 req/h), Airflow 250 DAGs

#### 1. 문제 배경 (Problem)
IDC 기반 레거시 시스템을 AWS로 전환해야 했으나, EDB 벤더 종속 SQL 문법으로 인해 AWS DMS 자동 마이그레이션이 불가능했습니다. 또한 외주 개발사에서 구축한 250여 개의 Airflow DAG 중 미사용/중복 코드가 산재하여 IDC 환경에서 잦은 배치 지연이 발생했습니다.

#### 2. 분석 및 기술 검토 (Analyze)
- **DB 마이그레이션:** EDB 전용 문법을 표준 ANSI SQL로 전환하여 PostgreSQL RDS 호환성을 확보해야 했습니다.
- **워커 노드 지연:** KubernetesPodOperator 실행 환경으로 Fargate 검토 시, Java 콜드스타트 및 프로비저닝 지연(수 분)으로 인해 배치가 지연되는 현상이 확인되었습니다.
- **운영 복잡도:** 외주 의존도를 제거하고 사내 엔지니어링 직접 운영 체계 확립이 시급했습니다.

#### 3. 해결 과정 및 실행 (Action)
- **EDB 종속 쿼리 ANSI SQL 전수 표준화:** 13개 서비스의 EDB SQL을 PostgreSQL 호환 ANSI SQL로 전수 변환 및 검증을 완료했습니다.
- **AWS MWAA 직접 구축 및 워커 최적화:** Fargate vs EC2 노드그룹 벤치마크 테스트 후 EC2 노드그룹을 채택하여 Pod 기동 지연을 약 50초 수준으로 단축했습니다.
- **KubernetesPodOperator Retry 설정:** KubernetesPodOperator의 retry 설정을 적용하여 배치 성공률을 99% 수준으로 끌어올리는 파이프라인 고도화를 진행했습니다.
- **DAG 통폐합 & CI/CD 자동화:** 250개 DAG 중 중복·미사용 DAG 80개를 정리(170개로 최적화)하고, GitHub Actions → S3 Sync 자동 배포 파이프라인을 구축했습니다.

#### 4. 엔지니어링 성과 (Result)
- **클라우드 운영 비용 30% 절감:** DAG 통폐합(250개 → 170개) 및 인스턴스 최적화로 운영 비용 30% 절감 달성
- **배치 안정성 향상:** EC2 워커 노드 채택 및 retry 설정으로 배치 기동 지연 해소 및 안정적 스케줄링 보장
- **사내 직접 운영 체계 완비:** 외주 의존도 100% 제거 및 배포 자동화 파이프라인 구축

---

### [프로젝트 2] 우리동네GS × 택배 회원 연동 전용 인증 서버 구축
- **기간:** 2024.01 – 2024.06 (6개월)
- **기술 스택:** Java 17, Spring Boot 3, AWS KMS, JWT (RS256), Kubernetes (EKS)
- **규모:** 1,500만 유저 앱 '우리동네GS', 월 1,197만 req, 피크 트래픽 37,654 req/h

#### 1. 문제 배경 (Problem)
1,500만 다운로드 앱 '우리동네GS'에 가입하면 택배 시스템 회원인 경우 연동하고, 회원이 아닌 경우 택배 시스템에 회원가입을 연동하도록 체계를 구축해야 했습니다. 기존 서버에 직접 인증을 추가하기에는 비회원 서비스 영향과 트래픽 부담이 컸고, 외부 시스템에서 서명을 검증할 수 있는 공개키 기반 체계가 필요했습니다.

#### 2. 분석 및 기술 검토 (Analyze)
- **장애 영향 분리:** 기존 비회원 서버 직접 수정 시 비회원 접수까지 영향을 줄 위험이 있어, 동일 DB 환경에서 독립된 전용 인증 마이크로서비스 분리가 필요했습니다.
- **보안성 & 서명 검증:** 외부 시스템에서 안전하게 토큰 서명을 검증할 수 있도록 RS256 비대칭키 및 AWS KMS 기반 공개키 제공 체계가 필요했습니다.
- **레거시 연동:** session cluster 기반의 레거시 홈페이지 환경에서 인입 계층을 통한 회원 식별 및 세션 바인딩이 필요했습니다.

#### 3. 해결 과정 및 실행 (Action)
- **전용 인증/인가 서버 신규 분리:** 동일 DB 환경에서 비회원 서버와 분리된 독립 인증 마이크로서비스를 구축했습니다.
- **AWS KMS + RS256 비대칭키 서명:** KMS 비대칭 키쌍으로 JWT를 발행하고 외부 시스템에 Public JWKS 엔드포인트를 제공하여 안전하게 서명을 검증하도록 구현했습니다.
- **Interceptor 기반 회원 식별 & 세션 바인딩:** session cluster 기반의 레거시 홈페이지 택배 서비스 인입 계층에 Interceptor를 구성하여 JWT 검증 및 내부 회원 세션을 연계 생성했습니다.

#### 4. 엔지니어링 성과 (Result)
- **월 요청량 8.5배(140만 → 1,197만 건) 안정적 수용:** 트래픽 폭증에도 시스템 장애 없이 서비스 안정화
- **피크 트래픽 에러율 0.042% 유지:** 37,654 req/h 피크 부하 상황에서 극저 에러율 유지
- **기존 서비스 영향 최소화:** 독립 인증 마이크로서비스 구축을 통해 비회원 서비스 영향도 차단

---

### [프로젝트 3] GS리테일 차세대 CRM 서비스 안정화 & 3,000만 회원 CI 암호화
- **기간:** 2025.10 – 현재 (진행 중)
- **기술 스택:** Java, Spring Boot, Spring Batch, PostgreSQL, Apache Kafka, Docker, GitHub Actions

#### 1. 문제 배경 & 분석 (Problem & Analyze)
오픈 직후 CRM 서비스의 비밀번호 재설정 API에서 OTP 인증 완료 세션 및 인가(Authorization) 검증이 누락되어 계정 탈취 취약점이 발견되었습니다. 또한 3,000만 명 회원의 평문 CI를 암호화 컬럼으로 전환해야 했으며, CRM DB와 개인정보가 연동된 GS SHOP으로의 안정적인 실시간 데이터 전송 및 Kafka Consumer Lag 관리가 요구되었습니다.

#### 2. 해결 과정 및 성과 (Action & Result)
- **3,000만 회원 CI 암호화:** API 및 배치 쿼리를 변경하고 평문 CI를 암호화하여 암호화 column에 안전하게 저장
- **GS SHOP Kafka 연동 파이프라인 구축:** CRM DB와 연동된 GS SHOP에 Kafka를 통해 개인정보 데이터를 실시간 전송하고 Consumer Lag 모니터링 및 관리 체계 확립
- **보안 패치:** 비밀번호 변경 단계별 OTP 인증 토큰, 계정 일치, 인가(Authorization) 검증 로직을 추가하여 **계정 탈취 취약점 원천 차단**
- **쿼리 튜닝 & 빌드 최적화:** Correlated EXISTS → INNER JOIN 전환으로 **쿼리 실행시간 1초 → 200ms (80% 개선)** 및 불필요한 파일을 제외한 Dockerfile 수정으로 **빌드 시간 20분 → 2분 (90% 단축)**

---

## 2. GS네트웍스 (2021.08 – 2022.10)

- **소속:** 시스템파트
- **직책:** 백엔드
- **주요 업무:** 물류/택배 코어 백엔드 API 개발 및 캐시 인프라 고가용성 구축

---

### [프로젝트 4] 배송조회 API 고가용성 & 캐시 레이어 구축
- **기간:** 2021.11 – 2022.06 (8개월)
- **기술 스택:** Java, Spring Boot, Redis, PostgreSQL, Spring Retry

#### 1. 문제 배경 & 분석 (Problem & Analyze)
네이버, 당근, 토스 등 주요 제휴사가 공유하는 배송조회 API에서 외부 연동사의 간헐적 지연으로 Connection Timeout이 빈발했습니다. 또한 On-Premise Redis에 의존성이 집중되어 Redis 장애 시 전체 서비스가 중단되는 위험이 존재했습니다.

#### 2. 해결 과정 (Action)
- **캐시 적용:** 배송조회 및 토큰 발급에 단일 TTL 캐시를 적용하여 불필요한 외부 API 중복 호출 차단
- **캐시 레이어 & DB Fallback:** 캐시 레이어(Redis + DB)로 인증 토큰을 관리하고, Spring Retry / `@Recover` 패턴을 적용하여 Redis 장애 시 자동으로 DB Fallback 전환되도록 구현
- **외부 클라이언트 타임아웃 세분화:** 레거시 클라이언트 규격을 업그레이드하고 Connect/Read Timeout을 정밀 분리

#### 3. 성과 (Result)
- 외부 API Connection Timeout 문제 완전 해소 및 응답 안정성 확보
- Redis 다운 상황에서도 DB Fallback을 통해 무중단 서비스 지속성 보장
- 외부 API 호출량 절감으로 외부 시스템 의존 리스크 최소화

---

## 3. 마인드패스 (공동창업, 2018.12 – 2021.01)

- **직책:** 공동창업자
- **주요 업무:**
  - On-Premise Linux 서버 배포 환경 구축 및 서비스 인프라 전담 운영
  - GoogleNet 기반 이미지 분류 및 한국어 입모양 OCR 모델 서빙 백엔드 API 개발 (정부 지원사업 5,000만 원 수혜)
  - Raspberry Pi 기반 센서 데이터 수집 파이프라인 개발 및 건국대학교병원 파일럿 테스트 진행
