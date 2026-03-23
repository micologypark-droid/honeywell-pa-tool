import { useState } from 'react';
import { accounts } from '../../data/accounts';
import { projectTypes } from '../../data/productMapping';
import { analyzeAccount } from '../../services/claudeApi';

const S = {
  heading: { fontSize: 18, fontWeight: 700, color: '#0f1420', letterSpacing: '-0.3px' },
  subheading: { fontSize: 12, color: '#8b95a8', marginTop: 3 },

  card: {
    background: '#eef3fb',
    borderRadius: 12,
    border: '1px solid #dce5f4',
    padding: '20px',
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

  input: {
    width: '100%',
    border: '1px solid #d4d9e4',
    borderRadius: 8,
    padding: '10px 12px',
    fontSize: 13,
    color: '#1e293b',
    background: '#fff',
    outline: 'none',
    fontFamily: 'DM Sans, system-ui, sans-serif',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  },

  inputError: {
    borderColor: '#EF3829',
    background: '#fff5f5',
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
    boxSizing: 'border-box',
  },
};

function ResultSection({ title, content, icon, accent }) {
  const colors = {
    red:    { bg: '#fff5f5', border: '#fecaca', titleColor: '#b91c1c', iconBg: '#fee2e2' },
    blue:   { bg: '#eff6ff', border: '#bfdbfe', titleColor: '#1d4ed8', iconBg: '#dbeafe' },
    green:  { bg: '#f0fdf4', border: '#bbf7d0', titleColor: '#15803d', iconBg: '#dcfce7' },
    navy:   { bg: '#f8fafc', border: '#e2e6ef', titleColor: '#1e293b', iconBg: '#f1f5f9' },
  };
  const c = colors[accent] || colors.navy;
  return (
    <div style={{ background: '#eef3fb', borderRadius: 12, border: '1px solid #dce5f4', overflow: 'hidden' }}>
      <div style={{
        background: c.bg,
        borderBottom: `1px solid ${c.border}`,
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          background: c.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, flexShrink: 0,
        }}>{icon}</div>
        <h3 style={{ fontSize: 13, fontWeight: 600, color: c.titleColor }}>{title}</h3>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <pre style={{
          fontSize: 12, color: '#374151',
          whiteSpace: 'pre-wrap', lineHeight: 1.75,
          fontFamily: 'DM Sans, system-ui, sans-serif',
          margin: 0,
        }}>{content}</pre>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{
        width: 36, height: 36,
        border: '3px solid #f1f5f9',
        borderTop: '3px solid #EF3829',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        margin: '0 auto 16px',
      }} />
      <p style={{ fontSize: 13, color: '#8b95a8' }}>Claude가 분석 중입니다...</p>
      <p style={{ fontSize: 11, color: '#c8ceda', marginTop: 4 }}>약 10~20초 소요됩니다</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function AIAssistantTab() {
  const [form, setForm] = useState({ company: '', projectName: '', projectType: '', scale: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.company) newErrors.company = true;
    if (!form.projectType) newErrors.projectType = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setResult(null);
    setApiError('');
    try {
      const data = await analyzeAccount(form);
      setResult(data);
    } catch (err) {
      setApiError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={S.heading}>AI 미팅 어시스턴트</h2>
        <p style={S.subheading}>고객사와 프로젝트 정보를 입력하면 Claude가 제품 추천, 경쟁사 비교, 미팅 체크리스트를 생성합니다</p>
      </div>

      {/* Input Form */}
      <div style={S.card}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>

          {/* 고객사 */}
          <div>
            <label style={S.label}>
              고객사 <span style={{ color: '#EF3829' }}>*</span>
            </label>
            <select
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              style={{ ...S.select, ...(errors.company ? S.inputError : {}) }}
            >
              <option value="">고객사 선택...</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
            </select>
            {errors.company && (
              <span style={{ fontSize: 11, color: '#EF3829', marginTop: 4, display: 'block' }}>고객사를 선택해주세요</span>
            )}
          </div>

          {/* 프로젝트 유형 */}
          <div>
            <label style={S.label}>
              프로젝트 유형 <span style={{ color: '#EF3829' }}>*</span>
            </label>
            <select
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
              style={{ ...S.select, ...(errors.projectType ? S.inputError : {}) }}
            >
              <option value="">유형 선택...</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.projectType && (
              <span style={{ fontSize: 11, color: '#EF3829', marginTop: 4, display: 'block' }}>프로젝트 유형을 선택해주세요</span>
            )}
          </div>

          {/* 프로젝트명 */}
          <div>
            <label style={S.label}>프로젝트명 (선택)</label>
            <input
              type="text"
              value={form.projectName}
              onChange={(e) => setForm({ ...form, projectName: e.target.value })}
              placeholder="예: 수소 플랜트 DCS/SIS"
              style={S.input}
            />
          </div>

          {/* 예상 규모 */}
          <div>
            <label style={S.label}>예상 규모 (선택)</label>
            <input
              type="text"
              value={form.scale}
              onChange={(e) => setForm({ ...form, scale: e.target.value })}
              placeholder="예: 45억, 중규모"
              style={S.input}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px',
            background: loading ? '#c72d20' : '#EF3829',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'DM Sans, system-ui, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'background 0.15s',
            opacity: loading ? 0.85 : 1,
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: 16, height: 16,
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid #fff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
              Claude 분석 중...
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
          ) : (
            <> 🤖 분석 시작</>
          )}
        </button>
      </div>

      {/* Error */}
      {apiError && (
        <div style={{
          marginTop: 14,
          background: '#fff5f5', border: '1px solid #fecaca',
          borderRadius: 10, padding: '12px 16px',
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#b91c1c' }}>API 오류</div>
            <div style={{ fontSize: 12, color: '#dc2626', marginTop: 3 }}>{apiError}</div>
          </div>
          <button
            onClick={() => { setApiError(''); handleSubmit(); }}
            style={{
              fontSize: 11, color: '#b91c1c',
              border: '1px solid #fca5a5',
              background: '#fff',
              borderRadius: 6, padding: '4px 10px',
              cursor: 'pointer', flexShrink: 0,
              fontFamily: 'DM Sans, system-ui, sans-serif',
            }}
          >재시도</button>
        </div>
      )}

      {/* Loading */}
      {loading && <Spinner />}

      {/* Result */}
      {result && !loading && (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <span style={{ color: '#15803d', fontSize: 14 }}>✓</span>
            <span style={{ fontSize: 12, color: '#15803d', fontWeight: 500 }}>
              분석 완료 · {form.company} / {form.projectType}
            </span>
          </div>
          <ResultSection title="추천 Honeywell 제품" content={result.products} icon="⚙️" accent="red" />
          <ResultSection title="경쟁사 대비 차별화 포인트" content={result.competitors} icon="🎯" accent="blue" />
          <ResultSection title="미팅 준비 체크리스트" content={result.checklist} icon="✅" accent="green" />
        </div>
      )}
    </div>
  );
}
