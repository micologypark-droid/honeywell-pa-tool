const tabs = [
  { id: 'accounts', label: '어카운트 관리', icon: '▣' },
  { id: 'pipeline', label: 'EPC 파이프라인', icon: '◈' },
  { id: 'references', label: '레퍼런스 리스트', icon: '◆' },
  { id: 'products', label: 'PA 제품 매칭', icon: '◎' },
  { id: 'ai', label: 'AI 어시스턴트', icon: '◐' },
  { id: 'competitors', label: '경쟁사 인텔', icon: '◑' },
  { id: 'plan', label: '어카운트 플랜', icon: '◧' },
];

export default function TabNav({ activeTab, onTabChange }) {
  return (
    <nav style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 24px',
      width: '100%',
    }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '10px 16px',
              fontSize: 12,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? '#EF3829' : 'rgba(255,255,255,0.45)',
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${isActive ? '#EF3829' : 'transparent'}`,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              letterSpacing: '0.1px',
              fontFamily: 'DM Sans, system-ui, sans-serif',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
            }}
          >
            <span style={{ fontSize: 11, opacity: 0.7 }}>{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
