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
    "Java와 Spring Boot 기반의 백엔드 개발자로, AWS 클라우드 인프라 운영과 대규모 서비스 안정화 경험을 보유하고 있습니다. GS리테일에서 1,500만 다운로드 앱의 인증 서버를 신규 구축하여 월 요청량 8.5배 성장을 이끌었고, IDC → AWS 클라우드 이관 프로젝트에서 일 평균 1,280만 req 규모의 레거시 시스템을 성공적으로 마이그레이션했습니다. 장애를 분석하고 근본 원인을 해결하는 것에 관심이 많습니다.",
  skills: [
    "Java",
    "Spring Boot",
    "Spring Batch",
    "JPA",
    "AWS",
    "Kubernetes",
    "Docker",
    "Airflow",
    "PostgreSQL",
    "Valkey",
    "Python",
    "SQL",
    "Datadog",
    "Git",
  ],
  projects: [
    {
      name: "우리동네GS × 택배 서비스 회원 연동",
      description:
        "1,500만 다운로드 앱과 택배 서비스 간 인증 체계 통합. RS256 + AWS KMS 기반 JWT 전용 인증 서버 분리 구축으로 월 요청량 8.5배 성장, 피크 에러율 0.042% 달성.",
      skills: ["Java", "Spring Boot", "AWS KMS", "JWT", "Kubernetes"],
      detail: {
        problem:
          "1,500만 다운로드 앱 '우리동네GS'와 택배 서비스를 연동해야 했으나, 기존 API 서버는 비회원 중심 설계로 인증 체계가 불명확했음. HS256 방식 JWT는 secret key 없이 payload 서명 검증이 불가능했고, 대규모 트래픽을 기존 서버에서 수용하기엔 리스크가 컸음.",
        analyze: [
          "기존 비회원 서버 직접 수정 시 비회원 서비스 영향 범위 확대 → 신규 서버 분리 필요",
          "HS256은 secret key 공유 없이 payload 사용 불가 → RS256 비대칭키 방식 전환 필요",
          "우리동네GS 트래픽 사전 검증 없이 기존 서버 인입 시 장애 리스크 → 부하 테스트 선행",
        ],
        action: [
          "우리동네GS 전용 인증/인가 서버 신규 분리 구축",
          "JWT 발급을 RS256 + AWS KMS로 전환, 공개키 제공으로 외부 payload 서명 검증 가능",
          "신규 서버 부하 테스트 진행 후 트래픽 수용력 사전 검증",
          "택배 홈페이지 Interceptor에 우리동네GS 인입 감지 로직 추가 → JWT 기반 내부 회원 조회 후 세션 생성",
        ],
        result: [
          "기존 비회원 서비스 영향 없이 회원 인증 체계 독립적으로 구축",
          "서비스 연동 후 월 요청량 140만 → 1,197만 건, 8.5배 성장",
          "피크 트래픽 37,654 req/h 수용하며 에러율 0.042% 수준 유지",
        ],
      },
    },
    {
      name: "GS리테일 차세대 CRM 서비스 안정화",
      description:
        "빅뱅 오픈 직후 CRM 서비스의 보안 취약점·배치 오류·배포 병목을 동시 해소. OTP 우회 계정 탈취 취약점 패치, 쿼리 실행시간 80% 개선, 프론트엔드 빌드 시간 90% 단축.",
      skills: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Spring Batch"],
      detail: {
        problem:
          "빅뱅 방식으로 오픈된 CRM 서비스에서 API 비즈니스 장애 다수 발생. 보안 취약점과 배치 오류가 존재했으며, 프론트엔드 CI/CD 빌드 시간이 20분 이상 소요되어 배포 생산성이 저하된 상태였음.",
        analyze: [
          "비밀번호 찾기 API가 OTP 인증 완료 여부를 미검증 → 패킷 조작으로 타 계정 비밀번호 변경 가능한 취약점 존재",
          "법정대리인 파기 배치의 SQL WHERE 조건 누락 → 2건 등록 회원 처리 시 PK 중복 오류 발생",
          "Dockerfile 내 COPY . . 로 node_modules 전체를 이미지에 포함 → 빌드 시간 과다",
        ],
        action: [
          "OTP 우회 취약점 패치: 비밀번호 변경 API에 OTP 완료 여부 검증 추가, OTP 발송 시점 계정 일치 사전 검증",
          "배치 오류 수정: SQL WHERE 조건에 del_schd_dt 추가, HashSet으로 중복 처리 방지",
          "쿼리 튜닝: Correlated EXISTS 서브쿼리 → INNER JOIN 전환 검증 및 적용",
          "Dockerfile 최적화: 배포에 필요한 .zip만 COPY하도록 수정",
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
        "서비스 13개 · 이기종 DB 2개 · 일 평균 1,280만 req 규모 레거시 시스템 AWS 전환. Airflow 250 DAGs → MWAA 170개 최적화, 클라우드 비용 30% 절감.",
      skills: ["AWS", "EKS", "MWAA", "Airflow", "PostgreSQL", "Docker"],
      detail: {
        problem:
          "IDC 기반 택배 서비스를 AWS로 이관해야 했으나, EDB 벤더 종속 쿼리와 외주 구축 Airflow DAG 250개가 걸림돌이었음. 규모는 서비스 13개 · 이기종 DB 2개 · 일 평균 1,280만 req/day · 피크 82만 req/hour.",
        analyze: [
          "AWS DMS가 EDB를 미지원 → 자동 마이그레이션 불가, 수동 변환 필요",
          "KubernetesPodOperator 실행 환경으로 Fargate 검토 시, Java 콜드스타트 + 프로비저닝 지연으로 Pod 기동 수십 초~수 분 소요",
          "외주 구축 DAG 코드 낮은 유지보수성 → IDC 환경 수정 시 장애 반복 발생",
        ],
        action: [
          "EDB 벤더 종속 쿼리 ANSI SQL 전수 변환 및 테스트 (외주업체 협업)",
          "IDC Airflow → AWS MWAA 직접 구축 (250 DAGs)",
          "Fargate vs EC2 벤치마크 후 EC2 노드 선택 → Pod 기동 수십 초 내 보장",
          "MWAA CI/CD 파이프라인 구성으로 빠른 배포/롤백 체계 마련",
          "미사용 DAG 제거 및 스케줄 주기 최적화",
        ],
        result: [
          "DAG 250개 → 170개 최적화 및 스케줄 효율화로 클라우드 운영 비용 30% 절감",
          "외주 의존도 제거, 직접 운영 체계 확보 → 장애 대응 유연성 향상",
          "ANSI SQL 전환으로 쿼리 가독성·유지보수성 개선",
          "CI/CD 도입으로 배포 속도 및 안정성 향상",
        ],
      },
    },
    {
      name: "배송조회 API 고가용성 구축",
      description:
        "네이버·당근·토스 등 외부 제휴사 공유 배송조회 API의 Connection Timeout 해소. DB + Redis Layered Cache 및 Retry/Recover 패턴으로 Redis 장애 시에도 무중단 운영 확보.",
      skills: ["Java", "Spring Boot", "Redis", "PostgreSQL"],
      detail: {
        problem:
          "택배 홈페이지·네이버·당근·토스 등 다수 외부 제휴사가 공유하는 핵심 배송조회 API에서 빈번한 외부 API 호출로 인한 Connection Timeout이 반복 발생했음.",
        analyze: [
          "외부 API 구버전 한계로 호출 안정성 부족 → 버전 업그레이드 필요",
          "업그레이드된 API의 토큰 기반 인증 도입 필요 → 토큰 관리 체계 설계 필요",
          "Redis가 On-Premise 환경으로 단일 장애점(SPOF) 위험 존재",
          "동일 배송정보를 매번 외부 API로 조회 → 불필요한 호출 과다",
        ],
        action: [
          "외부 배송조회 API 버전 업그레이드 적용",
          "인증 토큰을 DB + Redis Layered Cache로 관리",
          "Redis 장애 대비 Retry / Recover 패턴 구현 → Redis 다운 시 DB fallback으로 서비스 지속",
          "배송조회 응답에 Cache + TTL 적용 → 외부 API 중복 호출 차단",
        ],
        result: [
          "외부 API Connection Timeout 문제 해소",
          "Redis 장애 상황에서도 서비스 무중단 운영 가능한 고가용성 확보",
          "캐시 적용으로 외부 API 호출 횟수 감소 및 응답 안정성 확보",
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
        "[우리동네GS × 택배 연동 · 리드] RS256 + AWS KMS 전용 인증/인가 서버 신규 분리 구축, 월 요청량 140만 → 1,197만 건(8.5배), 피크 에러율 0.042% 유지",
        "[CRM 서비스 안정화] OTP 우회 계정 탈취 취약점 패치, 쿼리 실행시간 1초 → 200ms(80% 개선), 프론트엔드 빌드 20분 → 2분(90% 단축)",
        "[IDC → AWS 이관] 서비스 13개 · 일 1,280만 req 규모 마이그레이션, Airflow 250 DAGs → AWS MWAA 170 DAGs, 클라우드 비용 30% 절감",
        "EDB 벤더 종속 쿼리 ANSI SQL 전수 변환, MWAA CI/CD 파이프라인 구성으로 외주 의존도 제거",
      ],
    },
    {
      company: "GS네트웍스",
      title: "백엔드 개발자 (매니저)",
      dateRange: "Aug 2021 – Oct 2022",
      bullets: [
        "네이버·당근·토스 등 외부 제휴사 공유 배송조회 API의 Connection Timeout 문제 원인 분석 및 해소",
        "DB + Redis Layered Cache로 인증 토큰 관리, Retry/Recover 패턴 구현으로 Redis 장애 시 DB fallback 고가용성 확보",
        "배송조회 응답 Cache + TTL 적용으로 외부 API 중복 호출 감소 및 응답 안정성 향상",
      ],
    },
    {
      company: "마인드패스 (공동창업)",
      title: "공동창업자",
      dateRange: "Dec 2018 – Jan 2021",
      bullets: [
        "GoogleNet 기반 한국어 발음 입모양 OCR 모델 MVP 개발 → 기술보증기금 등 지원사업 5,000만원 수혜",
        "GoogleNet 기반 의류 분류 모델 MVP 개발",
        "Raspberry Pi 기반 치매 환자 낙상 방지 IoT 제작 → 건국대학교병원 파일럿 테스트 진행",
        "On-premise 서버 배포 환경 구축 및 운영",
      ],
    },
  ],
  activities: [
    {
      name: "코칭스터디 멘토링",
      organization: "모두의연구소",
      dateRange: "2023 – 2025",
      bullets: [
        "누적 멘토링 인원 400명 이상",
        "Gen AI, Data Science, Python 기초 과정 멘토링 진행",
        "스터디 참여자 대상 개념 설명 및 실습 중심 코칭",
        "비전공자 포함 다양한 레벨의 학습자 대상 교육 경험",
      ],
    },
    {
      name: "Rust 찍어먹기",
      organization: "사내 기술 발표",
      dateRange: "2024",
      bullets: [
        "Rust를 부담 없이 찍어먹는 수준의 개념과 이해를 위해 작성",
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
        "학과 공용 웹 서버 구축 및 운영 — BareMetal 서버를 Ubuntu 기반 실습 서버로 전환, 패키지·런타임 환경 관리",
        "스위치 루핑으로 인한 학과 네트워크 장애 발생 시 외주업체와 협업해 루핑 구간 추적 및 장애 제거",
      ],
    },
  ],
};
