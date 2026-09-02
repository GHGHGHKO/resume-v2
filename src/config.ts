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
    "대기업의 대규모 서비스 환경에서도 스타트업처럼 기민한 Observability 체계를 바탕으로 일해왔습니다. Datadog 기반의 정밀한 모니터링으로 병목과 장애를 선제 탐지하고, 잦은 프로덕션 배포와 빠른 수정 사이클을 주도했습니다. GS리테일에서 1,500만 유저 앱 '우리동네GS'와 택배 서비스의 회원 통합(우리동네GS 가입 시 택배 회원 연동)을 위한 전용 인증 서버를 구축하여 월 요청량 8.5배 성장을 안정적으로 수용했고, 일 1,280만 req 규모 레거시 시스템의 AWS 클라우드 이관을 리드했습니다.",
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
        "1,500만 다운로드 앱 '우리동네GS' 가입 시 택배 서비스 회원으로 자동 연동되는 회원 통합 프로젝트. RS256 + AWS KMS 기반 전용 인증 서버 분리 구축으로 월 요청량 8.5배(140만 → 1,197만 건) 성장 및 피크 에러율 0.042% 달성.",
      skills: ["Java", "Spring Boot", "AWS KMS", "JWT", "Kubernetes"],
      detail: {
        problem:
          "1,500만 다운로드 앱 '우리동네GS'에 가입하면 택배 서비스 회원으로 연동되는 통합 체계를 구축해야 했음. 기존 서버에 직접 인증을 추가하기에는 비회원 서비스 영향과 트래픽 부담이 컸고, 기존 HS256 방식은 secret key 없이 외부 서명 검증이 불가능했음.",
        analyze: [
          "기존 비회원 서버 직접 수정 시 비회원 서비스 영향 범위 확대 → 전용 인증 서버 분리 필요",
          "HS256 방식의 외부 검증 한계 → RS256 비대칭키 및 AWS KMS 기반 공개키 서명 검증 전환 필요",
          "연동 후 인입될 대규모 트래픽의 수용력 검증 필요 → 부하 테스트 선행",
        ],
        action: [
          "우리동네GS 전용 인증/인가 서버 신규 분리 구축",
          "AWS KMS + RS256 비대칭키 도입으로 공개키 제공 및 외부 payload 서명 검증 체계 구현",
          "신규 서버 부하 테스트 진행 후 트래픽 수용력 사전 검증",
          "택배 홈페이지 Interceptor에 인입 감지 로직 추가 → JWT 기반 회원 조회 후 세션 생성",
        ],
        result: [
          "우리동네GS 가입 시 택배 서비스 회원으로 자동 연동되는 통합 체계 구축",
          "기존 비회원 서비스 영향 없이 회원 인증 체계 독립 구축",
          "서비스 연동 후 월 요청량 140만 → 1,197만 건 (8.5배 성장)",
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
          "빅뱅 방식으로 오픈된 CRM 서비스에서 발생한 API 보안 취약점, 데이터 배치 중복 오류, 20분 이상 소요되는 CI/CD 빌드 병목 해소 필요.",
        analyze: [
          "비밀번호 찾기 API의 OTP 인증 완료 여부 미검증으로 인한 계정 탈취 취약점 존재",
          "법정대리인 파기 배치의 SQL WHERE 조건 누락으로 인한 2건 등록 회원 PK 중복 오류 발생",
          "Dockerfile 내 전체 파일 COPY로 인한 이미지 비대화 및 빌드 시간 과다(20분)",
        ],
        action: [
          "OTP 우회 취약점 패치: 비밀번호 변경 API에 OTP 인증 완료 및 계정 일치 검증 추가",
          "배치 및 쿼리 최적화: SQL WHERE 조건(del_schd_dt) 추가, HashSet 중복 방지, Correlated EXISTS 서브쿼리 → INNER JOIN 전환",
          "빌드 최적화: 배포에 필요한 아티팩트만 COPY하도록 Dockerfile 수정",
        ],
        result: [
          "OTP 우회를 통한 계정 탈취 취약점 원천 차단",
          "쿼리 실행시간 1초 → 200ms (80% 개선)",
          "프론트엔드 빌드 시간 20분 → 2분 (90% 단축)",
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
          "외주 구축 DAG 코드의 낮은 유지보수성 및 비효율적 스케줄링으로 인한 IDC 잦은 배치 지연",
        ],
        action: [
          "EDB 종속 쿼리 전수 분석 및 ANSI SQL 표준 변환 (외주업체 협업)",
          "IDC Airflow → AWS MWAA 직접 구축 및 DAG 리팩토링",
          "Fargate vs EC2 벤치마크 후 EC2 노드 채택으로 Pod 기동 지연 해소",
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
        "네이버·당근·토스 등 제휴사 공유 배송조회 API의 Connection Timeout 해소. DB + Redis Layered Cache 및 Fallback 패턴으로 가용성 확보.",
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
          "배송조회 응답에 Cache + TTL 적용으로 외부 API 중복 호출 차단",
          "인증 토큰을 DB + Redis Layered Cache로 관리",
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
        "[우리동네GS × 택배 회원 연동 · 리드] 우리동네GS 가입 시 택배 회원 자동 연동 및 RS256 + AWS KMS 전용 인증 서버 구축 (월 1,197만 req 수용, 피크 에러율 0.042%)",
        "[IDC → AWS 이관] 서비스 13개 · 일 1,280만 req 레거시 마이그레이션 리드, MWAA 파이프라인 구축 및 비용 30% 절감",
        "[CRM 서비스 안정화] OTP 우회 계정 탈취 취약점 패치, 쿼리 실행시간 80% 개선(1초 → 200ms), 프론트엔드 빌드 시간 90% 단축(20분 → 2분)",
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
        "러너-관전자 실시간 위치 공유 서비스 백엔드 및 인프라 전담 개발 (iOS App Store & Google Play Store 정식 출시)",
        "Spring WebFlux + Reactive Redis 기반 고성능 WebSocket 실시간 위치 브로드캐스팅 파이프라인(pulse.runmarket.cc) 구축",
        "Spring Boot 멀티모듈 아키텍처(web, socket, batch, core) 적용으로 도메인 및 관심사 분리",
        "Google Jib 기반 데몬리스 컨테이너 이미지 빌드 및 Kubernetes(K3s) & Helm Chart 선언적 IaC 배포 자동화",
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
