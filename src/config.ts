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
  "aboutMe": "Java·Spring Boot 기반으로 편의점 택배와 통합회원 서비스를 개발해 온 백엔드 엔지니어입니다. 제휴 연동, 공통 인증·인가, 회원 보안 개선, 운영 로그·조회 환경 개선을 맡았습니다. AWS KMS 기반 택배 인증 서버를 설계·구현했고, 로그 적재량 개선과 미처리 업무 복구까지 개발과 운영을 함께 담당했습니다.",
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
      "description": "2025년 10월부터 통합회원 인증·보안 개선과 운영 로그 감축·장기 조회 환경을 담당했습니다.",
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
          "회원 API에서 중복 로깅 구문 155개를 제거하고 Nuxt debug 로그를 정리해 개발·운영 로그 적재 여부를 확인했습니다."
        ],
        "result": [
          "본인 담당 로그 변경분에서 트래픽 보정 후 약 43.5GB/일 적재량 감소를 확인했습니다. 팀 1차 배포 기준 GRM 전체는 약 87GB/일(40.7%) 감소했습니다.",
          "비밀번호 찾기 인증·요청 회원 식별·인증번호 만료 결함 3건을 운영에 반영하고 최종 확인했습니다."
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
        "AI 코드 리뷰 Agent 설계·구현: Bitbucket PR과 AWS Lambda, 사내 LLM API를 연결해 코드·사용처와 필요 시 로그·APM·SQL을 검토하고 증분 리뷰·PR 코멘트 작성 자동화 (2026.10–현재)",
        "2026.10.19–11.08 공개 집계에서 대상 PR 91건 중 85건 리뷰 (약 93%, 정확도가 아닌 리뷰 커버리지). 개발자의 코드 수정과 검증으로 이어진 사례를 회사 기술 블로그에 기고",
        "AI 장애 분석 Agent 구현: Datadog Monitor → Workflow → Lambda를 연결해 APM·외부 연동 로그·Scouter SQL을 분석하고 결과 전달 자동화. 자동 복구·운영 변경은 수행하지 않음",
        "Nuxt·회원 API 로그 개선분에서 트래픽 보정 후 약 43.5GB/일 적재량 감소 확인 (2026.09 비교 구간)",
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
      "name": "GS리테일의 AI 코드 리뷰 도입기",
      "organization": "회사 기술 블로그 기고",
      "dateRange": "2026.11",
      "bullets": [
        "Agent 설계, 증분 리뷰와 운영 집계, 사람의 검토 경계를 정리한 도입 경험 공유"
      ],
      "link": "https://gsretail.tistory.com/100"
    },
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
export const siteConfig = {
  "name": "고형규",
  "title": "백엔드 · AI Agent 엔지니어 | Java · Spring Boot · AWS",
  "description": "고형규의 백엔드·AI Agent 포트폴리오. PR 코드 리뷰와 Datadog 장애 분석 Agent를 설계·구현합니다.",
  "accentColor": "#1d4ed8",
  "profilePhoto": "https://pub-1d62bbed806549fe95a5676d3fc13a50.r2.dev/profile.jpg",
  "social": {
    "email": "gudrb963@gmail.com",
    "github": "https://github.com/GHGHGHKO",
    "blog": "https://gsretail.tistory.com/100"
  },
  "aboutMe": "Java·Spring Boot 백엔드 경험을 바탕으로 코드 리뷰와 장애 분석을 돕는 AI Agent를 설계·구현합니다. 사내 LLM API에 코드·로그·APM·SQL 조회 도구를 연결하고, 분석 결과는 확인된 근거와 불확실성을 구분해 전달하도록 구성했습니다. 편의점 택배·통합회원 서비스의 인증·인가, 보안과 운영 개선을 맡아 왔으며 AI의 제안은 담당자 확인과 개발 환경 검증을 거쳐 적용합니다.",
  "skills": [
    "AI Agent 설계·구현",
    "사내 LLM API · 도구 연동",
    "AWS Lambda",
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
    "OpenSearch / Athena"
  ],
  "projects": [
    {
      "name": "AI 코드 리뷰 Agent",
      "description": "Bitbucket PR에서 코드·사용처·운영 근거를 검토하고 인라인·요약 코멘트를 남기는 Agent를 설계·구현했습니다. 공개 집계에서 리뷰 대상 91개 PR 중 85개에 리뷰를 남겼습니다 (약 93%, 2026.10.19–11.08).",
      "skills": [
        "LLM API",
        "Agent Tool Calling",
        "Bitbucket Webhook",
        "AWS Lambda",
        "Datadog / OpenSearch / Scouter"
      ],
      "links": [
        {
          "name": "기술 블로그 · AI 코드 리뷰 도입기",
          "url": "https://gsretail.tistory.com/100"
        }
      ],
      "detail": {
        "problem": "스타일 검사만으로 찾기 어려운 버그·정합성·보안·배포 선후관계와 다른 호출 경로의 변경 누락을 PR 단계에서 검토하고자 했습니다.",
        "analyze": [
          "diff뿐 아니라 주변 코드·관련 사용처를 함께 살피고, 필요할 때 로그·APM·SQL 등 운영 근거를 조회하도록 설계했습니다.",
          "실수로 열거나 바로 병합하는 PR은 검토 대상에서 제외하고, 코드 변경·승인·병합은 사람이 결정하도록 경계를 정했습니다."
        ],
        "action": [
          "Bitbucket PR 생성·업데이트 Webhook과 AWS Lambda를 연결하고, 비동기 실행·30초 유예·열린 PR 및 최신 커밋 확인을 구현했습니다.",
          "사내 LLM API에 코드와 OpenSearch·Datadog APM·Scouter SQL 조회 도구를 연결해 근거와 불확실성을 구분한 인라인·요약 코멘트를 작성하도록 했습니다.",
          "새 커밋은 이전 분석 문맥과 함께 추가 변경분을 검토하고 수정 여부를 PR 코멘트로 남기도록 했습니다.",
          "Datadog Agent Observability로 호출 경로·단계별 시간·토큰·추정 비용을 관측하도록 연결했습니다."
        ],
        "result": [
          "2026.10.19–11.08 공개 글 집계 기준: 리뷰 대상 PR 91건 중 85건에 리뷰 작성 (약 93%). 리뷰 실행 125회 중 새 커밋 증분 리뷰 40회가 포함됩니다. 93%는 리뷰 커버리지이며 정확도가 아닙니다.",
          "로그인 실패 이력의 트랜잭션 롤백 위험과 다른 자동 로그인 경로의 기록 누락을 지적했고, 수정 후 실패 이력이 남는 동작을 담당자에게 확인받았습니다.",
          "외부 인증정보의 ID 형식 차이로 정상 데이터가 삭제될 수 있는 경로를 지적해 삭제 중단 조건 반영으로 이어졌습니다.",
          "PR 유예 중 닫기·병합 시 미실행을 확인했습니다. 오탐은 사람이 검토하며 정확도·생산성 개선율은 별도로 검증하지 않았습니다."
        ]
      }
    },
    {
      "name": "AI 장애 분석 Agent",
      "description": "Datadog 알림을 시작으로 APM·외부 연동 로그·SQL 실행 정보를 조회하고 분석 결과를 전달하는 자동화 흐름을 구현했습니다. 여러 운영 도구를 오가던 분석 과정을 Agent로 연결했습니다.",
      "skills": [
        "LLM API",
        "Datadog Workflow",
        "AWS Lambda",
        "APM / Flame Graph",
        "Scouter SQL"
      ],
      "links": [],
      "detail": {
        "problem": "알림을 받은 뒤 호출 흐름·외부 응답·SQL 실행 정보를 여러 도구에서 모아 장애 상황을 파악해야 했습니다.",
        "analyze": [
          "APM Trace·Flame Graph의 호출 흐름과 timeout 지점, 외부 시스템 요청·응답, SQL 실행 빈도·소요 시간을 함께 분석하도록 구성했습니다.",
          "PR 코드 리뷰와 별도로 Datadog Monitor 알림을 시작 이벤트로 사용했습니다."
        ],
        "action": [
          "Datadog Monitor → Datadog Workflow → Lambda Agent → 운영 근거 분석 → 결과 전달 흐름을 구현했습니다.",
          "APM Trace·Flame Graph, 외부 연동 로그 및 Scouter SQL 조회 도구를 Agent에 연결했습니다."
        ],
        "result": [
          "GS&POINT 연동 장애 분석에 적용했습니다. 알림에서 Agent 실행·분석 결과 전달까지 자동화했습니다.",
          "자동 복구·운영 변경·장애 원인 확정은 자동화 범위에 포함하지 않았습니다. 정확도·MTTR 개선 수치는 별도로 검증하지 않았습니다."
        ]
      }
    },
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
        "사내 LLM API·코드·운영 조회 도구를 연결한 AI 코드 리뷰 Agent 설계·구현 (2026.10–현재)",
        "Datadog Monitor·Workflow·Lambda를 연결해 장애 분석과 결과 전달 자동화",
        "GS25·GSSHOP 통합회원의 출시 이후 인증·회원 보안 개선과 운영 로그·조회 환경을 담당",
        "Nuxt·회원 API 로그 개선분에서 트래픽 보정 후 약 43.5GB/일 적재량 감소 확인 (2026.09 비교 구간)",
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
      "name": "GS리테일의 AI 코드 리뷰 도입기",
      "organization": "회사 기술 블로그 기고",
      "dateRange": "2026.11",
      "bullets": [
        "Agent 설계, 증분 리뷰와 운영 집계, 사람의 검토 경계를 정리한 도입 경험 공유"
      ],
      "link": "https://gsretail.tistory.com/100"
    },
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
  ],
  "aiHighlight": {
    "eyebrow": "BACKEND × AI AGENTS",
    "title": "코드 리뷰와 장애 분석을 AI Agent로 연결합니다.",
    "summary": "PR 코드 리뷰부터 Datadog 알림 기반 장애 분석까지, 사내 LLM API에 실무 도구를 연결해 개발·운영 흐름을 자동화했습니다.",
    "tags": [
      "PR 코드 리뷰 Agent",
      "장애 분석 Agent"
    ],
    "linkLabel": "AI 프로젝트 보기",
    "link": "#projects"
  }
};
