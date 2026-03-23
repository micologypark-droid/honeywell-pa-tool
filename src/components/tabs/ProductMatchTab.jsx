import { useState } from 'react';
import { productMapping, projectTypes, products } from '../../data/productMapping';

const S = {
  heading: { fontSize: 18, fontWeight: 700, color: '#0f1420', letterSpacing: '-0.3px' },
  subheading: { fontSize: 12, color: '#8b95a8', marginTop: 3 },

  card: {
    background: '#eef3fb',
    borderRadius: 12,
    border: '1px solid #dce5f4',
    padding: '18px 20px',
  },

  select: {
    width: '100%',
    border: '1px solid #d4d9e4',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 13,
    color: '#1e293b',
    background: '#fff',
    outline: 'none',
    fontFamily: 'DM Sans, system-ui, sans-serif',
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: 32,
  },

  btnPrimary: {
    padding: '10px 24px',
    background: '#EF3829',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'DM Sans, system-ui, sans-serif',
    transition: 'background 0.15s',
    whiteSpace: 'nowrap',
  },

  btnSecondary: {
    padding: '10px 16px',
    background: '#fff',
    color: '#5a6275',
    border: '1px solid #d4d9e4',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'DM Sans, system-ui, sans-serif',
  },

  label: {
    fontSize: 10,
    fontWeight: 600,
    color: '#94a3b8',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    marginBottom: 6,
    display: 'block',
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#5a6275',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 7,
  },
};

export default function ProductMatchTab() {
  const [selectedType, setSelectedType] = useState('');
  const [result, setResult] = useState(null);

  const handleMatch = () => {
    if (!selectedType) return;
    setResult(productMapping[selectedType]);
  };

  const handleReset = () => {
    setSelectedType('');
    setResult(null);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={S.heading}>PA 제품 매칭</h2>
        <p style={S.subheading}>프로젝트 유형을 선택하면 최적 Honeywell PA 제품을 즉시 추천합니다</p>
      </div>

      {/* Input Card */}
      <div style={S.card}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={S.label}>프로젝트 유형</label>
            <select
              value={selectedType}
              onChange={(e) => { setSelectedType(e.target.value); setResult(null); }}
              style={S.select}
            >
              <option value="">유형 선택...</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleMatch}
            disabled={!selectedType}
            style={{ ...S.btnPrimary, opacity: !selectedType ? 0.4 : 1, cursor: !selectedType ? 'not-allowed' : 'pointer' }}
          >
            매칭 실행
          </button>
          {result && (
            <button onClick={handleReset} style={S.btnSecondary}>
              초기화
            </button>
          )}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Key Message */}
          <div style={{
            background: 'linear-gradient(135deg, #0f1420, #1a2035)',
            borderRadius: 12,
            padding: '18px 20px',
          }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>
              핵심 메시지
            </div>
            <p style={{ fontSize: 14, color: '#fff', fontWeight: 500, lineHeight: 1.65 }}>
              {result.keyMessage}
            </p>
          </div>

          {/* Two columns: primary + secondary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

            {/* Primary */}
            <div>
              <div style={S.sectionTitle}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF3829', flexShrink: 0 }} />
                1순위 추천 제품
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {result.primary.map((productName) => {
                  const info = products[productName];
                  return (
                    <div key={productName} style={{
                      background: '#eef3fb',
                      border: '2px solid rgba(239,56,41,0.15)',
                      borderRadius: 10,
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                    }}>
                      <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1 }}>{info?.icon ?? '📦'}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#0f1420' }}>{productName}</div>
                        <div style={{ fontSize: 11, color: '#8b95a8', marginTop: 3, lineHeight: 1.5 }}>{info?.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Secondary */}
            <div>
              <div style={S.sectionTitle}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8', flexShrink: 0 }} />
                2순위 추가 제안
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {result.secondary.map((productName) => {
                  const info = products[productName];
                  return (
                    <div key={productName} style={{
                      background: '#eef3fb',
                      border: '1px solid #dce5f4',
                      borderRadius: 10,
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                    }}>
                      <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1 }}>{info?.icon ?? '📦'}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{productName}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3, lineHeight: 1.5 }}>{info?.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reason */}
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 10,
            padding: '14px 16px',
          }}>
            <div style={{ fontSize: 10, color: '#1d4ed8', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 6 }}>
              추천 근거
            </div>
            <p style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.65 }}>{result.reason}</p>
          </div>

          {/* Competitor */}
          <div>
            <div style={{ ...S.sectionTitle, marginBottom: 10 }}>
              경쟁사 대비 포지셔닝
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {Object.entries(result.competitor).map(([comp, msg]) => (
                <div key={comp} style={{
                  background: '#eef3fb',
                  border: '1px solid #dce5f4',
                  borderRadius: 8,
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: '#64748b',
                    flexShrink: 0, paddingTop: 1,
                    background: '#f1f5f9', padding: '2px 8px', borderRadius: 4,
                    fontFamily: 'DM Mono, monospace',
                    whiteSpace: 'nowrap',
                  }}>vs {comp}</span>
                  <p style={{ fontSize: 12, color: '#5a6275', lineHeight: 1.6 }}>{msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
