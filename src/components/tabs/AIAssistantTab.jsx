import { useState } from 'react';
import { accounts } from '../../data/accounts';
import { projectTypes } from '../../data/productMapping';
import { analyzeAccount } from '../../services/claudeApi';
import LoadingSpinner from '../shared/LoadingSpinner';

function ResultSection({ title, content, icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="p-4">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">
          {content}
        </pre>
      </div>
    </div>
  );
}

export default function AIAssistantTab() {
  const [form, setForm] = useState({
    company: '',
    projectName: '',
    projectType: '',
    scale: '',
  });
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

  const handleRetry = () => {
    setApiError('');
    handleSubmit();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">AI 미팅 어시스턴트</h2>
        <p className="text-sm text-gray-500 mt-1">
          고객사와 프로젝트 정보를 입력하면 Claude가 제품 추천, 경쟁사 비교, 미팅 체크리스트를 생성합니다
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              고객사 <span className="text-[#EF3829]">*</span>
            </label>
            <select
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#EF3829]/30 focus:border-[#EF3829] ${
                errors.company ? 'border-[#EF3829] bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">고객사 선택...</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
            {errors.company && (
              <p className="text-xs text-[#EF3829] mt-1">고객사를 선택해주세요</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              프로젝트 유형 <span className="text-[#EF3829]">*</span>
            </label>
            <select
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
              className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#EF3829]/30 focus:border-[#EF3829] ${
                errors.projectType ? 'border-[#EF3829] bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">유형 선택...</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <p className="text-xs text-[#EF3829] mt-1">프로젝트 유형을 선택해주세요</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              프로젝트명 (선택)
            </label>
            <input
              type="text"
              value={form.projectName}
              onChange={(e) => setForm({ ...form, projectName: e.target.value })}
              placeholder="예: 수소 플랜트 DCS/SIS"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#EF3829]/30 focus:border-[#EF3829]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              예상 규모 (선택)
            </label>
            <input
              type="text"
              value={form.scale}
              onChange={(e) => setForm({ ...form, scale: e.target.value })}
              placeholder="예: 45억, 중규모"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#EF3829]/30 focus:border-[#EF3829]"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-[#EF3829] text-white font-semibold rounded-lg hover:bg-[#d42e21] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Claude 분석 중...
            </>
          ) : (
            <>🤖 분석 시작</>
          )}
        </button>
      </div>

      {/* Error */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span className="text-red-500 text-lg flex-shrink-0">⚠️</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-700">API 오류</p>
            <p className="text-xs text-red-500 mt-1">{apiError}</p>
          </div>
          <button
            onClick={handleRetry}
            className="text-xs text-red-600 border border-red-300 rounded px-3 py-1 hover:bg-red-100 flex-shrink-0"
          >
            재시도
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && <LoadingSpinner message="Claude가 분석 중입니다... (약 10~20초)" />}

      {/* Result */}
      {result && !loading && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="text-green-500">✓</span>
            분석 완료 · {form.company} / {form.projectType}
          </div>
          <ResultSection
            title="추천 Honeywell 제품"
            content={result.products}
            icon="⚙️"
          />
          <ResultSection
            title="경쟁사 대비 차별화 포인트"
            content={result.competitors}
            icon="🎯"
          />
          <ResultSection
            title="미팅 준비 체크리스트"
            content={result.checklist}
            icon="✅"
          />
        </div>
      )}
    </div>
  );
}
