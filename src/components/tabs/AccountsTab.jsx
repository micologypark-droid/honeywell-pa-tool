import { useState } from 'react';
import { accounts as initialAccounts } from '../../data/accounts';

function calcDday(lastContactStr) {
  const today = new Date();
  const diff = Math.floor((today - new Date(lastContactStr)) / 86400000);
  return diff;
}
function getDdayStyle(days) {
  if (days >= 30) return { color: '#b91c1c', bg: '#fef2f2', border: '#fecaca' };
  if (days <= 14) return { color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' };
  return { color: '#64748b', bg: '#f8fafc', border: '#e2e6ef' };
}

const relationshipStyle = {
  전략: { bg: '#fef2f2', color: '#b91c1c', dot: '#ef4444' },
  우선: { bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
  일반: { bg: '#f8fafc', color: '#475569', dot: '#94a3b8' },
  개발: { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
};

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
  modal: {
    overlay: {
      position: 'fixed', inset: 0, background: 'rgba(10,14,25,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: 20, backdropFilter: 'blur(4px)',
    },
  },
};

function Tag({ label, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 11, fontWeight: 500, padding: '2px 8px',
      borderRadius: 20, ...style,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: style.color, opacity: 0.8 }} />
      {label}
    </span>
  );
}

function AccountModal({ account, onClose, onSave }) {
  const [e, setE] = useState({
    ...account,
    keyContact: { ...account.keyContact },
    nextAction: { ...account.nextAction },
    activeProjects: account.activeProjects || [],
    whitespace: account.whitespace ? account.whitespace.map((w) => ({ ...w })) : [],
  });

  const set = (key) => (ev) => setE((p) => ({ ...p, [key]: ev.target.value }));
  const setC = (key) => (ev) => setE((p) => ({ ...p, keyContact: { ...p.keyContact, [key]: ev.target.value } }));
  const setNA = (key) => (ev) => setE((p) => ({ ...p, nextAction: { ...p.nextAction, [key]: ev.target.value } }));
  const setProjects = (ev) => setE((p) => ({ ...p, activeProjects: ev.target.value.split('\n').map((v) => v.trim()).filter(Boolean) }));
  const setWS = (idx, key) => (ev) => setE((p) => {
    const ws = p.whitespace.map((w, i) => i === idx ? { ...w, [key]: ev.target.value } : w);
    return { ...p, whitespace: ws };
  });
  const addWS = () => setE((p) => ({ ...p, whitespace: [...p.whitespace, { product: '', opportunity: '' }] }));
  const removeWS = (idx) => setE((p) => ({ ...p, whitespace: p.whitespace.filter((_, i) => i !== idx) }));

  const handleSave = () => { onSave(e); onClose(); };

  return (
    <div style={S.modal.overlay} onClick={onClose}>
      <div style={{
        background: '#1a1f2e', borderRadius: 16, width: '100%', maxWidth: 580,
        boxShadow: '0 24px 64px rgba(0,0,0,0.35)', overflow: 'hidden',
      }} onClick={(ev) => ev.stopPropagation()}>

        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, #0f1420, #1a2035)`,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '18px 22px',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, marginRight: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: account.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0,
            }}>{account.logo}</div>
            <div style={{ flex: 1 }}>
              <input value={e.name} onChange={set('name')} onFocus={fo} onBlur={fb}
                style={{ ...inputStyle, fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', marginBottom: 4 }} />
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{account.type} · {account.id}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <select value={e.relationship} onChange={set('relationship')}
              style={{ ...inputStyle, width: 'auto', fontSize: 11, fontWeight: 600, padding: '4px 8px', cursor: 'pointer' }}>
              {['전략','우선','일반','개발'].map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <button onClick={onClose} style={{
              background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.5)', fontSize: 15, padding: '5px 7px',
              borderRadius: 6, fontFamily: FONT,
            }}>✕</button>
          </div>
        </div>

        {/* Body */}
        <div style={{
          padding: '20px 22px', overflowY: 'auto', maxHeight: '70vh',
          display: 'flex', flexDirection: 'column', gap: 14, background: '#1a1f2e',
        }}>
          {/* Tier / Revenue / Last Contact */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <Field label="티어">
              <input value={e.tier} onChange={set('tier')} onFocus={fo} onBlur={fb} style={inputStyle} />
            </Field>
            <Field label="예상 매출">
              <input value={e.revenue} onChange={set('revenue')} onFocus={fo} onBlur={fb} style={inputStyle} />
            </Field>
            <Field label="마지막 접촉일">
              <input type="date" value={e.lastContact || ''} onChange={set('lastContact')} onFocus={fo} onBlur={fb}
                style={{ ...inputStyle, colorScheme: 'dark' }} />
            </Field>
          </div>

          {/* Key Contact */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#EF3829', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: FONT, marginBottom: 10 }}>핵심 담당자</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <Field label="이름">
                <input value={e.keyContact.name} onChange={setC('name')} onFocus={fo} onBlur={fb} style={inputStyle} />
              </Field>
              <Field label="직함">
                <input value={e.keyContact.title} onChange={setC('title')} onFocus={fo} onBlur={fb} style={inputStyle} />
              </Field>
              <Field label="이메일">
                <input value={e.keyContact.email} onChange={setC('email')} onFocus={fo} onBlur={fb} style={inputStyle} />
              </Field>
              <Field label="전화">
                <input value={e.keyContact.phone} onChange={setC('phone')} onFocus={fo} onBlur={fb} style={inputStyle} />
              </Field>
            </div>
          </div>

          {/* Active Projects */}
          <Field label="진행 프로젝트 (줄바꿈 구분)">
            <textarea
              value={e.activeProjects.join('\n')}
              onChange={setProjects}
              onFocus={fo} onBlur={fb}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          </Field>

          {/* Next Action */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#EF3829', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: FONT, marginBottom: 10 }}>다음 액션</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10 }}>
              <Field label="날짜">
                <input type="date" value={e.nextAction.date} onChange={setNA('date')} onFocus={fo} onBlur={fb}
                  style={{ ...inputStyle, colorScheme: 'dark' }} />
              </Field>
              <Field label="액션">
                <input value={e.nextAction.action} onChange={setNA('action')} onFocus={fo} onBlur={fb} style={inputStyle} />
              </Field>
            </div>
          </div>

          {/* Memo */}
          <Field label="영업 메모">
            <textarea value={e.memo} onChange={set('memo')} onFocus={fo} onBlur={fb}
              rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }} />
          </Field>

          {/* Strengths */}
          <Field label="Honeywell 차별 강점">
            <textarea value={e.strengths} onChange={set('strengths')} onFocus={fo} onBlur={fb}
              rows={2} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
          </Field>

          {/* Whitespace */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#EF3829', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: FONT }}>크로스셀 기회</div>
              <button onClick={addWS} style={{
                background: 'rgba(239,56,41,0.15)', border: '1px solid rgba(239,56,41,0.3)',
                color: '#EF3829', borderRadius: 6, padding: '3px 10px',
                fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
              }}>+ 추가</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {e.whitespace.map((w, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
                  borderLeft: '3px solid rgba(239,56,41,0.5)', borderRadius: 8, padding: '10px 12px',
                }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <input value={w.product} onChange={setWS(i, 'product')} onFocus={fo} onBlur={fb}
                      placeholder="제품명" style={{ ...inputStyle, fontSize: 11, fontWeight: 600 }} />
                    <button onClick={() => removeWS(i)} style={{
                      background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
                      cursor: 'pointer', fontSize: 14, flexShrink: 0, fontFamily: FONT,
                    }}>✕</button>
                  </div>
                  <textarea value={w.opportunity} onChange={setWS(i, 'opportunity')} onFocus={fo} onBlur={fb}
                    rows={2} placeholder="기회 설명..."
                    style={{ ...inputStyle, fontSize: 12, resize: 'vertical', lineHeight: 1.5 }} />
                </div>
              ))}
            </div>
          </div>
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

export default function AccountsTab() {
  const [accountsData, setAccountsData] = useState(initialAccounts);
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleSave = (updated) => {
    setAccountsData((prev) => prev.map((a) => a.id === updated.id ? updated : a));
    setSelected(updated);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={S.heading}>EPC 어카운트 관리</h2>
          <p style={S.subheading}>한국 PA 주요 고객사 · {accountsData.length}개 어카운트</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {Object.entries(
            accountsData.reduce((acc, a) => { acc[a.relationship] = (acc[a.relationship] || 0) + 1; return acc; }, {})
          ).map(([rel, count]) => {
            const style = relationshipStyle[rel] || {};
            return (
              <div key={rel} style={{
                background: style.bg, color: style.color,
                fontSize: 11, fontWeight: 600,
                padding: '4px 10px', borderRadius: 20,
                display: 'flex', alignItems: 'center', gap: 5, fontFamily: FONT,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: style.dot }} />
                {rel} {count}
              </div>
            );
          })}
        </div>
      </div>

      <div style={S.grid}>
        {accountsData.map((account) => {
          const rel = relationshipStyle[account.relationship] || {};
          const isHovered = hovered === account.id;
          return (
            <button
              key={account.id}
              onClick={() => setSelected(account)}
              onMouseEnter={() => setHovered(account.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...S.card,
                boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.09)' : '0 1px 3px rgba(0,0,0,0.05)',
                borderColor: isHovered ? '#cbd5e1' : '#e2e6ef',
                transform: isHovered ? 'translateY(-2px)' : 'none',
                borderLeft: `3px solid ${account.color}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 8,
                    background: account.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0,
                  }}>{account.logo}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f1420', letterSpacing: '-0.2px' }}>
                      {account.name}
                    </div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{account.tier}</div>
                  </div>
                </div>
                <Tag label={account.relationship} style={{ background: rel.bg, color: rel.color }} />
              </div>

              <div style={{
                background: '#e5ecf6', borderRadius: 6, padding: '6px 10px',
                marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>예상 매출</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0f1420' }}>{account.revenue}</span>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 6 }}>진행 프로젝트</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {account.activeProjects.map((p, i) => (
                    <span key={i} style={{
                      fontSize: 11, background: '#dce8f6', color: '#3d5a80',
                      padding: '2px 7px', borderRadius: 4,
                    }}>{p}</span>
                  ))}
                </div>
              </div>

              {account.lastContact && (() => {
                const days = calcDday(account.lastContact);
                const ds = getDdayStyle(days);
                return (
                  <div style={{ marginBottom: 8 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      background: ds.bg, color: ds.color,
                      border: `1px solid ${ds.border}`,
                      fontSize: 10, fontWeight: 600,
                      padding: '2px 7px', borderRadius: 4,
                    }}>
                      D+{days} 마지막 접촉
                    </span>
                  </div>
                );
              })()}

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 10 }}>
                <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 5 }}>다음 액션</div>
                <div style={{ fontSize: 12, color: '#374151' }}>
                  <span style={{ color: '#EF3829', fontWeight: 500, marginRight: 6 }}>{account.nextAction.date}</span>
                  {account.nextAction.action}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <AccountModal account={selected} onClose={() => setSelected(null)} onSave={handleSave} />
      )}
    </div>
  );
}
