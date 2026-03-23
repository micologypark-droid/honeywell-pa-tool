import { useState } from 'react';
import TabNav from './components/shared/TabNav';
import AccountsTab from './components/tabs/AccountsTab';
import PipelineTab from './components/tabs/PipelineTab';
import ProductMatchTab from './components/tabs/ProductMatchTab';
import AIAssistantTab from './components/tabs/AIAssistantTab';
import CompetitorTab from './components/tabs/CompetitorTab';
import AccountPlanTab from './components/tabs/AccountPlanTab';
import ReferenceTab from './components/tabs/ReferenceTab';
import HomePage from './components/HomePage';

const TAB_COMPONENTS = {
  accounts: AccountsTab,
  pipeline: PipelineTab,
  references: ReferenceTab,
  products: ProductMatchTab,
  ai: AIAssistantTab,
  competitors: CompetitorTab,
  plan: AccountPlanTab,
};

export default function App() {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('accounts');
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  if (view === 'home') {
    return <HomePage onEnter={() => setView('app')} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#d4dae8' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #0f1420 0%, #1a2035 60%, #1f2845 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo + Title — clickable → home */}
          <button
            onClick={() => setView('home')}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontFamily: 'DM Sans, system-ui, sans-serif',
            }}
          >
            <div style={{
              width: 32, height: 32,
              background: '#EF3829',
              borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 14, color: '#fff',
              letterSpacing: '-0.5px',
              flexShrink: 0,
            }}>H</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '-0.2px', lineHeight: 1.2 }}>
                Honeywell PA Korea
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Account Intelligence
              </div>
            </div>
          </button>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
              boxShadow: '0 0 6px #22c55e',
            }} />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3px' }}>
              PA Korea · Senior AM
            </span>
          </div>
        </div>

        {/* Tab Nav */}
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, maxWidth: 1280, width: '100%', margin: '0 auto', padding: '24px' }}>
        <ActiveComponent />
      </main>
    </div>
  );
}
