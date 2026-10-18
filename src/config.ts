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
  "aboutMe": "택배·회원 서비스의 인증, 제휴 연동, 보안 및 운영 개선을 맡아온 백엔드 엔지니어입니다. 우리동네GS 택배 인증·인가 서버의 토큰 발급·검증·갱신과 권한 처리를 설계·구현했고, 편의점택배 제휴 연동 및 팀의 IDC→AWS 이관에 참여했습니다. 현재는 GS25·GSSHOP 통합회원 플랫폼의 출시 이후 보안·개인정보·운영 개선을 담당합니다.",
  "skills": [
    "Java 11 (기타 업무 서비스)",
    "Java 21 (blackpink·Spring Batch)",
    "Spring Boot",
    "Spring Security",
    "Spring Batch",
    "JPA / QueryDSL",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Kubernetes",
    "Docker",
    "Airflow",
    "Python",
    "Datadog",
    "OpenSearch / Athena"
  ],
  "projects": [
    {
      "name": "우리동네GS 택배 인증·인가 서버 (blackpink)",
      "description": "AWS KMS 기반 stateless 토큰 발급·검증·갱신과 Spring Security 권한 처리를 직접 설계·구현한 프로젝트 (Java 21).",
      "skills": [
        "Java 21",
        "Spring Boot",
        "Spring Security",
        "AWS KMS",
        "Redis"
      ],
      "links": [],
      "detail": {
        "problem": "우리동네GS 앱과 택배 서비스 연동에서 호출 주체별 인증과 고객 데이터 접근 제어가 필요했습니다.",
        "analyze": [
          "앱·홈페이지·현장 장비 등 연동 주체별 API 접근 범위와 고객 데이터 소유권 검사가 필요했습니다.",
          "GRM 발급 토큰 검증과 택배 회원 식별은 실제 계정 연결 API와 분리된 단계였습니다."
        ],
        "action": [
          "AWS KMS 서명·암호화를 결합한 토큰 발급·검증·갱신 흐름과 Spring Security 필터·인가 규칙을 설계·구현했습니다.",
          "GRM 발급 토큰 검증 및 이름·CI 기반 회원 식별 단계를 구현했습니다. 실제 계정 연결 API는 다른 담당자가 구현했습니다.",
          "현장 장비와 키오스크 게스트 인증을 구현했습니다."
        ],
        "result": [
          "연동 시스템별 API와 예약·주소 등 고객 데이터의 접근을 통제했습니다.",
          "약 18,000대 현장 장비의 인증 경로를 운영했습니다."
        ]
      }
    },
    {
      "name": "GS25·GSSHOP 통합회원(GRM) 출시 이후 운영 고도화",
      "description": "2025년 10월 합류 이후 인증·인가 취약점 수정, CI 암호화, 회원 정책 개선 및 운영 로그 절감을 담당했습니다. 초기 플랫폼 구축과 데이터 이관에는 참여하지 않았습니다.",
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
          "OTP 검증 우회와 타 계정 정보 접근 가능성 등 인증·인가 경로를 점검했습니다.",
          "운영 로그를 실측해 UI 로그와 회원 API의 중복 요청 파라미터 로깅을 분리해 분석했습니다."
        ],
        "action": [
          "인증·인가 취약점을 수정하고 가입·재가입 정책 및 CI 암호화 경로를 개선했습니다.",
          "회원 API의 중복 요청 파라미터 로그 155건과 UI 서비스의 불필요한 로그를 정리했습니다.",
          "AWS Lambda 기반 AI 코드리뷰 봇을 구축해 production 대상 PR의 변경 내용과 운영 관측 데이터를 함께 검토하도록 구성했습니다."
        ],
        "result": [
          "본인 담당 로그 변경분에서 트래픽 보정 후 약 43.5GB/일 적재량 감소를 확인했습니다. 팀 1차 배포 기준 GRM 전체는 약 87GB/일(40.7%) 감소했습니다.",
          "AI 코드리뷰 봇의 실제 결함 발견 효과는 별도 성과 지표로 검증되지 않았습니다."
        ]
      }
    },
    {
      "name": "편의점택배 제휴·방문택배 백엔드",
      "description": "10여 개 제휴사의 접수·상태 전송 연동과 택배사 API 전환, 예약·방문택배 운영을 담당했습니다.",
      "skills": [
        "Java 11",
        "Spring Boot",
        "PostgreSQL",
        "Airflow"
      ],
      "links": [],
      "detail": {
        "problem": "제휴사마다 다른 접수·상태 전송 규약과 택배사 인터페이스를 안정적으로 운영해야 했습니다.",
        "analyze": [
          "CJ대한통운 미접수 연동의 FTP 전문을 분석해 OpenAPI 전환 요구사항을 정리했습니다.",
          "점포 취소 후 동일 운송장을 재접수하는 어뷰징과 방문택배 취소 코드 누락을 확인했습니다."
        ],
        "action": [
          "토스·네이버·번개장터·쇼피 등 10여 개 제휴사의 접수·상태 연동을 개발·운영했습니다.",
          "CJ대한통운 미접수 연동을 FTP에서 OpenAPI로 전환하고 API 토큰 갱신 배치를 구축했습니다.",
          "POS 취소 신호와 택배 예약·주소록·방문택배 처리 경로를 구현했습니다."
        ],
        "result": [
          "환불 후 동일 운송장 재접수 어뷰징을 차단했습니다.",
          "방문택배 취소 코드 누락으로 미처리된 86건의 취소·환불·상태·알림 작업을 수정 배포 후 1시간 26분 만에 복구했습니다."
        ]
      }
    },
    {
      "name": "택배 서비스 IDC→AWS 이관 (팀 공동 작업)",
      "description": "13개 서비스와 이기종 DB 2종의 이관에서 MWAA 배치 전환, 쿼리 수정 가이드 및 EKS 실행 환경 개선을 담당했습니다.",
      "skills": [
        "Java 11",
        "AWS MWAA",
        "EKS",
        "Aurora PostgreSQL",
        "Airflow"
      ],
      "links": [],
      "detail": {
        "problem": "IDC의 API·배치·DB를 AWS로 전환하면서 기존 택배 서비스의 운영 연속성을 유지해야 했습니다.",
        "analyze": [
          "PPAS(EDB) 종속 쿼리와 Airflow DAG의 전환 순서, 배치 실행 환경의 콜드스타트 지연을 확인했습니다."
        ],
        "action": [
          "팀과 함께 Airflow DAG 약 250개를 MWAA로 옮기고 태스크 80개를 통폐합했습니다.",
          "내부·외주 구성원이 쿼리 전환에 참여할 수 있도록 수정 가이드와 코드 기여 방식을 정리했습니다.",
          "EKS Fargate의 Java Pod 준비 지연을 벤치마크로 확인하고 EC2 노드그룹 전환에 참여했습니다."
        ],
        "result": [
          "13개 서비스와 이기종 DB 2종의 IDC→AWS 전환에 공동 기여했습니다.",
          "인프라 비용 절감이나 전체 이관을 단독 리드한 성과로 표기하지 않습니다."
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
          "name": "GitHub",
          "url": "https://github.com/runmarket-cc"
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
        "GS25·GSSHOP 통합회원 플랫폼의 출시 이후 인증·인가 보안, CI 암호화 및 회원 정책을 개선",
        "운영 로그 중복을 정리해 본인 담당 변경분 약 43.5GB/일 적재량 감소 확인",
        "AWS Lambda 기반 AI 코드리뷰 봇 설계·구축"
      ]
    },
    {
      "company": "GS네트웍스 → GS리테일 | GS25 라이프스타일플랫폼팀",
      "title": "매니저 · 백엔드 엔지니어",
      "dateRange": "2021.08 – 2025.10 (2022.10 소속 변경)",
      "bullets": [
        "blackpink 인증·인가 서버의 KMS 기반 토큰 흐름과 Spring Security 권한 처리 설계·구현 (Java 21)",
        "10여 개 제휴사의 택배 접수·상태 연동, CJ대한통운 FTP→OpenAPI 전환, 방문택배 백엔드 개발",
        "팀의 13개 서비스·이기종 DB 2종 IDC→AWS 이관에서 MWAA 배치·쿼리 전환·EKS 실행 환경 개선에 기여"
      ]
    },
    {
      "company": "마인드패스",
      "title": "공동창업자",
      "dateRange": "2018.11 – 2021.02",
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
      "dateRange": "2014.03 – 2021.02",
      "achievements": [
        "교내 서버실 서버장으로 미사용 베어메탈 서버의 OS를 CentOS에서 Ubuntu로 전환해 학생 실습 환경 제공",
        "전교생 대상 SSH 접속 계정 발급 및 계정별 웹서버 실습 환경 제공",
        "3학년 재학 중 마인드패스 공동창업"
      ]
    }
  ]
};
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
  "aboutMe": "택배·회원 서비스의 인증, 제휴 연동, 보안 및 운영 개선을 맡아온 백엔드 엔지니어입니다. 우리동네GS 택배 인증·인가 서버의 토큰 발급·검증·갱신과 권한 처리를 설계·구현했고, 편의점택배 제휴 연동 및 팀의 IDC→AWS 이관에 참여했습니다. 현재는 GS25·GSSHOP 통합회원 플랫폼의 출시 이후 보안·개인정보·운영 개선을 담당합니다.",
  "skills": [
    "Java 11 (기타 업무 서비스)",
    "Java 21 (blackpink·Spring Batch)",
    "Spring Boot",
    "Spring Security",
    "Spring Batch",
    "JPA / QueryDSL",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Kubernetes",
    "Docker",
    "Airflow",
    "Python",
    "Datadog",
    "OpenSearch / Athena"
  ],
  "projects": [
    {
      "name": "우리동네GS 택배 인증·인가 서버 (blackpink)",
      "description": "AWS KMS 기반 stateless 토큰 발급·검증·갱신과 Spring Security 권한 처리를 직접 설계·구현한 프로젝트 (Java 21).",
      "skills": [
        "Java 21",
        "Spring Boot",
        "Spring Security",
        "AWS KMS",
        "Redis"
      ],
      "links": [],
      "detail": {
        "problem": "우리동네GS 앱과 택배 서비스 연동에서 호출 주체별 인증과 고객 데이터 접근 제어가 필요했습니다.",
        "analyze": [
          "앱·홈페이지·현장 장비 등 연동 주체별 API 접근 범위와 고객 데이터 소유권 검사가 필요했습니다.",
          "GRM 발급 토큰 검증과 택배 회원 식별은 실제 계정 연결 API와 분리된 단계였습니다."
        ],
        "action": [
          "AWS KMS 서명·암호화를 결합한 토큰 발급·검증·갱신 흐름과 Spring Security 필터·인가 규칙을 설계·구현했습니다.",
          "GRM 발급 토큰 검증 및 이름·CI 기반 회원 식별 단계를 구현했습니다. 실제 계정 연결 API는 다른 담당자가 구현했습니다.",
          "현장 장비와 키오스크 게스트 인증을 구현했습니다."
        ],
        "result": [
          "연동 시스템별 API와 예약·주소 등 고객 데이터의 접근을 통제했습니다.",
          "약 18,000대 현장 장비의 인증 경로를 운영했습니다."
        ]
      }
    },
    {
      "name": "GS25·GSSHOP 통합회원(GRM) 출시 이후 운영 고도화",
      "description": "2025년 10월 합류 이후 인증·인가 취약점 수정, CI 암호화, 회원 정책 개선 및 운영 로그 절감을 담당했습니다. 초기 플랫폼 구축과 데이터 이관에는 참여하지 않았습니다.",
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
          "OTP 검증 우회와 타 계정 정보 접근 가능성 등 인증·인가 경로를 점검했습니다.",
          "운영 로그를 실측해 UI 로그와 회원 API의 중복 요청 파라미터 로깅을 분리해 분석했습니다."
        ],
        "action": [
          "인증·인가 취약점을 수정하고 가입·재가입 정책 및 CI 암호화 경로를 개선했습니다.",
          "회원 API의 중복 요청 파라미터 로그 155건과 UI 서비스의 불필요한 로그를 정리했습니다.",
          "AWS Lambda 기반 AI 코드리뷰 봇을 구축해 production 대상 PR의 변경 내용과 운영 관측 데이터를 함께 검토하도록 구성했습니다."
        ],
        "result": [
          "본인 담당 로그 변경분에서 트래픽 보정 후 약 43.5GB/일 적재량 감소를 확인했습니다. 팀 1차 배포 기준 GRM 전체는 약 87GB/일(40.7%) 감소했습니다.",
          "AI 코드리뷰 봇의 실제 결함 발견 효과는 별도 성과 지표로 검증되지 않았습니다."
        ]
      }
    },
    {
      "name": "편의점택배 제휴·방문택배 백엔드",
      "description": "10여 개 제휴사의 접수·상태 전송 연동과 택배사 API 전환, 예약·방문택배 운영을 담당했습니다.",
      "skills": [
        "Java 11",
        "Spring Boot",
        "PostgreSQL",
        "Airflow"
      ],
      "links": [],
      "detail": {
        "problem": "제휴사마다 다른 접수·상태 전송 규약과 택배사 인터페이스를 안정적으로 운영해야 했습니다.",
        "analyze": [
          "CJ대한통운 미접수 연동의 FTP 전문을 분석해 OpenAPI 전환 요구사항을 정리했습니다.",
          "점포 취소 후 동일 운송장을 재접수하는 어뷰징과 방문택배 취소 코드 누락을 확인했습니다."
        ],
        "action": [
          "토스·네이버·번개장터·쇼피 등 10여 개 제휴사의 접수·상태 연동을 개발·운영했습니다.",
          "CJ대한통운 미접수 연동을 FTP에서 OpenAPI로 전환하고 API 토큰 갱신 배치를 구축했습니다.",
          "POS 취소 신호와 택배 예약·주소록·방문택배 처리 경로를 구현했습니다."
        ],
        "result": [
          "환불 후 동일 운송장 재접수 어뷰징을 차단했습니다.",
          "방문택배 취소 코드 누락으로 미처리된 86건의 취소·환불·상태·알림 작업을 수정 배포 후 1시간 26분 만에 복구했습니다."
        ]
      }
    },
    {
      "name": "택배 서비스 IDC→AWS 이관 (팀 공동 작업)",
      "description": "13개 서비스와 이기종 DB 2종의 이관에서 MWAA 배치 전환, 쿼리 수정 가이드 및 EKS 실행 환경 개선을 담당했습니다.",
      "skills": [
        "Java 11",
        "AWS MWAA",
        "EKS",
        "Aurora PostgreSQL",
        "Airflow"
      ],
      "links": [],
      "detail": {
        "problem": "IDC의 API·배치·DB를 AWS로 전환하면서 기존 택배 서비스의 운영 연속성을 유지해야 했습니다.",
        "analyze": [
          "PPAS(EDB) 종속 쿼리와 Airflow DAG의 전환 순서, 배치 실행 환경의 콜드스타트 지연을 확인했습니다."
        ],
        "action": [
          "팀과 함께 Airflow DAG 약 250개를 MWAA로 옮기고 태스크 80개를 통폐합했습니다.",
          "내부·외주 구성원이 쿼리 전환에 참여할 수 있도록 수정 가이드와 코드 기여 방식을 정리했습니다.",
          "EKS Fargate의 Java Pod 준비 지연을 벤치마크로 확인하고 EC2 노드그룹 전환에 참여했습니다."
        ],
        "result": [
          "13개 서비스와 이기종 DB 2종의 IDC→AWS 전환에 공동 기여했습니다.",
          "인프라 비용 절감이나 전체 이관을 단독 리드한 성과로 표기하지 않습니다."
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
          "name": "GitHub",
          "url": "https://github.com/runmarket-cc"
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
        "GS25·GSSHOP 통합회원 플랫폼의 출시 이후 인증·인가 보안, CI 암호화 및 회원 정책을 개선",
        "운영 로그 중복을 정리해 본인 담당 변경분 약 43.5GB/일 적재량 감소 확인",
        "AWS Lambda 기반 AI 코드리뷰 봇 설계·구축"
      ]
    },
    {
      "company": "GS네트웍스 → GS리테일 | GS25 라이프스타일플랫폼팀",
      "title": "매니저 · 백엔드 엔지니어",
      "dateRange": "2021.08 – 2025.10 (2022.10 소속 변경)",
      "bullets": [
        "blackpink 인증·인가 서버의 KMS 기반 토큰 흐름과 Spring Security 권한 처리 설계·구현 (Java 21)",
        "10여 개 제휴사의 택배 접수·상태 연동, CJ대한통운 FTP→OpenAPI 전환, 방문택배 백엔드 개발",
        "팀의 13개 서비스·이기종 DB 2종 IDC→AWS 이관에서 MWAA 배치·쿼리 전환·EKS 실행 환경 개선에 기여"
      ]
    },
    {
      "company": "마인드패스",
      "title": "공동창업자",
      "dateRange": "2018.11 – 2021.02",
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
      "dateRange": "2014.03 – 2021.02",
      "achievements": []
    }
  ]
};
