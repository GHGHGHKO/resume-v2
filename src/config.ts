export const siteConfig = {
  "name": "고형규",
  "title": "백엔드 엔지니어 | Java · Spring Boot · AWS",
  "description": "고형규의 백엔드 엔지니어 포트폴리오",
  "accentColor": "#1d4ed8",
  "profilePhoto": "https://pub-1d62bbed806549fe95a5676d3fc13a50.r2.dev/profile.jpg",
  "social": {
    "email": "gudrb963@gmail.com",
    "github": "https://github.com/GHGHGHKO"
  },
  "aboutMe": "Java·Spring Boot 기반으로 편의점 택배와 통합회원 서비스를 개발해 온 백엔드 엔지니어입니다. 제휴 연동, 공통 인증·인가, 회원 보안 개선, 운영 로그·조회 환경 개선을 맡았습니다. AWS KMS 기반 택배 인증 서버와 사내 LLM API·운영 조회 도구를 연결한 AI Agent를 설계·구현했고, 로그 감축과 미처리 업무 복구는 확인된 범위와 검증 근거를 구분해 개선했습니다.",
  "skills": [
    "Java 11 (기타 업무 서비스)",
    "Java 21 (blackpink·Spring Batch)",
    "Spring Boot",
    "Spring Security",
    "Spring Batch",
    "Oracle / PostgreSQL",
    "MyBatis / JPA",
    "Redis",
    "AWS KMS / IAM / Lambda",
    "Kubernetes / Docker",
    "JUnit 5",
    "Datadog / Scouter",
    "OpenSearch / Athena",
    "사내 LLM API 연동"
  ],
  "projects": [
    {
      "name": "우리동네GS 택배 인증·인가 서버 (blackpink)",
      "description": "AWS KMS 기반 stateless 토큰 발급·검증·갱신과 Spring Security 권한 처리를 직접 설계·구현한 프로젝트 (Java 21).",
      "skills": [
        "Java 21",
        "Spring Boot",
        "Spring Security",
        "AWS KMS"
      ],
      "links": [],
      "detail": {
        "problem": "우리동네GS 앱과 택배 서비스 연동에서 호출 주체별 인증과 고객 데이터 접근 제어가 필요했습니다.",
        "analyze": [
          "우리동네GS 앱·홈페이지·현장 장비 등 연동 주체별 인증과 API 권한을 구분해야 했습니다.",
          "토큰에서 고객 식별자를 추출하는 인증 단계와 API의 고객 데이터 조회를 분리해 처리했습니다."
        ],
        "action": [
          "AWS KMS 서명·암호화를 결합한 토큰 발급·검증·갱신 흐름과 Spring Security 필터·인가 규칙을 설계·구현했습니다.",
          "JWT sub의 인접 식별자 추측 위험을 고려해 고객 식별자를 암호화하고, KMS Verify·Decrypt·GenerateDataKey를 사용하는 토큰 발급·검증·갱신 흐름을 구현했습니다.",
          "IAM 접근 제어와 Spring Security Filter Chain의 서비스·장비별 API 권한 처리를 구성했습니다."
        ],
        "result": [
          "임의 생성 JWT의 인증 거부와 개발 환경 대칭 암호화 키 회전 후 기존 암호문의 복호화를 확인했습니다.",
          "우리동네GS·물류센터 소터기·편의점 택배장비·방문택배 등 공통 인증 적용을 지원했습니다. 전체 장비 인증을 일괄 전환한 성과로 확대하지 않습니다."
        ]
      }
    },
    {
      "name": "GS25·GSSHOP 통합회원(GRM) 출시 이후 운영 고도화",
      "description": "2025년 10월부터 통합회원 인증·보안 개선, 운영 로그 감축·장기 조회 및 AI Agent 구현을 담당했습니다.",
      "skills": [
        "Java 11",
        "Spring Boot",
        "PostgreSQL",
        "OpenSearch",
        "AWS Athena"
      ],
      "links": [],
      "detail": {
        "problem": "출시 이후 통합회원 서비스의 계정 도용 취약점, 개인정보 보호 및 운영 로그 적재량을 개선해야 했습니다.",
        "analyze": [
          "비밀번호 찾기 인증 우회와 요청 회원번호 변조 등 인증·인가 경로를 점검했습니다.",
          "운영 로그를 실측해 UI 로그와 회원 API의 중복 요청 파라미터 로깅을 분리해 분석했습니다."
        ],
        "action": [
          "비밀번호 찾기 인증 우회와 요청 회원번호 변조를 보완하고, 오답 입력으로 인증번호 만료가 연장되던 결함은 최초 발급 시각 기준으로 판정하도록 수정했습니다.",
          "회원 API에서 중복 로깅 구문 155개를 제거하고 Nuxt debug 로그를 정리해 개발·운영 로그 적재 여부를 확인했습니다.",
          "AWS Lambda 기반 코드 리뷰 Agent와 Datadog 알림에서 시작해 운영 근거를 분석·전달하는 장애 분석 Agent를 구현했습니다. 자동 복구·원인 확정은 수행하지 않습니다."
        ],
        "result": [
          "본인 담당 로그 변경분에서 트래픽 보정 후 약 43.5GB/일 적재량 감소를 확인했습니다. 팀 1차 배포 기준 GRM 전체는 약 87GB/일(40.7%) 감소했습니다.",
          "AI 코드리뷰 봇의 실제 결함 발견 효과는 별도 성과 지표로 검증되지 않았습니다."
        ]
      }
    },
    {
      "name": "편의점택배 제휴·방문택배 백엔드",
      "description": "편의점 택배 제휴 연동과 POS 취소 확인 흐름, CJ대한통운 방문택배 백엔드 개발·운영을 담당했습니다.",
      "skills": [
        "Java 11",
        "Spring Boot",
        "PostgreSQL",
        "Spring Batch"
      ],
      "links": [],
      "detail": {
        "problem": "제휴사마다 다른 접수·상태 전송 규약과 택배사 인터페이스를 안정적으로 운영해야 했습니다.",
        "analyze": [
          "선결제 운송장 환불 후 다른 점포에서 재접수할 수 있는 흐름과 방문택배 외부 상태 코드 미등록 문제를 확인했습니다."
        ],
        "action": [
          "외부 제휴 연동과 POS 취소 확인 흐름을 개발하고, CJ대한통운 방문택배 연동·운영 대응을 맡았습니다.",
          "별도 취소 조회 전문과 취소 판별 로직을 구현하고 POS 담당자와 응답 규격·처리 방식을 협의했습니다.",
          "방문택배의 상태 코드 누락으로 미처리된 86건은 공통코드 등록과 배치 재실행으로 복구하고 DB·Backoffice·알림톡 기록을 확인했습니다."
        ],
        "result": [
          "선결제 운송장과 주문 행 유무를 이용한 취소 판별 응답을 개발 환경과 운영 환경에서 확인했습니다. POS 프로그램 구현은 별도 담당 범위입니다.",
          "미처리 86건은 애플리케이션 코드 수정·배포가 아닌 운영 공통코드 등록과 배치 재실행으로 복구했습니다. 정확한 복구 시간은 산출하지 않았습니다."
        ]
      }
    },
    {
      "name": "RunMarket | AI 보조 개인 프로젝트",
      "description": "AI 도구를 활용해 러너 위치 공유 앱·서비스를 제작하고 iOS App Store와 Google Play에 출시했습니다. 부하 실험은 러너 위치 송신 경로에 한정됐습니다.",
      "skills": [
        "React Native",
        "Expo",
        "Spring WebFlux",
        "Redis",
        "Kubernetes",
        "Helm"
      ],
      "links": [
        {
          "name": "서비스",
          "url": "https://about.runmarket.cc/"
        },
        {
          "name": "GitHub 저장소",
          "url": "https://github.com/runmarket-cc/runmarket-pacer"
        }
      ],
      "detail": {
        "problem": "러너와 관전자가 위치를 공유하는 앱을 개인 프로젝트로 제작했습니다.",
        "analyze": [
          "k6 실험은 러너 위치 송신만 대상으로 했으며 관전자 구독·브로드캐스트와 전체 모바일 앱 흐름은 검증하지 않았습니다.",
          "러너 수가 많아졌을 때 클라이언트 UI 크래시가 관찰됐습니다."
        ],
        "action": [
          "AI 도구를 활용해 모바일 앱·서버·배포 구성을 만들고 양대 앱 스토어에 출시했습니다.",
          "앱 기능을 수동 확인하고 공개 저장소의 과장된 부하 테스트 표현을 정정했습니다."
        ],
        "result": [
          "iOS App Store와 Google Play에 앱을 출시했습니다.",
          "1,000명 동시 처리량, 오류율 0% 또는 종단 간 관전자 전달 성능은 검증된 결과로 제시하지 않습니다."
        ]
      }
    }
  ],
  "experience": [
    {
      "company": "GS리테일 | 통합서비스팀",
      "title": "매니저 · 백엔드 엔지니어",
      "dateRange": "2025.10 – 현재",
      "bullets": [
        "GS25·GSSHOP 통합회원의 출시 이후 인증·회원 보안 개선과 운영 로그·조회 환경을 담당",
        "Nuxt·회원 API 로그 개선분에서 트래픽 보정 후 약 43.5GB/일 적재량 감소 확인 (2026.09 비교 구간)",
        "AWS Lambda와 사내 LLM API·운영 조회 도구를 연결한 코드 리뷰 Agent 및 Datadog 연동 장애 분석 Agent 구현",
        "2026.08부터 ISMS-P·계정 도용 방지 프로젝트 IT Leader로 외주 개발자 2명 온보딩·코드 리뷰, DB 테이블·인덱스·권한 관리 및 서비스 일정 조율"
      ]
    },
    {
      "company": "GS네트웍스 → GS리테일 | GS25 라이프스타일플랫폼팀",
      "title": "매니저 · 백엔드 엔지니어",
      "dateRange": "2021.08 – 2025.10 (2022.10 소속 변경)",
      "bullets": [
        "blackpink 인증·인가 서버의 KMS 기반 토큰 흐름과 Spring Security 권한 처리 설계·구현 (Java 21)",
        "택배 제휴 연동, POS 취소 확인 흐름, 공통 인증·인가 및 CJ대한통운 방문택배 백엔드 개발",
        "방문택배 상태 코드 누락으로 미처리된 86건을 공통코드 등록·배치 재실행으로 복구"
      ]
    },
    {
      "company": "마인드패스",
      "title": "공동창업자",
      "dateRange": "2018.11.30 – 2021.02.08",
      "bullets": [
        "GoogLeNet/CNN 기반 입술 움직임 인식 PoC 제작 및 실시간 시연 (상용 정확도 주장 아님)",
        "위치 기반 Android 리마인더 앱 개발과 Linux 서버·DB 운영",
        "창업지원사업 자료·발표 준비를 통해 5,000만 원 및 3,000만 원 프로그램 지원금 확보 (매출·투자 아님)"
      ]
    }
  ],
  "activities": [
    {
      "name": "모두의연구소 코칭스터디",
      "organization": "기술 멘토링",
      "dateRange": "2023 – 2025",
      "bullets": [
        "Python·Data Science·Gen AI 학습자 대상 기술 멘토링 및 실습 코칭"
      ]
    },
    {
      "name": "Rust 핵심 개념과 메모리 안전성 모델",
      "organization": "GS리테일 사내 기술 세미나",
      "dateRange": "2024",
      "bullets": [
        "Ownership·Borrowing 등 Rust 메모리 관리 개념을 사내 엔지니어에게 발표"
      ],
      "link": "https://gsretail.tistory.com/39"
    }
  ],
  "education": [
    {
      "school": "건국대학교 글로컬캠퍼스",
      "degree": "컴퓨터공학과 학사",
      "dateRange": "2014.03 – 2020.02",
      "achievements": [
        "학과 실습 서버 유지보수 및 CentOS에서 Ubuntu로의 전환",
        "신입생 계정 발급·졸업생 계정 차단, 사용자별 웹서버·DB 계정 제공 및 fork 프로세스 관리",
        "학부 연구실에서 창업 프로젝트 시작"
      ]
    }
  ]
};
