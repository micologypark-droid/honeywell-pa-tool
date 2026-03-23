import { useState } from 'react';
import { references as initialRefs } from '../../data/references';
import { accounts } from '../../data/accounts';

const FONT = 'DM Sans, system-ui, sans-serif';

const TYPE_COLORS = {
  '정유/가스':  { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  '석유화학':   { bg: '#fdf4ff', color: '#7e22ce', border: '#e9d5ff' },
  '수소':       { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
  '발전':       { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  '반도체/화학':{ bg: '#f8fafc', color: '#475569', border: '#e2e8f0' },
};
const typeColor = (t) => TYPE_COLORS[t] || { bg: '#f8fafc', color: '#475569', border: '#e2e6ef' };

const STATUS_STYLE = {
  '완료':   { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0', dot: '#22c55e' },
  '진행중': { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe', dot: '#3b82f6' },
};
const statusStyle = (s) => STATUS_STYLE[s] || STATUS_STYLE['완료'];

const PRODUCTS_ALL = ['Experion PKS', 'Safety Manager', '계측장비', 'Honeywell Forge', 'Connected Worker'];

const fmtVal = (n) => {
  if (!n) return '-';
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  return `$${(n / 1000).toFixed(0)}K`;
};

const sumValue = (list) => list.reduce((s, r) => s + (r.contractValueNum || 0), 0);

/* ───── 모달 ─────────────────────────────────────────── */
function RefModal({ ref: proj, onClose, onSave, onDelete, isNew }) {
  const [e, setE] = useState({ ...proj });
  const [productsInput, setProductsInput] = useState((proj.products || []).join('\n'));

  const set = (k, v) => setE((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    onSave({
      ...e,
      products: productsInput.split('\n').map((v) => v.trim()).filter(Boolean),
      contractValueNum: Number(String(e.contractValueNum).replace(/[^0-9]/g, '')) || 0,
    });
  };

  const labelSt = { fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 5, display: 'block', fontFamily: FONT };
  const inputSt = { width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, padding: '9px 12px', fontSize: 13, color: '#fff', outline: 'none', fontFamily: FONT, boxSizing: 'border-box' };
  const textareaSt = { ...inputSt, resize: 'vertical', lineHeight: 1.6 };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#1a1f2e', borderRadius: 16, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #0f1420, #1a2035)', borderRadius: '16px 16px 0 0', padding: '20px 24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, fontFamily: FONT }}>
              {isNew ? '신규 레퍼런스 추가' : '레퍼런스 편집'}
            </div>
            <input
              value={e.projectName}
              onChange={(ev) => set('projectName', ev.target.value)}
              placeholder="프로젝트명"
              style={{ ...inputSt, background: 'rgba(255,255,255,0.05)', fontSize: 16, fontWeight: 600, border: '1px solid rgba(255,255,255,0.12)', width: 400 }}
            />
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.07)', border: 'none', color: 'rgba(255,255,255,0.5)', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', fontSize: 16, fontFamily: FONT }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Row 1: account + type */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelSt}>고객사 (EPC)</label>
              <select value={e.accountId} onChange={(ev) => {
                const acc = accounts.find((a) => a.id === ev.target.value);
                setE((p) => ({ ...p, accountId: ev.target.value, account: acc?.name || '' }));
              }} style={{ ...inputSt, cursor: 'pointer' }}>
                {accounts.map((a) => <option key={a.id} value={a.id} style={{ background: '#1a1f2e' }}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label style={labelSt}>프로젝트 유형</label>
              <select value={e.type} onChange={(ev) => set('type', ev.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                {['정유/가스', '석유화학', '수소', '발전', '반도체/화학'].map((t) => <option key={t} value={t} style={{ background: '#1a1f2e' }}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2: location + endClient */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelSt}>프로젝트 지역</label>
              <input value={e.location} onChange={(ev) => set('location', ev.target.value)} placeholder="예: 사우디아라비아" style={inputSt} />
            </div>
            <div>
              <label style={labelSt}>발주처 (End-Client)</label>
              <input value={e.endClient} onChange={(ev) => set('endClient', ev.target.value)} placeholder="예: Saudi Aramco" style={inputSt} />
            </div>
          </div>

          {/* Row 3: awardYear + completionYear + status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelSt}>수주 연도</label>
              <input type="number" value={e.awardYear} onChange={(ev) => set('awardYear', Number(ev.target.value))} style={inputSt} />
            </div>
            <div>
              <label style={labelSt}>완료 연도</label>
              <input type="number" value={e.completionYear} onChange={(ev) => set('completionYear', Number(ev.target.value))} style={inputSt} />
            </div>
            <div>
              <label style={labelSt}>상태</label>
              <select value={e.status} onChange={(ev) => set('status', ev.target.value)} style={{ ...inputSt, cursor: 'pointer' }}>
                {['완료', '진행중'].map((s) => <option key={s} value={s} style={{ background: '#1a1f2e' }}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Row 4: contractValue */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelSt}>계약 금액 (표시용)</label>
              <input value={e.contractValue} onChange={(ev) => set('contractValue', ev.target.value)} placeholder="e.g. $6.3M" style={inputSt} />
            </div>
            <div>
              <label style={labelSt}>계약 금액 (숫자, 원 단위)</label>
              <input type="number" value={e.contractValueNum} onChange={(ev) => set('contractValueNum', Number(ev.target.value))} style={inputSt} />
            </div>
          </div>

          {/* Products */}
          <div>
            <label style={labelSt}>공급 제품 (줄바꿈으로 구분)</label>
            <textarea
              value={productsInput}
              onChange={(ev) => setProductsInput(ev.target.value)}
              rows={3}
              placeholder={PRODUCTS_ALL.join('\n')}
              style={textareaSt}
            />
          </div>

          {/* Scope */}
          <div>
            <label style={labelSt}>공급 범위 (Scope)</label>
            <textarea value={e.scope} onChange={(ev) => set('scope', ev.target.value)} rows={3} style={textareaSt} />
          </div>

          {/* Highlight */}
          <div>
            <label style={labelSt}>핵심 포인트 / 수주 배경</label>
            <textarea value={e.highlight} onChange={(ev) => set('highlight', ev.target.value)} rows={3} style={textareaSt} />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
            {!isNew ? (
              <button onClick={() => onDelete(e.id)} style={{ background: 'rgba(239,56,41,0.12)', border: '1px solid rgba(239,56,41,0.25)', color: '#ef4444', borderRadius: 8, padding: '9px 18px', fontSize: 13, cursor: 'pointer', fontFamily: FONT }}>
                삭제
              </button>
            ) : <div />}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', borderRadius: 8, padding: '9px 18px', fontSize: 13, cursor: 'pointer', fontFamily: FONT }}>취소</button>
              <button onClick={handleSave} style={{ background: '#EF3829', border: 'none', color: '#fff', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT }}>저장</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── 레퍼런스 카드 ────────────────────────────────── */
function RefCard({ ref: r, onClick }) {
  const [hov, setHov] = useState(false);
  const tc = typeColor(r.type);
  const ss = statusStyle(r.status);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#e5ecf6' : '#eef3fb',
        border: `1px solid ${hov ? '#c8d8ee' : '#dce5f4'}`,
        borderRadius: 12,
        padding: '16px 18px',
        cursor: 'pointer',
        transition: 'all 0.15s',
        transform: hov ? 'translateY(-2px)' : 'none',
        boxShadow: hov ? '0 6px 20px rgba(0,0,0,0.09)' : 'none',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}
    >
      {/* Top row: type + status + year */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: tc.bg, color: tc.color, border: `1px solid ${tc.border}`, fontFamily: FONT }}>
            {r.type}
          </span>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`, display: 'flex', alignItems: 'center', gap: 4, fontFamily: FONT }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: ss.dot, display: 'inline-block' }} />
            {r.status}
          </span>
        </div>
        <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: FONT }}>{r.awardYear}년 수주</span>
      </div>

      {/* Project name */}
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0f1420', lineHeight: 1.35, fontFamily: FONT }}>{r.projectName}</div>
        <div style={{ fontSize: 11, color: '#8b95a8', marginTop: 3, fontFamily: FONT }}>{r.location} · {r.endClient}</div>
      </div>

      {/* Products */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {(r.products || []).map((p) => (
          <span key={p} style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', background: '#dce8f6', color: '#1d4ed8', borderRadius: 4, fontFamily: FONT }}>{p}</span>
        ))}
      </div>

      {/* Bottom: value */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6, borderTop: '1px solid #dce5f4' }}>
        <span style={{ fontSize: 11, color: '#64748b', fontFamily: FONT }}>계약 금액</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#EF3829', fontFamily: FONT }}>{r.contractValue}</span>
      </div>
    </div>
  );
}

/* ───── 메인 탭 ──────────────────────────────────────── */
export default function ReferenceTab() {
  const [refsData, setRefsData] = useState(initialRefs);
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selected, setSelected] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const filtered = selectedAccount === 'all'
    ? refsData
    : refsData.filter((r) => r.accountId === selectedAccount);

  const totalValue = sumValue(refsData);
  const completedCount = refsData.filter((r) => r.status === '완료').length;
  const ongoingCount = refsData.filter((r) => r.status === '진행중').length;

  const handleSave = (updated) => {
    if (isNew) {
      setRefsData((prev) => [...prev, { ...updated, id: `ref-${Date.now()}` }]);
    } else {
      setRefsData((prev) => prev.map((r) => r.id === updated.id ? updated : r));
    }
    setSelected(null);
    setIsNew(false);
  };

  const handleDelete = (id) => {
    setRefsData((prev) => prev.filter((r) => r.id !== id));
    setSelected(null);
    setIsNew(false);
  };

  const handleAdd = () => {
    const defaultAcc = selectedAccount !== 'all' ? selectedAccount : accounts[0].id;
    const accName = accounts.find((a) => a.id === defaultAcc)?.name || '';
    setSelected({
      id: '',
      accountId: defaultAcc,
      account: accName,
      projectName: '',
      type: '석유화학',
      products: [],
      contractValue: '',
      contractValueNum: 0,
      awardYear: new Date().getFullYear(),
      completionYear: new Date().getFullYear() + 1,
      location: '',
      endClient: '',
      scope: '',
      highlight: '',
      status: '완료',
    });
    setIsNew(true);
  };

  const sidebarAccounts = [
    { id: 'all', name: '전체 레퍼런스', color: '#EF3829', logo: '◉', count: refsData.length },
    ...accounts.map((a) => ({ ...a, count: refsData.filter((r) => r.accountId === a.id).length })),
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f1420', letterSpacing: '-0.3px', fontFamily: FONT }}>레퍼런스 리스트</h2>
          <p style={{ fontSize: 12, color: '#8b95a8', marginTop: 3, fontFamily: FONT }}>고객사별 수주 완료 프로젝트 · 핵심 레퍼런스 데이터베이스</p>
        </div>
        <button
          onClick={handleAdd}
          style={{ background: '#EF3829', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          + 레퍼런스 추가
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { label: '총 레퍼런스', value: `${refsData.length}건`, sub: '전체 프로젝트' },
          { label: '총 수주액', value: fmtVal(totalValue), sub: '누적 계약 금액' },
          { label: '완료 프로젝트', value: `${completedCount}건`, sub: '납품 완료' },
          { label: '진행 중', value: `${ongoingCount}건`, sub: '현재 수행 중' },
        ].map((s) => (
          <div key={s.label} style={{ background: '#eef3fb', border: '1px solid #dce5f4', borderRadius: 12, padding: '14px 16px', fontFamily: FONT }}>
            <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#EF3829', letterSpacing: '-0.5px' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#8b95a8', marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Body: sidebar + cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16, alignItems: 'start' }}>

        {/* Sidebar */}
        <div style={{ background: '#eef3fb', border: '1px solid #dce5f4', borderRadius: 12, padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sidebarAccounts.map((acc) => {
            const isActive = selectedAccount === acc.id;
            return (
              <button
                key={acc.id}
                onClick={() => setSelectedAccount(acc.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 10px', borderRadius: 8,
                  background: isActive ? '#EF3829' : 'none',
                  border: 'none', cursor: 'pointer',
                  transition: 'background 0.13s',
                  textAlign: 'left', width: '100%',
                }}
              >
                <div style={{
                  width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                  background: isActive ? 'rgba(255,255,255,0.2)' : acc.color || '#e2e6ef',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: acc.id === 'all' ? 12 : 10, fontWeight: 700, color: '#fff',
                  fontFamily: FONT,
                }}>{acc.logo}</div>
                <span style={{ flex: 1, fontSize: 12, fontWeight: isActive ? 600 : 500, color: isActive ? '#fff' : '#374151', fontFamily: FONT, lineHeight: 1.2 }}>
                  {acc.name}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700, minWidth: 18, textAlign: 'center',
                  background: isActive ? 'rgba(255,255,255,0.25)' : '#dce8f6',
                  color: isActive ? '#fff' : '#1d4ed8',
                  borderRadius: 10, padding: '1px 6px',
                  fontFamily: FONT,
                }}>{acc.count}</span>
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <div>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8', fontFamily: FONT }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>등록된 레퍼런스가 없습니다</div>
              <div style={{ fontSize: 12, marginTop: 6 }}>상단 버튼으로 새 레퍼런스를 추가해주세요</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {filtered.map((r) => (
                <RefCard
                  key={r.id}
                  ref={r}
                  onClick={() => { setSelected(r); setIsNew(false); }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <RefModal
          ref={selected}
          isNew={isNew}
          onClose={() => { setSelected(null); setIsNew(false); }}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
