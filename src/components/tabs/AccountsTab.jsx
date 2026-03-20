import { useState } from 'react';
import { accounts } from '../../data/accounts';

const relationshipColors = {
  전략: 'bg-red-100 text-red-700',
  우선: 'bg-blue-100 text-blue-700',
  일반: 'bg-gray-100 text-gray-600',
  개발: 'bg-green-100 text-green-700',
};

function AccountModal({ account, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: account.color }}
          >
            {account.logo}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">{account.name}</h2>
            <p className="text-sm text-gray-500">
              {account.type} · {account.tier}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto max-h-[65vh]">
          {/* Key Contact */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              핵심 담당자
            </h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="font-medium text-gray-900">
                {account.keyContact.name}{' '}
                <span className="font-normal text-gray-500 text-sm">
                  {account.keyContact.title}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {account.keyContact.email} · {account.keyContact.phone}
              </p>
            </div>
          </section>

          {/* Active Projects */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              진행 중인 프로젝트
            </h3>
            <ul className="space-y-1">
              {account.activeProjects.map((p, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF3829] flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </section>

          {/* Memo */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              영업 메모
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed bg-yellow-50 border border-yellow-100 rounded-lg p-3">
              {account.memo}
            </p>
          </section>

          {/* Strengths */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Honeywell 강점
            </h3>
            <p className="text-sm text-gray-700">{account.strengths}</p>
          </section>

          {/* Next Action */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              다음 액션
            </h3>
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg p-3">
              <span className="text-lg">📅</span>
              <div>
                <p className="text-sm font-medium text-red-700">
                  {account.nextAction.date}
                </p>
                <p className="text-sm text-gray-700">{account.nextAction.action}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function AccountsTab() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">EPC 어카운트 관리</h2>
        <p className="text-sm text-gray-500 mt-1">
          한국 PA 주요 EPC 고객사 현황 · {accounts.length}개 어카운트
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <button
            key={account.id}
            onClick={() => setSelectedAccount(account)}
            className="text-left bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-[#EF3829]/30 transition-all group"
          >
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: account.color }}
              >
                {account.logo}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 group-hover:text-[#EF3829] transition-colors">
                    {account.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      relationshipColors[account.relationship]
                    }`}
                  >
                    {account.relationship}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {account.tier} · 예상 매출 {account.revenue}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-400 mb-1">진행 프로젝트</p>
                <div className="flex flex-wrap gap-1">
                  {account.activeProjects.map((p, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-400">다음 액션</p>
                <p className="text-xs text-gray-700 mt-0.5 font-medium">
                  📅 {account.nextAction.date} · {account.nextAction.action}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedAccount && (
        <AccountModal
          account={selectedAccount}
          onClose={() => setSelectedAccount(null)}
        />
      )}
    </div>
  );
}
