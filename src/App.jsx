import { useState } from 'react';
import TabNav from './components/shared/TabNav';
import AccountsTab from './components/tabs/AccountsTab';
import PipelineTab from './components/tabs/PipelineTab';
import ProductMatchTab from './components/tabs/ProductMatchTab';
import AIAssistantTab from './components/tabs/AIAssistantTab';

const TAB_COMPONENTS = {
  accounts: AccountsTab,
  pipeline: PipelineTab,
  products: ProductMatchTab,
  ai: AIAssistantTab,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('accounts');
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#1a1a2e] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#EF3829] rounded flex items-center justify-center font-bold text-sm">
              H
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">
                Honeywell PA Korea
              </h1>
              <p className="text-xs text-gray-400">Account Intelligence Tool</p>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            PA Korea Senior AM · 2026
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto">
        <ActiveComponent />
      </main>
    </div>
  );
}
