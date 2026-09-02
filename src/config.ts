export const siteConfig = {
  name: "고형규",
  title: "5년차 백엔드 개발자 | Java · Spring Boot · AWS",
  description: "고형규의 포트폴리오 — Backend Developer",
  accentColor: "#1d4ed8",
  profilePhoto: "https://pub-1d62bbed806549fe95a5676d3fc13a50.r2.dev/profile.jpg",
  resumePdf: "https://pub-1d62bbed806549fe95a5676d3fc13a50.r2.dev/%EC%9D%B4%EB%A0%A5%EC%84%9C.pdf",
  social: {
    email: "gudrb963@gmail.com",
    github: "https://github.com/GHGHGHKO",
  },
  aboutMe:
    "대기업의 대규모 서비스 환경에서도 스타트업처럼 기민한 Observability 체계를 바탕으로 일해왔습니다. Datadog 기반의 정밀한 모니터링으로 병목과 장애를 선제 탐지하고, 잦은 프로덕션 배포와 빠른 수정 사이클을 주도했습니다. GS리테일에서 1,500만 유저 앱 '우리동네GS'와 택배 서비스의 회원 통합(우리동네GS 가입 시 택배 회원 연동/가입)을 위한 전용 인증 서버를 구축하여 월 요청량 8.5배 성장을 안정적으로 수용했고, 일 1,280만 req 규모 레거시 시스템의 AWS 클라우드 이관을 리드했습니다.",
  skills: [
    "Java",
    "Spring Boot",
    "Spring Batch",
    "JPA",
    "PostgreSQL",
    "Redis / Valkey",
    "Kafka",
    "AWS",
    "Kubernetes",
    "Docker",
    "Airflow",
    "Python",
    "Datadog",
    "Git",
  ],
  projects: [
    {
      name: "우리동네GS × 택배 서비스 회원 연동",
      description:
        "1,500만 유저 앱 '우리동네GS' 가입 시 택배 시스템 회원 여부에 따라 연동/가입을 처리하는 회원 통합 프로젝트. RS256 + AWS KMS 기반 전용 인증 서버 분리 구축으로 월 요청량 8.5배(140만 → 1,197만 건) 성장 및 피크 에러율 0.042% 달성.",
      skills: ["Java", "Spring Boot", "AWS KMS", "JWT", "Kubernetes"],
      detail: {
        problem:
          "1,500만 다운로드 앱 '우리동네GS'에 가입하면 택배 시스템 회원인 경우 연동하고, 회원이 아닌 경우 택배 시스템에 회원가입을 연동하도록 체계를 구축해야 했음. 기존 서버에 직접 인증을 추가하기에는 비회원 서비스 영향과 트래픽 부담이 컸고, 외부 시스템에서 서명을 검증할 수 있는 공개키 기반 체계가 필요했음.",
        analyze: [
          "기존 비회원 서버 직접 수정 시 비회원 서비스 영향 범위 확대 → 전용 인증 마이크로서비스 분리 필요 (단일 DB 공유)",
          "외부 시스템의 안전한 서명 검증을 위한 RS256 비대칭키 및 AWS KMS 기반 공개키 서명 검증 도입 필요",
          "session cluster 기반의 레거시 홈페이지 연동을 위해 인입 계층에서의 회원 식별 및 세션 바인딩 필요",
        ],
        action: [
          "단일 DB 환경에서 비회원 서버와 분리된 우리동네GS 전용 인증/인가 마이크로서비스 신규 구축",
          "AWS KMS + RS256 비대칭키 도입으로 외부 payload 서명 검증을 위한 공개키(JWKS) 제공 체계 구현",
          "session cluster 기반 레거시 홈페이지의 인입 계층에 Interceptor를 구성하여 JWT 검증 및 내부 회원 세션 연계 생성",
        ],
        result: [
          "우리동네GS 회원가입 시 택배 시스템 회원 연동 및 자동 가입 통합 체계 완성",
          "전용 인증 서버 분리를 통해 기존 서비스 영향 최소화",
          "서비스 연동 후 월 요청량 140만 → 1,197만 건 (8.5배 성장) 안정적 수용",
          "피크 트래픽 37,654 req/h 환경에서 에러율 0.042% 수준 유지",
        ],
      },
    },
    {
      name: "GS리테일 차세대 CRM 서비스 안정화 & CI 암호화",
      description:
        "3,000만 회원 CI 암호화 및 GS SHOP Kafka 데이터 연동 파이프라인 구축(Lag 관리), OTP/인가 보안 취약점 해결, 쿼리 80% 개선 및 빌드 시간 90% 단축.",
      skills: ["Java", "Spring Boot", "PostgreSQL", "Kafka", "Docker", "Spring Batch"],
      detail: {
        problem:
          "오픈 직후 발생한 API 보안 취약점(OTP 세션 및 인가 검증 누락) 및 쿼리/빌드 병목 해소와, 3,000만 회원의 평문 CI 암호화 전환 및 GS SHOP 실시간 데이터 연동 필요.",
        analyze: [
          "3,000만 회원 데이터의 평문 CI를 암호화 컬럼으로 안전하게 전환하기 위한 API 및 배치 쿼리 수정 필요",
          "CRM DB와 연동된 GS SHOP으로의 안정적인 개인정보 동기화 및 Kafka Consumer Lag 관리 필요",
          "비밀번호 찾기 API의 OTP 인증 세션 미검증 및 인가 누락 취약점 존재",
          "Correlated EXISTS 서브쿼리 및 전체 파일 COPY Dockerfile로 인한 빌드(20분)/쿼리 병목",
        ],
        action: [
          "3,000만 명 CI 암호화: API 및 배치 쿼리를 변경하여 평문 CI를 암호화하여 암호화 column에 저장",
          "GS SHOP Kafka 연동: CRM DB와 연동된 GS SHOP에 Kafka를 통해 개인정보 데이터를 전송하고 Consumer Lag 모니터링/관리",
          "보안 패치: 비밀번호 변경 API에 OTP 인증 완료 세션 및 계정 일치 검증, 인가(Authorization) 검증 로직 추가",
          "쿼리 & 빌드 최적화: Correlated EXISTS → INNER JOIN 전환(1s → 200ms) 및 배포 아티팩트 선별 COPY로 Dockerfile 수정(20분 → 2분)",
        ],
        result: [
          "3,000만 회원 CI 암호화 및 GS SHOP Kafka 연동 파이프라인 안정적 운영",
          "OTP 우회 및 인가 누락을 통한 계정 탈취 취약점 원천 차단",
          "쿼리 실행시간 1초 → 200ms (80% 개선), 빌드 시간 20분 → 2분 (90% 단축)",
        ],
      },
    },
    {
      name: "택배 서비스 IDC → AWS 클라우드 이관",
      description:
        "13개 서비스 · 이기종 DB 2개 · 일 1,280만 req 레거시 시스템 AWS 전환. Airflow 250 DAGs → MWAA 170개 최적화 및 인프라 비용 30% 절감.",
      skills: ["AWS", "EKS", "MWAA", "Airflow", "PostgreSQL", "Docker"],
      detail: {
        problem:
          "서비스 13개, 일 평균 1,280만 req(피크 82만 req/h) 규모의 IDC 레거시 시스템 이관 중 EDB 벤더 종속 쿼리와 외주 구축 Airflow DAG 250개의 유지보수 한계 직면.",
        analyze: [
          "AWS DMS의 EDB 미지원으로 인한 수동 SQL 표준화 필요",
          "KubernetesPodOperator 환경에서 Fargate 검토 시 Java 콜드스타트 및 프로비저닝 지연(수 분) 발생",
          "외주 구축 DAG의 미사용/중복 코드로 인한 IDC 잦은 배치 지연",
        ],
        action: [
          "EDB 종속 쿼리 전수 분석 및 ANSI SQL 표준 변환 (외주업체 협업)",
          "IDC Airflow → AWS MWAA 직접 구축 및 DAG 리팩토링",
          "Fargate vs EC2 노드그룹 벤치마크 후 EC2 노드 채택으로 Pod 기동 지연 단축 (약 50초 내외)",
          "KubernetesPodOperator의 retry 설정을 활용하여 배치 성공률 99% 달성을 목표로 파이프라인 고도화",
          "MWAA CI/CD 파이프라인 구성 및 미사용 DAG(80개) 통폐합·스케줄링 최적화",
        ],
        result: [
          "DAG 250개 → 170개 최적화로 클라우드 운영 비용 30% 절감",
          "외주 의존도 제거 및 사내 직접 운영 체계 확보",
          "ANSI SQL 전환으로 쿼리 유지보수성 향상 및 배포 파이프라인 안정화",
        ],
      },
    },
    {
      name: "배송조회 API 고가용성 및 캐시 레이어 구축",
      description:
        "네이버·당근·토스 등 제휴사 공유 배송조회 API의 Connection Timeout 해소. 캐시 레이어(Redis + DB Fallback)로 가용성 확보.",
      skills: ["Java", "Spring Boot", "Redis", "PostgreSQL"],
      detail: {
        problem:
          "택배 홈페이지 및 제휴사가 공유하는 배송조회 API에서 빈번한 외부 API 호출로 인한 Connection Timeout 발생 및 On-Premise Redis의 단일 장애점(SPOF) 위험 존재.",
        analyze: [
          "동일 배송정보의 반복적인 외부 API 호출로 인한 I/O 병목",
          "Redis 다운 시 배송조회 서비스 중단 위험",
          "외부 API 구버전 한계로 인한 호출 안정성 부족",
        ],
        action: [
          "배송조회 및 토큰 발급에 TTL이 포함된 캐시를 적용하여 외부 API 중복 호출 차단",
          "인증 토큰을 캐시 레이어(Redis + DB)로 관리",
          "Retry / Recover 패턴 구현으로 Redis 다운 시 DB Fallback 처리",
          "외부 배송조회 API 버전 업그레이드 적용",
        ],
        result: [
          "외부 API Connection Timeout 문제 해소",
          "Redis 장애 상황에서도 DB Fallback을 통한 서비스 지속성 확보",
          "캐시 적용으로 외부 API 중복 호출 감소 및 응답 안정성 향상",
        ],
      },
    },
  ],
  experience: [
    {
      company: "GS리테일 (GS네트웍스에서 인사이동)",
      title: "백엔드 개발자",
      dateRange: "Oct 2022 – 현재",
      bullets: [
        "[우리동네GS × 택배 회원 연동 · 리드] 우리동네GS 가입 시 택배 회원 연동/가입 및 RS256 + AWS KMS 전용 인증 서버 구축 (월 1,197만 req 수용, 피크 에러율 0.042%)",
        "[IDC → AWS 이관] 서비스 13개 · 일 1,280만 req 레거시 마이그레이션 리드, MWAA 파이프라인 구축 및 비용 30% 절감",
        "[CRM CI 암호화 & 안정화] 3,000만 회원 CI 암호화 및 GS SHOP Kafka 연동 파이프라인 구축(Lag 관리), OTP/인가 보안 취약점 해결, 쿼리 80% 개선(1s → 200ms), 빌드 시간 90% 단축(20분 → 2분)",
        "[기술 부채 청산] EDB 종속 쿼리 ANSI SQL 전수 표준화 및 Airflow DAG 250개 → 170개 최적화",
      ],
    },
    {
      company: "GS네트웍스",
      title: "백엔드 개발자",
      dateRange: "Aug 2021 – Oct 2022",
      bullets: [
        "[배송조회 API 고가용성] 네이버·당근·토스 공유 API의 Connection Timeout 원인 분석 및 해결",
        "[캐시 레이어 & 장애 격리] 캐시 레이어(Redis + DB) 및 Fallback 패턴으로 Redis 장애 시 무중단 DB Fallback 보장",
        "[캐시 최적화] 배송조회 및 토큰 발급에 TTL이 포함된 캐시를 적용하여 외부 API 중복 호출 차단 및 응답 안정성 향상",
      ],
    },
    {
      company: "마인드패스 (공동창업)",
      title: "공동창업자",
      dateRange: "Dec 2018 – Jan 2021",
      bullets: [
        "[인프라 및 백엔드 구축] On-Premise Linux 서버 배포 환경 구축 및 서비스 인프라 전담 운영",
        "[AI 서빙 파이프라인 개발] GoogleNet 기반 이미지 분류/OCR 모델 서빙 API 개발 및 지원사업 5,000만원 수혜",
        "[IoT 데이터 파이프라인] Raspberry Pi 기반 센서 데이터 수집 파이프라인 개발 및 건국대학교병원 파일럿 테스트 진행",
      ],
    },
  ],
  activities: [
    {
      name: "런마켓 (RunMarket) - 러닝 동행 서비스",
      organization: "개인 프로젝트",
      dateRange: "2025 – 현재",
      bullets: [
        "러너-관전자 실시간 위치 공유 서비스 백엔드 및 인프라 전담 개발 (iOS App Store & Google Play Store 정식 출시)",
        "Spring WebFlux + Reactive Redis 기반 고성능 WebSocket 실시간 위치 브로드캐스팅 파이프라인(pulse.runmarket.cc) 구축",
        "Spring Boot 멀티모듈 아키텍처(web, socket, batch, core) 적용으로 도메인 및 관심사 분리",
        "Google Jib 기반 데몬리스 컨테이너 이미지 빌드 및 Kubernetes & Helm Chart 선언적 IaC 배포 자동화",
        "k6 부하 테스트: 1,000명 동시 접속 및 1초 주기 실시간 위치 수집 환경에서 에러율 0% 검증",
      ],
      link: "https://about.runmarket.cc/",
    },
    {
      name: "코칭스터디 멘토링",
      organization: "모두의연구소",
      dateRange: "2023 – 2025",
      bullets: [
        "누적 400명+ 학습자 대상 Python 기초, Data Science, Gen AI 기술 멘토링 및 실습 코칭",
        "비전공자 및 주니어 대상 문제 해결 중심의 코드 리뷰 진행",
      ],
    },
    {
      name: "Rust 핵심 개념과 메모리 안전성 모델",
      organization: "GS리테일 사내 기술 세미나",
      dateRange: "2024",
      bullets: [
        "소유권(Ownership), 차용(Borrowing) 등 Rust의 메모리 관리 메커니즘 사내 엔지니어 대상 공유",
      ],
      link: "https://gsretail.tistory.com/39",
    },
  ],
  education: [
    {
      school: "건국대학교 글로컬캠퍼스",
      degree: "컴퓨터공학과 학사",
      dateRange: "Mar 2014 – Feb 2021",
      achievements: [
        "학과 BareMetal 서버 대상 Ubuntu 기반 실습 서버 환경 구축 및 사용자/런타임 격리 운영",
        "학과 네트워크 루핑 장애 트러블슈팅 및 L2/L3 스위치 패킷 경로 정상화",
      ],
    },
  ],
};
