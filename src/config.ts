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
    blog: "https://pepega.tistory.com/",
  },
  aboutMe:
    "대기업의 대규모 서비스 환경에서도 스타트업처럼 기민한 Observability 체계를 바탕으로 일해왔습니다. Datadog 기반의 정밀한 모니터링으로 병목과 장애를 선제 탐지하고, 잦은 프로덕션 배포와 빠른 수정 사이클을 주도했습니다. GS리테일에서 1,500만 유저 앱 연동 인증 서버 신규 구축(월 1,200만 req 수용) 및 일 1,280만 req 레거시 시스템의 AWS 무중단 이관을 리드하며, 대규모 트래픽 안정성과 빠른 실행력을 입증했습니다.",
  skills: [
    "Java",
    "Spring Boot",
    "Spring Batch",
    "JPA",
    "PostgreSQL",
    "Redis / Valkey",
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
        "1,500만 다운로드 앱 연동을 위한 RS256 + AWS KMS 기반 전용 인증/인가 서버 분리 구축. 월 요청량 8.5배(140만 → 1,197만 건) 성장 및 피크 에러율 0.042% 달성.",
      skills: ["Java", "Spring Boot", "AWS KMS", "JWT", "Kubernetes"],
      detail: {
        problem:
          "1,500만 다운로드 앱 '우리동네GS'와 택배 서비스를 연동해야 했으나, 기존 단일 비회원 API 서버의 트래픽 과부하 위험 및 HS256 대칭키 방식의 외부 인증 검증 한계가 존재했음.",
        analyze: [
          "기존 비회원 서버 직접 수정 시 비회원 서비스 영향 범위 확대(Blast Radius) → 인증/인가 서버 분리 필요",
          "HS256 대칭키 공유 시 보안 취약 → RS256 비대칭키 및 AWS KMS 기반 서명/공개키 검증 구조 필요",
          "대규모 트래픽 인입 시 병목 구간 식별 필요 → 실환경 부하 테스트 선행",
        ],
        action: [
          "AWS KMS + RS256 기반 독립 인증/인가 서버 신규 구축 및 공개키 엔드포인트 제공",
          "택배 서비스 인입 계층(Interceptor)에서 JWT 검증 및 내부 회원 세션 연계 구조 설계",
          "목표 트래픽 기반 부하 테스트 수행 및 JVM/커넥션 풀 파라미터 최적화",
        ],
        result: [
          "비회원 서비스 영향도 0(Zero blast radius)의 독립 인증 아키텍처 수립",
          "연동 후 월 요청량 140만 → 1,197만 건(8.5배) 무장애 수용",
          "피크 트래픽 37,654 req/h 환경에서 에러율 0.042% 수준 유지",
        ],
      },
    },
    {
      name: "GS리테일 차세대 CRM 서비스 안정화",
      description:
        "오픈 직후 CRM 서비스의 보안 취약점 패치, 배치 중복 오류 수정, 쿼리 실행시간 80% 개선 및 CI/CD 빌드 시간 90% 단축.",
      skills: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Spring Batch"],
      detail: {
        problem:
          "빅뱅 오픈 직후 발생한 API 보안 취약점(계정 탈취), 데이터 배치 중복 키 오류, 20분 이상 소요되는 CI/CD 프론트엔드 빌드 병목 해소 필요.",
        analyze: [
          "비밀번호 변경 API의 OTP 인증 세션 상태 미검증으로 인한 패킷 변조 및 계정 탈취 취약점",
          "법정대리인 데이터 파기 배치의 SQL WHERE 조건 누락으로 인한 2건 이상 회원 PK 중복 충돌",
          "Dockerfile 내 node_modules 전체 COPY로 인한 이미지 비대화 및 빌드 시간 과다(20분)",
        ],
        action: [
          "보안 패치: 비밀번호 변경 단계별 OTP 인증 토큰 및 계정 일치 엄격 검증 로직 추가",
          "배치 및 쿼리 최적화: 날짜 조건(del_schd_dt) 추가 및 HashSet 중복 방지, Correlated EXISTS 서브쿼리 → INNER JOIN 전환",
          "빌드 최적화: 배포 아티팩트(.zip)만 COPY하도록 Dockerfile 경량화",
        ],
        result: [
          "OTP 우회를 통한 계정 탈취 취약점 원천 차단",
          "DB 병목 쿼리 실행시간 1초 → 200ms (80% 개선)",
          "프론트엔드 빌드/배포 소요시간 20분 → 2분 (90% 단축)",
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
          "13개 서비스, 일 평균 1,280만 req(피크 82만 req/h) 규모의 IDC 레거시 시스템 이관 중 EDB 벤더 종속 쿼리와 외주 구축 Airflow DAG 250개의 유지보수 한계 직면.",
        analyze: [
          "AWS DMS의 EDB 미지원으로 인한 자동 마이그레이션 불가 → ANSI SQL 수동 표준화 필요",
          "KubernetesPodOperator 환경에서 Fargate 검토 시 Java 콜드스타트 + 프로비저닝 지연(수 분) 발생",
          "외주 구축 DAG 코드의 낮은 유지보수성 및 비효율적 스케줄링으로 인한 잦은 배치 지연",
        ],
        action: [
          "EDB 종속 쿼리 전수 분석 및 ANSI SQL 표준화 마이그레이션 (외주 협업)",
          "AWS MWAA(Managed Workflows for Apache Airflow) 환경 직접 구축 및 DAG 리팩토링",
          "Fargate vs EC2 벤치마크 후 EC2 노드그룹 채택으로 Pod 기동 지연 해소",
          "MWAA CI/CD 파이프라인 구성 및 미사용 DAG(80개) 통폐합·스케줄링 최적화",
        ],
        result: [
          "DAG 250개 → 170개 최적화로 클라우드 운영 비용 30% 절감",
          "외주 의존도 제거 및 사내 엔지니어링 직접 운영 체계 확보",
          "표준 SQL 전환으로 쿼리 유지보수성 향상 및 배포 파이프라인 안정화",
        ],
      },
    },
    {
      name: "배송조회 API 고가용성 및 캐시 레이어 구축",
      description:
        "네이버·당근·토스 등 주요 제휴사 공용 배송조회 API의 Connection Timeout 해소. Multi-layer Cache(Redis + DB) 및 Fallback 패턴으로 무중단 운영 확보.",
      skills: ["Java", "Spring Boot", "Redis", "PostgreSQL"],
      detail: {
        problem:
          "네이버, 당근, 토스 등 다수 제휴사가 호출하는 배송조회 API에서 외부 연동사 지연으로 인한 Connection Timeout 빈발 및 On-Premise Redis의 SPOF(단일 장애점) 리스크 존재.",
        analyze: [
          "동일 배송건에 대한 외부 API 반복 호출로 네트워크 I/O 병목 및 지연 발생",
          "Redis 다운 시 전체 배송조회 서비스 중단 위험",
          "구버전 외부 연동 규격 한계로 인한 타임아웃 처리 미흡",
        ],
        action: [
          "배송 상태 기반 Dynamic TTL 캐싱 적용으로 외부 API 중복 호출 차단",
          "인증 토큰 및 조회 데이터를 DB + Redis Layered Cache로 관리",
          "Spring Retry / @Recover 기반 장애 격리 패턴 구현 → Redis 장애 시 DB Fallback으로 무중단 처리",
          "외부 연동 클라이언트 버전 업그레이드 및 타임아웃 세분화",
        ],
        result: [
          "외부 API Connection Timeout 완전 해소 및 응답 안정성 확보",
          "Redis 장애 상황에서도 무중단(Fallback) 고가용성 아키텍처 수립",
          "불필요한 외부 API 호출량 감소로 시스템 부하 절감",
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
        "[우리동네GS 연동 · 리드] RS256 + AWS KMS 인증 서버 분리 구축 (월 1,197만 req 수용, 피크 에러율 0.042%)",
        "[IDC → AWS 이관] 서비스 13개 · 일 1,280만 req 레거시 마이그레이션 리드, MWAA 파이프라인 구축 및 비용 30% 절감",
        "[CRM 서비스 안정화] 계정 탈취 보안 취약점 패치, DB 병목 쿼리 80% 개선(1초 → 200ms), CI/CD 빌드 시간 90% 단축(20분 → 2분)",
        "[기술 부채 청산] EDB 종속 쿼리 ANSI SQL 전수 표준화 및 Airflow DAG 250개 → 170개 최적화",
      ],
    },
    {
      company: "GS네트웍스",
      title: "백엔드 개발자 (매니저)",
      dateRange: "Aug 2021 – Oct 2022",
      bullets: [
        "[제휴 배송조회 API 고가용성] 네이버·당근·토스 공유 API의 Connection Timeout 원인 분석 및 해결",
        "[다계층 캐시 & 장애 격리] DB + Redis Layered Cache 및 Retry/Recover 패턴으로 Redis 장애 시 무중단 DB Fallback 보장",
        "[I/O 최적화] 배송 상태별 Dynamic TTL 캐싱으로 외부 API 중복 호출 차단 및 응답 지연 개선",
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
        "러너-관전자 실시간 위치 공유 서비스 백엔드 및 인프라 전담 개발 (App Store 출시)",
        "Spring WebFlux + Reactive Redis 기반 고성능 WebSocket 실시간 위치 브로드캐스팅 파이프라인 구축",
        "Spring Boot 멀티모듈 아키텍처(Core, Web, WebSocket, Batch) 적용으로 도메인 및 관심사 분리",
        "Kubernetes(K3s) & Helm Chart 기반 선언적 IaC 인프라 구성 및 배포 자동화",
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
