# Honeywell PA Korea — Account Intelligence Tool

## 프로젝트 목적

Honeywell Process Automation Senior Account Manager 면접용 데모 웹앱.
"입사하면 이렇게 일하겠다"를 실제 동작하는 툴로 증명하기 위한 목적.
PPT 대신 실제 영업 업무(어카운트 관리 → 파이프라인 → 레퍼런스 → 제품 매칭 → AI 미팅 준비 → 경쟁사 분석 → 어카운트 플랜)를 통합한 툴을 직접 조작하며 설명.

**면접일**: 2026-03-26
**데모 시간**: 5분

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | React 18 + Vite |
| 스타일링 | 인라인 스타일 (Tailwind 미사용, CSS 파일 없음) |
| 폰트 | **DM Sans만 사용** — DM Mono 절대 사용 금지 |
| 상태관리 | React useState (외부 라이브러리 없음) |
| AI 연동 | Claude API (`claude-sonnet-4-6`) via Vite proxy |
| 실행 | `npm run dev` → localhost:5173 |

---

## 탭 구성 (7개)

| 탭 ID | 컴포넌트 | 데이터 파일 |
|-------|----------|-------------|
| `accounts` | AccountsTab.jsx | data/accounts.js |
| `pipeline` | PipelineTab.jsx | data/pipeline.js |
| `references` | ReferenceTab.jsx | data/references.js |
| `products` | ProductMatchTab.jsx | data/productMapping.js |
| `ai` | AIAssistantTab.jsx | (Claude API) |
| `competitors` | CompetitorTab.jsx | data/competitors.js |
| `plan` | AccountPlanTab.jsx | data/accountPlans.js |

---

## 컬러 규칙

| 용도 | 값 |
|------|----|
| Honeywell 레드 (강조, 버튼) | `#EF3829` |
| 다크 네이비 (헤더 배경) | `#0f1420` |
| 페이지 배경 | `#d4dae8` |
| 카드 배경 | `#eef3fb` |
| 보조 패널 배경 | `#e5ecf6` |
| 카드 보더 | `#dce5f4` |
| 칸반 컨테이너 | `#e8eef8` |
| 다크 모달 배경 | `#1a1f2e` |
| 다크 모달 input bg | `rgba(255,255,255,0.07)` |

---

## 데이터 패턴 (모든 탭 공통)

```js
// 반드시 이 패턴으로 작성
import { dataName as initialDataName } from '../../data/xxx';

const [dataName, setDataName] = useState(initialDataName);

const handleSave = (updated) => {
  setDataName((prev) => prev.map((item) => item.id === updated.id ? updated : item));
  setSelected(updated);
};
```

---

## 스타일 패턴

- 모든 컴포넌트는 `const S = { ... }` 또는 `const FONT = 'DM Sans, system-ui, sans-serif'` 패턴 사용
- 모달은 항상 다크 테마: 배경 `#1a1f2e`, 헤더 `linear-gradient(135deg, #0f1420, #1a2035)`
- 카드 hover: `translateY(-2px)` + `boxShadow` 추가
- 배열 데이터 수정: `줄바꿈(\n)으로 구분 → split('\n').map(trim).filter(Boolean)`

---

## Claude API 연동

- **프록시**: `/api/claude/v1/messages` (vite.config.js에 설정됨)
- **API 키**: `.env` 파일 `VITE_ANTHROPIC_API_KEY` (절대 코드에 하드코딩 금지)
- **서비스 파일**: `src/services/claudeApi.js`
- **모델**: `claude-sonnet-4-6`
- **CORS**: Vite proxy로 해결 완료 (`anthropic-dangerous-direct-browser-access: true`)

---

## 고객사 목록 (accounts.js)

| ID | 이름 | Tier |
|----|------|------|
| `samsung-ena` | 삼성 E&A | Tier 1 |
| `hyundai-eng` | 현대엔지니어링 | Tier 1 |
| `gs-eng` | GS건설 플랜트 | Tier 1 |
| `sk-eng` | SK에코플랜트 | Tier 2 |
| `lotte-eng` | 롯데케미칼 E&C | Tier 2 |

---

## 주요 도메인 용어

| 용어 | 정의 |
|------|------|
| EPC | Engineering, Procurement & Construction |
| DCS | Distributed Control System → Experion PKS |
| SIS | Safety Instrumented System → Safety Manager |
| ICSS | Integrated Control & Safety System (DCS+SIS 통합) |
| AM | Account Manager |
| PA | Process Automation (Honeywell 사업부) |
| I/O | Input/Output (제어 신호 점수, 규모 지표) |

---

## 파이프라인 스테이지

`입찰예정 → 입찰중 → 협상중 → 수주 / 실주`

---

## 면접 데모 시나리오 (5분)

| 시간 | 탭 | 포인트 |
|------|----|--------|
| 0~1분 | 어카운트 관리 | 삼성E&A 카드 클릭 → 담당자·다음액션 확인 |
| 1~2분 | EPC 파이프라인 | 수소 프로젝트 클릭 → 규모·마감 확인 |
| 2~3분 | PA 제품 매칭 | **[핵심]** '수소' 선택 → Safety Manager 최우선 추천 → "SIS가 먼저인 이유" |
| 3~4분 | 레퍼런스 리스트 | 현대엔지니어링 필터 → 수주 이력으로 신뢰도 어필 |
| 4~5분 | AI 어시스턴트 | 현대엔지니어링 + 수소 입력 → 경쟁사 비교·체크리스트 출력 |

> **핵심 원칙**: 코드·기술 스택 언급 금지. "어떤 영업 문제를 해결하는가"로만 설명.

---

## 미완료 항목 (배포 전 필요)

- [ ] AI탭 인터넷 없을 때 mock 응답 fallback
- [ ] Git 커밋 히스토리 정리
- [ ] Vercel 배포 + 환경변수 설정
