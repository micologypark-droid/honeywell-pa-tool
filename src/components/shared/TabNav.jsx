const tabs = [
  { id: 'accounts', label: '어카운트 관리', icon: '🏢' },
  { id: 'pipeline', label: 'EPC 파이프라인', icon: '📊' },
  { id: 'products', label: 'PA 제품 매칭', icon: '⚙️' },
  { id: 'ai', label: 'AI 어시스턴트', icon: '🤖' },
];

export default function TabNav({ activeTab, onTabChange }) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#EF3829] text-[#EF3829] bg-red-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
