import { useState } from 'react';
import { pipeline as initialPipeline, stages, annualTarget } from '../../data/pipeline';

const stageStyle = {
  입찰예정: { color: '#64748b', bg: '#f8fafc', dot: '#94a3b8', border: '#e2e6ef', headerBg: '#f1f5f9' },
  입찰중:   { color: '#1d4ed8', bg: '#eff6ff', dot: '#3b82f6', border: '#bfdbfe', headerBg: '#dbeafe' },
  협상중:   { color: '#b45309', bg: '#fffbeb', dot: '#f59e0b', border: '#fde68a', headerBg: '#fef3c7' },
  수주:     { color: '#15803d', bg: '#f0fdf4', dot: '#22c55e', border: '#bbf7d0', headerBg: '#dcfce7' },
  실주:     { color: '#9ca3af', bg: '#f9fafb', dot: '#d1d5db', border: '#e5e7eb', headerBg: '#f3f4f6' },
};

const S = {
  heading: { fontSize: 18, fontWeight: 700, color: '#0f1420', letterSpacing: '-0.3px' },
  subheading: { fontSize: 12, color: '#8b95a8', marginTop: 3 },

  statCard: {
    background: '#eef3fb',
    borderRadius: 10,
    border: '1px solid #dce5f4',
    padding: '12px 16px',
    minWidth: 120,
  },

  modal: {
    overlay: {
      position: 'fixed', inset: 0, background: 'rgba(10,14,25,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: 20,
      backdropFilter: 'blur(4px)',
    },
    box: {
      background: '#fff', borderRadius: 16,
      width: '100%', maxWidth: 520,
      boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
      overflow: 'hidden',
    },
  },
};

function AnnualTargetGauge({ expected, target }) {
  const pct = Math.min((expected / target) * 100, 100);
  const color = pct >= 80 ? '#15803d' : pct >= 50 ? '#b45309' : '#EF3829';
  const bgColor = pct >= 80 ? 'rgba(21,128,61,0.08)' : pct >= 50 ? 'rgba(180,83,9,0.08)' : 'rgba(239,56,41,0.06)';
  const borderColor = pct >= 80 ? 'rgba(21,128,61,0.2)' : pct >= 50 ? 'rgba(180,83,9,0.2)' : 'rgba(239,56,41,0.2)';

  return (
    <div style={{
      background: bgColor,
      borderRadius: 10,
      border: `1px solid ${borderColor}`,
      padding: '12px 16px',
      minWidth: 160,
    }}>
      <div style={{ fontSize: 10, color, fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
        연간 목표 달성률
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color, fontFamily: 'DM Sans, system-ui, sans-serif' }}>
          {pct.toFixed(0)}%
        </span>
        <span style={{ fontSize: 10, color: '#8b95a8' }}>
          ${(expected / 1000000).toFixed(1)}M / ${(target / 1000000).toFixed(1)}M
        </span>
      </div>
      <div style={{ background: '#e2e6ef', borderRadius: 4, height: 4, overflow: 'hidden', marginTop: 8 }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: `linear-gradient(90deg, ${color}99, ${color})`,
          borderRadius: 4,
          transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  );
}

function ProbabilityBar({ value, color }) {
  return (
    <div style={{ background: '#f1f5f9', borderRadius: 4, height: 4, overflow: 'hidden', marginTop: 6 }}>
      <div style={{
        width: `${value}%`, height: '100%',
        background: value === 100 ? '#22c55e' : value >= 60 ? color : '#94a3b8',
        borderRadius: 4,
        transition: 'width 0.3s ease',
      }} />
    </div>
  );
}

const FONT = 'DM Sans, system-ui, sans-serif';

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 6,
  padding: '8px 10px',
  fontSize: 13,
  color: '#e2e8f0',
  fontFamily: FONT,
  outline: 'none',
  transition: 'border-color 0.15s',
};

const labelStyle = {
  fontSize: 10, fontWeight: 600, color: '#8b9ab5',
  letterSpacing: '0.7px', textTransform: 'uppercase',
  marginBottom: 5, display: 'block',
  fontFamily: FONT,
};

function Field({ label, children }) {
  return (
    <div>
      <span style={labelStyle}>{label}</span>
      {children}
    </div>
  );
}

function ProjectModal({ project, onClose, onSave }) {
  const [e, setE] = useState({ ...project });
  const set = (key) => (ev) => setE((p) => ({ ...p, [key]: ev.target.value }));
  const setCheck = (key) => (ev) => setE((p) => ({ ...p, [key]: ev.target.checked }));

  const focusStyle = { borderColor: '#EF3829' };

  const handleSave = () => { onSave(e); onClose(); };

  const s = stageStyle[e.stage] || stageStyle['입찰예정'];

  return (
    <div style={S.modal.overlay} onClick={onClose}>
      <div style={{ ...S.modal.box, background: '#1a1f2e', maxWidth: 580 }} onClick={(ev) => ev.stopPropagation()}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0f1420, #1a2035)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '18px 22px',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        }}>
          <div style={{ flex: 1, marginRight: 12 }}>
            <input
              value={e.name}
              onChange={set('name')}
              onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
              onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              style={{ ...inputStyle, fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', marginBottom: 4 }}
            />
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
              {e.account} · {e.type}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <select
              value={e.stage}
              onChange={set('stage')}
              style={{ ...inputStyle, fontSize: 11, fontWeight: 600, padding: '4px 8px', width: 'auto', cursor: 'pointer' }}
            >
              {stages.map((st) => <option key={st} value={st}>{st}</option>)}
            </select>
            <button onClick={onClose} style={{
              background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1, padding: '5px 7px',
              borderRadius: 6, fontFamily: FONT,
            }}>✕</button>
          </div>
        </div>

        {/* Body */}
        <div style={{
          padding: '20px 22px',
          display: 'flex', flexDirection: 'column', gap: 14,
          overflowY: 'auto', maxHeight: '70vh',
          background: '#1a1f2e',
        }}>

          {/* Row 1: 규모 / 확률 / 마감 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <Field label="프로젝트 규모">
              <input value={e.value} onChange={set('value')}
                onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
                onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                style={{ ...inputStyle, fontWeight: 700, fontSize: 14 }} />
            </Field>
            <Field label="수주 확률 (%)">
              <input type="number" min="0" max="100" value={e.probability} onChange={set('probability')}
                onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
                onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                style={{ ...inputStyle, fontWeight: 700, fontSize: 14 }} />
            </Field>
            <Field label="예상 마감">
              <input value={e.expectedClose} onChange={set('expectedClose')}
                onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
                onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                style={inputStyle} placeholder="2026-06" />
            </Field>
          </div>

          {/* Row 2: 경쟁사 / 담당자 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="경쟁사">
              <input value={e.competitor} onChange={set('competitor')}
                onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
                onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                style={inputStyle} />
            </Field>
            <Field label="담당 연락처">
              <input value={e.contact} onChange={set('contact')}
                onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
                onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                style={inputStyle} />
            </Field>
          </div>

          {/* 추천 제품 */}
          <Field label="추천 제품 (쉼표로 구분)">
            <input value={e.products.join(', ')}
              onChange={(ev) => setE((p) => ({ ...p, products: ev.target.value.split(',').map((v) => v.trim()).filter(Boolean) }))}
              onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
              onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              style={inputStyle} />
          </Field>

          {/* 프로젝트 개요 */}
          <Field label="프로젝트 개요">
            <textarea value={e.description} onChange={set('description')}
              onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
              onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </Field>

          {/* 구분선 */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '2px 0' }} />

          {/* 견적 정보 */}
          <div style={{ fontSize: 11, fontWeight: 700, color: '#EF3829', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: FONT }}>
            견적 정보
          </div>

          {/* 견적 제출 토글 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={!!e.quoteSubmitted}
                onChange={setCheck('quoteSubmitted')}
                style={{ width: 16, height: 16, accentColor: '#EF3829', cursor: 'pointer' }}
              />
              <span style={{ ...labelStyle, marginBottom: 0, color: e.quoteSubmitted ? '#4ade80' : '#8b9ab5' }}>
                {e.quoteSubmitted ? '견적 제출 완료' : '견적 미제출'}
              </span>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="견적서 번호">
              <input value={e.quoteNumber || ''} onChange={set('quoteNumber')}
                onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
                onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                style={inputStyle} placeholder="Q-2026-001" />
            </Field>
            <Field label="견적 금액">
              <input value={e.quoteAmount || ''} onChange={set('quoteAmount')}
                onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
                onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                style={inputStyle} placeholder="e.g. $3.3M" />
            </Field>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="EPC 입찰 예정일">
              <input type="date" value={e.epcBidDate || ''} onChange={set('epcBidDate')}
                onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
                onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                style={{ ...inputStyle, colorScheme: 'dark' }} />
            </Field>
            <Field label="EPC 수주 예상일">
              <input type="date" value={e.epcAwardDate || ''} onChange={set('epcAwardDate')}
                onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
                onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                style={{ ...inputStyle, colorScheme: 'dark' }} />
            </Field>
          </div>

          {/* 구분선 */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '2px 0' }} />

          {/* 메모 */}
          <Field label="메모">
            <textarea value={e.memo || ''} onChange={set('memo')}
              onFocus={(ev) => ev.target.style.borderColor = '#EF3829'}
              onBlur={(ev) => ev.target.style.borderColor = 'rgba(255,255,255,0.12)'}
              rows={4} placeholder="협상 메모, 특이사항 등 자유롭게 입력..."
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }} />
          </Field>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 22px',
          background: '#141824',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', justifyContent: 'flex-end', gap: 8,
        }}>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#9aa3b5', borderRadius: 7, padding: '8px 18px',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT,
          }}>취소</button>
          <button onClick={handleSave} style={{
            background: '#EF3829', border: 'none',
            color: '#fff', borderRadius: 7, padding: '8px 22px',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
            boxShadow: '0 2px 10px rgba(239,56,41,0.35)',
          }}>저장</button>
        </div>
      </div>
    </div>
  );
}

export default function PipelineTab() {
  const [pipelineData, setPipelineData] = useState(initialPipeline);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleSave = (updated) => {
    setPipelineData((prev) => prev.map((p) => p.id === updated.id ? updated : p));
    setSelected(updated);
  };

  const totalValue = pipelineData
    .filter((p) => p.stage !== '실주')
    .reduce((sum, p) => sum + p.valueNum, 0);

  const expectedValue = pipelineData
    .filter((p) => p.stage !== '실주')
    .reduce((sum, p) => sum + (p.valueNum * p.probability) / 100, 0);

  const activeCount = pipelineData.filter((p) => p.stage !== '실주').length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={S.heading}>EPC 프로젝트 파이프라인</h2>
          <p style={S.subheading}>진행 중 {activeCount}건 · 칸반 보드</p>
        </div>
        {/* Summary stats */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={S.statCard}>
            <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase' }}>파이프라인 총액</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#0f1420', fontFamily: 'DM Sans, system-ui, sans-serif', marginTop: 4 }}>
              ${(totalValue / 1000000).toFixed(1)}M
            </div>
          </div>
          <div style={{ ...S.statCard, borderColor: 'rgba(239,56,41,0.2)', background: 'rgba(239,56,41,0.03)' }}>
            <div style={{ fontSize: 10, color: '#EF3829', fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase' }}>기대 매출</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#EF3829', fontFamily: 'DM Sans, system-ui, sans-serif', marginTop: 4 }}>
              ${(expectedValue / 1000000).toFixed(1)}M
            </div>
          </div>
          <AnnualTargetGauge expected={expectedValue} target={annualTarget} />
        </div>
      </div>

      {/* Kanban */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        {stages.map((stage) => {
          const stageProjects = pipelineData.filter((p) => p.stage === stage);
          const s = stageStyle[stage];
          return (
            <div key={stage} style={{ display: 'flex', flexDirection: 'column' }}>

              {/* Column Header */}
              <div style={{
                background: s.headerBg,
                border: `1px solid ${s.border}`,
                borderBottom: 'none',
                borderRadius: '10px 10px 0 0',
                padding: '8px 12px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: s.color }}>{stage}</span>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: s.color,
                  background: s.bg, border: `1px solid ${s.border}`,
                  borderRadius: 20, padding: '1px 7px',
                }}>{stageProjects.length}</span>
              </div>

              {/* Cards Container */}
              <div style={{
                flex: 1,
                border: `1px solid ${s.border}`,
                borderTop: 'none',
                borderRadius: '0 0 10px 10px',
                padding: 8,
                display: 'flex', flexDirection: 'column', gap: 6,
                minHeight: 200,
                background: stage === '실주' ? '#dde4ef' : '#e8eef8',
              }}>
                {stageProjects.map((project) => {
                  const isHovered = hovered === project.id;
                  return (
                    <button
                      key={project.id}
                      onClick={() => setSelected(project)}
                      onMouseEnter={() => setHovered(project.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        width: '100%', textAlign: 'left',
                        background: '#eef3fb',
                        borderRadius: 8,
                        border: `1px solid ${isHovered ? s.border : '#dce5f4'}`,
                        borderLeft: `3px solid ${s.dot}`,
                        padding: '10px 10px 10px 9px',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 2px rgba(0,0,0,0.04)',
                        transform: isHovered ? 'translateY(-1px)' : 'none',
                        opacity: stage === '실주' ? 0.6 : 1,
                        fontFamily: 'DM Sans, system-ui, sans-serif',
                      }}
                    >
                      {/* Name */}
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#1e293b', lineHeight: 1.4, marginBottom: 6 }}>
                        {project.name}
                      </div>

                      {/* Value + Probability */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#0f1420', fontFamily: 'DM Sans, system-ui, sans-serif' }}>
                          {project.value}
                        </span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: s.color }}>
                          {project.probability}%
                        </span>
                      </div>

                      {/* Probability bar */}
                      <ProbabilityBar value={project.probability} color={s.dot} />

                      {/* Products */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 7 }}>
                        {project.products.slice(0, 2).map((p, i) => (
                          <span key={i} style={{
                            fontSize: 9, background: '#f1f5f9', color: '#64748b',
                            padding: '2px 6px', borderRadius: 3, fontWeight: 500,
                          }}>{p}</span>
                        ))}
                        {project.products.length > 2 && (
                          <span style={{ fontSize: 9, color: '#94a3b8', padding: '2px 0' }}>
                            +{project.products.length - 2}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}

                {stageProjects.length === 0 && (
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c8ceda', fontSize: 11 }}>
                    없음
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} onSave={handleSave} />
      )}
    </div>
  );
}
