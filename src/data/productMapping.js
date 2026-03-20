export const productMapping = {
  정유: {
    primary: ['Experion PKS', 'Safety Manager'],
    secondary: ['계측장비 (압력/온도/유량)', 'Honeywell Forge'],
    reason:
      '정유 공정은 고온·고압 환경으로 DCS와 SIS의 통합 운영이 필수입니다. Experion PKS는 정유 분야 글로벌 1위 점유율을 보유하며, Safety Manager는 IEC 61511 SIL 3 인증으로 폭발·화재 위험 관리에 최적화되어 있습니다.',
    keyMessage: 'Saudi Aramco, Shell, ExxonMobil 등 글로벌 정유사 표준 채택',
    competitor: {
      Emerson: 'DeltaV 대비 대규모 플랜트 확장성과 글로벌 레퍼런스 우위',
      ABB: '800xA 대비 Experion의 통합 DCS/SIS 단일 플랫폼 강점',
      Yokogawa: 'CENTUM VP 대비 영어권 시장 지원 및 글로벌 서비스망 우위',
    },
  },
  석유화학: {
    primary: ['Experion PKS', '계측장비 (압력/온도/유량)'],
    secondary: ['Safety Manager', 'Honeywell Forge'],
    reason:
      '석유화학 공정은 다품종 배치 공정과 연속 공정이 혼재합니다. Experion PKS의 유연한 배치 관리 기능과 Honeywell의 분석 계측 장비가 생산 효율과 품질 관리에 핵심 역할을 합니다.',
    keyMessage: 'LG화학, 롯데케미칼 등 국내 석유화학 메이저 채택 레퍼런스 다수',
    competitor: {
      Emerson: 'DeltaV Batch 대비 대규모 NCC 실적과 Honeywell 계측 통합 강점',
      ABB: '분석 계측 분야 글로벌 레퍼런스 및 국내 지원 체계 우위',
      Yokogawa: '국내 시장 가격 경쟁 대비 총소유비용(TCO) 관점 차별화',
    },
  },
  수소: {
    primary: ['Safety Manager', 'Experion PKS'],
    secondary: ['Honeywell Forge', '계측장비 (수소전용 센서)'],
    reason:
      '수소는 폭발 하한계(LFL)가 4%로 매우 낮고, 누설 감지가 어렵습니다. Safety Manager의 SIL 3 인증과 수소 플랜트 글로벌 레퍼런스가 최우선 선택 근거입니다. 디지털화 수요 증가로 Forge 연계도 강력한 부가 가치입니다.',
    keyMessage: '글로벌 그린수소·블루수소 플랜트 Safety Manager 채택률 1위',
    competitor: {
      Emerson: '수소 전용 SIL 3 안전계장 레퍼런스 및 글로벌 수소 프로젝트 실적 우위',
      ABB: '수소 분야 Safety Instrumented System 전문성과 인증 범위 차별화',
      Yokogawa: 'ProSafe RS 대비 수소 플랜트 시공 경험과 현지 지원 우위',
    },
  },
  발전: {
    primary: ['Honeywell Forge', 'Experion PKS'],
    secondary: ['계측장비 (진동/온도)', 'Safety Manager'],
    reason:
      '발전 분야는 예측 정비(Predictive Maintenance)와 디지털트윈 수요가 급증하고 있습니다. Honeywell Forge는 APM(Asset Performance Management) 분야 업계 리더로, 발전기·터빈 운영 최적화에 검증된 AI 솔루션을 제공합니다.',
    keyMessage: '국내외 발전소 Forge APM 도입으로 예측 정비 비용 30~40% 절감 사례',
    competitor: {
      Emerson: 'AMS Suite 대비 Forge의 AI 기반 예측 분석과 클라우드 연계 강점',
      ABB: 'ABB Ability 대비 Honeywell Forge의 발전 분야 도입 레퍼런스 우위',
      OSIsoft: 'PI System 대비 Forge의 단순 데이터 수집을 넘는 의사결정 지원 기능',
    },
  },
};

export const projectTypes = ['정유', '석유화학', '수소', '발전'];

export const products = {
  'Experion PKS': {
    description: 'Honeywell 차세대 DCS (Distributed Control System)',
    icon: '⚙️',
    color: '#1a5276',
  },
  'Safety Manager': {
    description: 'SIL 3 인증 안전계장시스템 (Safety Instrumented System)',
    icon: '🛡️',
    color: '#922b21',
  },
  'Honeywell Forge': {
    description: 'AI 기반 산업 디지털 플랫폼 (Asset Performance Management)',
    icon: '🔮',
    color: '#1e8449',
  },
  '계측장비 (압력/온도/유량)': {
    description: '스마트 필드 계측기 (SmartLine 시리즈)',
    icon: '📡',
    color: '#7d6608',
  },
  '계측장비 (수소전용 센서)': {
    description: '수소 누설 감지 및 농도 측정 전용 센서',
    icon: '🔬',
    color: '#7d6608',
  },
  '계측장비 (진동/온도)': {
    description: '회전체 진동·온도 모니터링 계측기',
    icon: '📊',
    color: '#7d6608',
  },
};
