export const accountPlans = [
  {
    accountId: 'samsung-ena',
    accountName: '삼성 E&A',
    annualGoal: '$11M',
    annualGoalNum: 11111111,
    strategy: '사우디 가스처리 DCS 수주 완료 후 계측장비/Forge 크로스셀 확대. Emerson 기존 관계 차단 위해 의사결정권자 Executive 레벨 접촉 강화.',
    keyInitiative: 'DCS+SIS 통합 패키지 수주 → Forge 디지털 번들 제안',
    quarters: {
      Q1: [
        { action: 'Experion PKS 기술 세미나 개최 (판교)', status: '진행중', priority: 'high' },
        { action: 'Saudi Aramco 레퍼런스 자료 패키지 전달', status: '완료', priority: 'high' },
        { action: '기술팀 팀장 1:1 미팅 (Emerson 비교표 준비)', status: '예정', priority: 'medium' },
      ],
      Q2: [
        { action: '최종 협상 계약 조건 논의', status: '예정', priority: 'high' },
        { action: '계측장비 번들 추가 제안서 제출', status: '예정', priority: 'medium' },
        { action: 'HQ 임원진 방한 및 경영진 면담', status: '예정', priority: 'high' },
      ],
      Q3: [
        { action: 'Forge 파일럿 제안서 작성 및 제출', status: '예정', priority: 'medium' },
        { action: '프로젝트 킥오프 후 엔지니어링팀 지원', status: '예정', priority: 'low' },
      ],
      Q4: [
        { action: '2027 국내 블루수소 프로젝트 사전 영업', status: '예정', priority: 'medium' },
        { action: '연간 관계 리뷰 미팅 및 내년도 계획 수립', status: '예정', priority: 'low' },
      ],
    },
  },
  {
    accountId: 'hyundai-eng',
    accountName: '현대엔지니어링',
    annualGoal: '$4.4M',
    annualGoalNum: 4444444,
    strategy: '수소 플랜트 Safety Manager 우선 수주 후 DCS 패키지 연계. Yokogawa CENTUM 대비 SIL 레퍼런스 우위 유지. UAE LNG 실주 교훈으로 현지 지원 차별화 강조.',
    keyInitiative: 'Safety First 전략 → SIS 수주 확정 후 DCS 자동 연계',
    quarters: {
      Q1: [
        { action: 'SIL 인증 자료 및 수소 글로벌 레퍼런스 공유', status: '진행중', priority: 'high' },
        { action: '박성민 수석 비공식 미팅 (Yokogawa 비교 포함)', status: '예정', priority: 'high' },
      ],
      Q2: [
        { action: '수소 DCS/SIS 기술 제안서 최종 제출', status: '예정', priority: 'high' },
        { action: '입찰 가격 협의 및 현지 지원 조건 확정', status: '예정', priority: 'high' },
      ],
      Q3: [
        { action: '수주 후 프로젝트 착수 지원', status: '예정', priority: 'medium' },
        { action: 'UAE LNG 차기 프로젝트 사전 관계 유지', status: '예정', priority: 'low' },
      ],
      Q4: [
        { action: '수소 플랜트 운영 최적화 Forge 제안', status: '예정', priority: 'medium' },
        { action: '연간 관계 강화 행사 참여', status: '예정', priority: 'low' },
      ],
    },
  },
  {
    accountId: 'gs-eng',
    accountName: 'GS건설 플랜트',
    annualGoal: '$3.0M',
    annualGoalNum: 2962963,
    strategy: '여수 NCC 프로젝트 ABB 800xA 대비 기존 레퍼런스 차별화. 기존 2019년 GS칼텍스 Experion 경험을 최대 활용. 해외 지원 우려 해소가 수주 핵심.',
    keyInitiative: 'NCC 레퍼런스 + 해외 지원 체계 집중 어필',
    quarters: {
      Q1: [
        { action: '여수 NCC 기술 제안서 초안 제출', status: '예정', priority: 'high' },
        { action: '2019 GS칼텍스 레퍼런스 사이트 방문 주선', status: '예정', priority: 'high' },
      ],
      Q2: [
        { action: '해외 현지 지원 체계 제안 (파트너사 확인)', status: '예정', priority: 'high' },
        { action: '최종 입찰 가격 제출', status: '예정', priority: 'high' },
      ],
      Q3: [
        { action: '입찰 결과 대응 및 협상 진행', status: '예정', priority: 'medium' },
        { action: '폴란드 프로젝트 별도 영업 착수', status: '예정', priority: 'medium' },
      ],
      Q4: [
        { action: '내년도 신규 프로젝트 파이프라인 발굴', status: '예정', priority: 'low' },
        { action: '연간 관계 리뷰 및 내년도 계획 수립', status: '예정', priority: 'low' },
      ],
    },
  },
  {
    accountId: 'sk-eng',
    accountName: 'SK에코플랜트',
    annualGoal: '$2.6M',
    annualGoalNum: 2592593,
    strategy: 'Forge 파일럿 성공이 전사 확대의 관문. Siemens PCS7 환경에서 Forge 연동 가능성 강조. 파일럿 성공 후 Experion DCS 교체 연계 협의.',
    keyInitiative: 'Forge 파일럿 → 전사 확대 → DCS 교체 로드맵',
    quarters: {
      Q1: [
        { action: 'Forge 데모 세션 진행 (SK본사)', status: '예정', priority: 'high' },
        { action: 'PCS7 연동 기술 검토 자료 준비', status: '예정', priority: 'high' },
      ],
      Q2: [
        { action: 'Forge 파일럿 프로젝트 계약 체결', status: '예정', priority: 'high' },
        { action: '파일럿 결과 KPI 지표 합의', status: '예정', priority: 'medium' },
      ],
      Q3: [
        { action: 'Forge 파일럿 운영 및 데이터 분석 지원', status: '예정', priority: 'high' },
        { action: '중간 성과 보고 및 확대 논의 준비', status: '예정', priority: 'medium' },
      ],
      Q4: [
        { action: '전사 Forge 확대 제안서 제출', status: '예정', priority: 'high' },
        { action: 'Experion DCS 교체 예비 제안 (장기 로드맵)', status: '예정', priority: 'medium' },
      ],
    },
  },
  {
    accountId: 'lotte-eng',
    accountName: '롯데케미칼 E&C',
    annualGoal: '$2.2M',
    annualGoalNum: 2222222,
    strategy: 'TDC 3000 → Experion 마이그레이션 수주 완료 기반으로 Safety Manager 크로스셀 추진. 인도네시아 NCC 레퍼런스 확보가 전략적 목표.',
    keyInitiative: '기수주 마이그레이션 성공 → SIS 크로스셀 → 인니 NCC 확대',
    quarters: {
      Q1: [
        { action: '여수 TDC→Experion 마이그레이션 킥오프', status: '진행중', priority: 'high' },
        { action: 'Safety Manager 추가 제안서 준비', status: '예정', priority: 'medium' },
      ],
      Q2: [
        { action: '마이그레이션 중간 점검 및 고객 만족도 확인', status: '예정', priority: 'high' },
        { action: 'Safety Manager 기술 제안 미팅', status: '예정', priority: 'medium' },
      ],
      Q3: [
        { action: '인도네시아 NCC 입찰 준비 지원', status: '예정', priority: 'high' },
        { action: '현지 레퍼런스 및 지원 체계 자료 패키지 전달', status: '예정', priority: 'high' },
      ],
      Q4: [
        { action: '인도네시아 NCC 입찰 제출', status: '예정', priority: 'high' },
        { action: '여수 공장 Forge 도입 가능성 탐색', status: '예정', priority: 'low' },
      ],
    },
  },
];
