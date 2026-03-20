import { useState } from 'react';
import { productMapping, projectTypes, products } from '../../data/productMapping';

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
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">PA 제품 매칭</h2>
        <p className="text-sm text-gray-500 mt-1">
          프로젝트 유형을 선택하면 최적 Honeywell PA 제품을 즉시 추천합니다
        </p>
      </div>

      {/* Input */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-2">
              프로젝트 유형
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setResult(null);
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#EF3829]/30 focus:border-[#EF3829]"
            >
              <option value="">유형 선택...</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleMatch}
            disabled={!selectedType}
            className="px-6 py-2.5 bg-[#EF3829] text-white text-sm font-semibold rounded-lg hover:bg-[#d42e21] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            매칭 실행
          </button>
          {result && (
            <button
              onClick={handleReset}
              className="px-4 py-2.5 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors"
            >
              초기화
            </button>
          )}
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-5 animate-in fade-in duration-300">
          {/* Key Message */}
          <div className="bg-[#1a1a2e] text-white rounded-xl p-5">
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">핵심 메시지</p>
            <p className="text-sm font-medium leading-relaxed">{result.keyMessage}</p>
          </div>

          {/* Primary Products */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EF3829]" />
              1순위 추천 제품
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.primary.map((productName) => {
                const info = products[productName];
                return (
                  <div
                    key={productName}
                    className="bg-white border-2 border-[#EF3829]/20 rounded-xl p-4 flex items-start gap-3"
                  >
                    <span className="text-2xl">{info?.icon ?? '📦'}</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{productName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{info?.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Secondary Products */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              2순위 추가 제안
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.secondary.map((productName) => {
                const info = products[productName];
                return (
                  <div
                    key={productName}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3"
                  >
                    <span className="text-2xl">{info?.icon ?? '📦'}</span>
                    <div>
                      <p className="font-medium text-gray-700 text-sm">{productName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{info?.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reason */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <h3 className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">
              추천 근거
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{result.reason}</p>
          </div>

          {/* Competitor */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">경쟁사 대비 포지셔닝</h3>
            <div className="space-y-2">
              {Object.entries(result.competitor).map(([comp, msg]) => (
                <div key={comp} className="bg-white border border-gray-200 rounded-lg p-3 flex items-start gap-3">
                  <span className="text-xs font-bold text-gray-400 w-20 flex-shrink-0 pt-0.5">
                    vs {comp}
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">{msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
