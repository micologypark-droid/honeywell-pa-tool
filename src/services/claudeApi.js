const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-6';

export async function analyzeAccount({ company, projectName, projectType, scale }) {
  const systemPrompt = `당신은 Honeywell Process Automation의 수석 Account Manager입니다.
한국 EPC 시장(정유/석유화학/수소/발전)에 정통하며,
Honeywell PA 제품군(Experion PKS, Safety Manager, Honeywell Forge, 계측장비)의 전문가입니다.
경쟁사(Emerson, ABB, Yokogawa)와의 차별화 포인트를 명확하게 설명할 수 있습니다.
응답은 반드시 한국어로 작성하세요.`;

  const userPrompt = `고객사: ${company}
프로젝트명: ${projectName || '미입력'}
프로젝트 유형: ${projectType}
예상 규모: ${scale || '미입력'}

위 정보를 바탕으로 다음 3가지를 작성해주세요:

## 1. 추천 Honeywell 제품
우선순위 순으로 나열하고, 각 제품마다 선택 이유를 2~3문장으로 설명해주세요.

## 2. 경쟁사 대비 차별화 포인트
Emerson, ABB, Yokogawa 각각에 대해 Honeywell의 우위점을 구체적으로 설명해주세요.

## 3. 미팅 준비 체크리스트
이 고객사와의 미팅 전 반드시 준비해야 할 액션 아이템을 5개 이상 구체적으로 작성해주세요.`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || `API 오류 (${response.status})`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text ?? '';
  return parseResponse(text);
}

function parseResponse(text) {
  const section1 = extractSection(text, '1. 추천 Honeywell 제품', '2. 경쟁사');
  const section2 = extractSection(text, '2. 경쟁사 대비 차별화 포인트', '3. 미팅');
  const section3 = extractSection(text, '3. 미팅 준비 체크리스트', null);

  return {
    products: section1 || text,
    competitors: section2 || '',
    checklist: section3 || '',
    raw: text,
  };
}

function extractSection(text, startMarker, endMarker) {
  const startIdx = text.indexOf(startMarker);
  if (startIdx === -1) return null;
  const contentStart = startIdx + startMarker.length;
  const endIdx = endMarker ? text.indexOf(endMarker, contentStart) : text.length;
  return text.slice(contentStart, endIdx === -1 ? text.length : endIdx).trim();
}
