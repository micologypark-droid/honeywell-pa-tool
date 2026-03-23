import { useState } from 'react';
import { competitors as initialCompetitors } from '../../data/competitors';

const FONT = 'DM Sans, system-ui, sans-serif';
const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.07)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 6, padding: '8px 10px',
  fontSize: 13, color: '#e2e8f0', fontFamily: FONT,
  outline: 'none', transition: 'border-color 0.15s',
};
const labelStyle = {
  fontSize: 10, fontWeight: 600, color: '#8b9ab5',
  letterSpacing: '0.7px', textTransform: 'uppercase',
  marginBottom: 5, display: 'block', fontFamily: FONT,
};
const fo = (ev) => { ev.target.style.borderColor = '#EF3829'; };
const fb = (ev) => { ev.target.style.borderColor = 'rgba(255,255,255,0.12)'; };
function Field({ label, children }) {
  return <div><span style={labelStyle}>{label}</span>{children}</div>;
}

const S = {
  heading: { fontSize: 18, fontWeight: 700, color: '#0f1420', letterSpacing: '-0.3px', fontFamily: FONT },
  subheading: { fontSize: 12, color: '#8b95a8', marginTop: 3, fontFamily: FONT },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12, marginTop: 20 },
  card: {
    background: '#eef3fb', borderRadius: 12, border: '1px solid #dce5f4',
    padding: '18px 20px', cursor: 'pointer', textAlign: 'left',
    transition: 'box-shadow 0.15s, border-color 0.15s, transform 0.15s',
    display: 'block', width: '100%', fontFamily: FONT,
  },
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(10,14,25,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 100, padding: 20, backdropFilter: 'blur(4px)',
  },
};

function CompetitorModal({ competitor, onClose, onSave }) {
  const [e, setE] = useState({
    ...competitor,
    strengths: competitor.strengths || [],
    weaknesses: competitor.weaknesses || [],
    references: competitor.references || [],
    honeywellResponse: competitor.honeywellResponse || [],
  });

  const set = (key) => (ev) => setE((p) => ({ ...p, [key]: ev.target.value }));
  const setArr = (key) => (ev) => setE((p) => ({
    ...p, [key]: ev.target.value.split('\n').map((v) => v.trim()).filter(Boolean),
  }));

  const handleSave = () => { onSave(e); onClose(); };

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={{
        background: '#1a1f2e', borderRadius: 16, width: '100%', maxWidth: 580,
        boxShadow: '0 24px 64px rgba(0,0,0,0.35)', overflow: 'hidden',
      }} onClick={(ev) => ev.stopPropagation()}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0f1420, #1a2035)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '18px 22px',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, marginRight: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: competitor.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0,
            }}>{competitor.logo}</div>
            <div style={{ flex: 1 }}>
              <input value={e.name} onChange={set('name')} onFocus={fo} onBlur={fb}
                style={{ ...inputStyle, fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', marginBottom: 4 }} />
              <input value={e.tagline} onChange={set('tagline')} onFocus={fo} onBlur={fb}
                style={{ ...inputStyle, fontSize: 11, color: 'rgba(255,255,255,0.5)' }} />
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', fontSize: 15, padding: '5px 7px',
            borderRadius: 6, fontFamily: FONT, flexShrink: 0,
          }}>✕</button>
        </div>

        {/* Body */}
        <div style={{
          padding: '20px 22px', overflowY: 'auto', maxHeight: '70vh',
          display: 'flex', flexDirection: 'column', gap: 14, background: '#1a1f2e',
        }}>
          <Field label="포지셔닝">
            <textarea value={e.positioning} onChange={set('positioning')} onFocus={fo} onBlur={fb}
              rows={2} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </Field>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '2px 0' }} />

          <Field label="경쟁사 강점 (줄바꿈 구분)">
            <textarea
              value={e.strengths.join('\n')}
              onChange={setArr('strengths')}
              onFocus={fo} onBlur={fb}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
            />
          </Field>

          <Field label="경쟁사 약점 (줄바꿈 구분)">
            <textarea
              value={e.weaknesses.join('\n')}
              onChange={setArr('weaknesses')}
              onFocus={fo} onBlur={fb}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
            />
          </Field>

          <Field label="주요 레퍼런스 (줄바꿈 구분)">
            <textarea
              value={e.references.join('\n')}
              onChange={setArr('references')}
              onFocus={fo} onBlur={fb}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
            />
          </Field>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '2px 0' }} />

          <Field label="Honeywell 대응 메시지 (줄바꿈 구분)">
            <textarea
              value={e.honeywellResponse.join('\n')}
              onChange={setArr('honeywellResponse')}
              onFocus={fo} onBlur={fb}
              rows={5}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
            />
          </Field>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 22px', background: '#141824',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', justifyContent: 'flex-end', gap: 8,
        }}>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#9aa3b5', borderRadius: 7, padding: '8px 18px',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT,
          }}>취소</button>
          <button onClick={handleSave} style={{
            background: '#EF3829', border: 'none', color: '#fff',
            borderRadius: 7, padding: '8px 22px',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
            boxShadow: '0 2px 10px rgba(239,56,41,0.35)',
          }}>저장</button>
        </div>
      </div>
    </div>
  );
}

export default function CompetitorTab() {
  const [competitorsData, setCompetitorsData] = useState(initialCompetitors);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleSave = (updated) => {
    setCompetitorsData((prev) => prev.map((c) => c.id === updated.id ? updated : c));
    setSelected(updated);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 4 }}>
        <div>
          <h2 style={S.heading}>경쟁사 인텔리전스</h2>
          <p style={S.subheading}>주요 경쟁사 {competitorsData.length}개 · 강점/약점/대응 메시지</p>
        </div>
      </div>

      <div style={S.grid}>
        {competitorsData.map((comp) => {
          const isHovered = hovered === comp.id;
          return (
            <button
              key={comp.id}
              onClick={() => setSelected(comp)}
              onMouseEnter={() => setHovered(comp.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...S.card,
                boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.09)' : '0 1px 3px rgba(0,0,0,0.05)',
                borderColor: isHovered ? '#cbd5e1' : '#e2e6ef',
                transform: isHovered ? 'translateY(-2px)' : 'none',
                borderLeft: `3px solid ${comp.color}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 8,
                    background: comp.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0,
                  }}>{comp.logo}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f1420', letterSpacing: '-0.2px' }}>{comp.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{comp.tagline}</div>
                  </div>
                </div>
              </div>

              <div style={{
                background: '#e5ecf6', borderRadius: 6, padding: '6px 10px',
                marginBottom: 12, fontSize: 11, color: '#475569', lineHeight: 1.5,
              }}>
                {comp.positioning}
              </div>

              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 5 }}>강점</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {comp.strengths.slice(0, 2).map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 11, color: '#374151' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e', flexShrink: 0, marginTop: 4 }} />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 5 }}>약점</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {comp.weaknesses.slice(0, 2).map((w, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 11, color: '#374151' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444', flexShrink: 0, marginTop: 4 }} />
                      {w}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 10 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {comp.references.slice(0, 2).map((r, i) => (
                    <span key={i} style={{
                      fontSize: 10, background: '#f1f5f9', color: '#64748b',
                      padding: '2px 7px', borderRadius: 4,
                    }}>{r}</span>
                  ))}
                  {comp.references.length > 2 && (
                    <span style={{ fontSize: 10, color: '#94a3b8', padding: '2px 0' }}>
                      +{comp.references.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <CompetitorModal competitor={selected} onClose={() => setSelected(null)} onSave={handleSave} />
      )}
    </div>
  );
}
