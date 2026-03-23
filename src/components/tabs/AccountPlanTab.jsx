import { useState } from 'react';
import { accountPlans as initialPlans } from '../../data/accountPlans';
import { accounts } from '../../data/accounts';

const FONT = 'DM Sans, system-ui, sans-serif';

const priorityStyle = {
  high:   { color: '#b91c1c', bg: '#fef2f2', border: '#fecaca', dot: '#ef4444' },
  medium: { color: '#b45309', bg: '#fffbeb', border: '#fde68a', dot: '#f59e0b' },
  low:    { color: '#64748b', bg: '#f8fafc', border: '#e2e6ef', dot: '#94a3b8' },
};
const STATUS_CYCLE = ['예정', '진행중', '완료'];
const statusStyle = {
  완료:   { color: '#15803d', bg: '#f0fdf4', icon: '✓' },
  진행중: { color: '#1d4ed8', bg: '#eff6ff', icon: '●' },
  예정:   { color: '#94a3b8', bg: '#f8fafc', icon: '○' },
};

const S = {
  heading: { fontSize: 18, fontWeight: 700, color: '#0f1420', letterSpacing: '-0.3px', fontFamily: FONT },
  subheading: { fontSize: 12, color: '#8b95a8', marginTop: 3, fontFamily: FONT },
};

const inlineInput = {
  background: 'transparent', border: 'none', outline: 'none',
  fontFamily: FONT, width: '100%', boxSizing: 'border-box',
  cursor: 'text',
};

function ActionItem({ item, onUpdate, onDelete }) {
  const ps = priorityStyle[item.priority] || priorityStyle.low;
  const ss = statusStyle[item.status] || statusStyle['예정'];

  const cycleStatus = () => {
    const idx = STATUS_CYCLE.indexOf(item.status);
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
    onUpdate({ ...item, status: next });
  };

  return (
    <div style={{
      background: '#eef3fb',
      border: `1px solid ${ps.border}`,
      borderLeft: `3px solid ${ps.dot}`,
      borderRadius: 8,
      padding: '9px 12px',
      display: 'flex', alignItems: 'flex-start', gap: 8,
    }}>
      {/* Status icon — click to cycle */}
      <button
        onClick={cycleStatus}
        title="클릭하면 상태 변경"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 14, color: ss.color, flexShrink: 0, marginTop: 1,
          padding: 0, fontFamily: FONT,
        }}
      >{ss.icon}</button>
      <div style={{ flex: 1 }}>
        {/* Editable action text */}
        <input
          value={item.action}
          onChange={(ev) => onUpdate({ ...item, action: ev.target.value })}
          style={{ ...inlineInput, fontSize: 12, color: '#1e293b', lineHeight: 1.5 }}
        />
        <div style={{ display: 'flex', gap: 5, marginTop: 5, alignItems: 'center' }}>
          <select
            value={item.priority}
            onChange={(ev) => onUpdate({ ...item, priority: ev.target.value })}
            style={{
              ...inlineInput, width: 'auto',
              fontSize: 10, fontWeight: 600,
              background: ps.bg, color: ps.color,
              padding: '1px 4px', borderRadius: 3, cursor: 'pointer',
            }}
          >
            <option value="high">긴급</option>
            <option value="medium">중요</option>
            <option value="low">일반</option>
          </select>
          <span style={{
            fontSize: 10, fontWeight: 600,
            background: ss.bg, color: ss.color,
            padding: '1px 6px', borderRadius: 3,
          }}>{item.status}</span>
          <button
            onClick={onDelete}
            style={{
              marginLeft: 'auto', background: 'none', border: 'none',
              color: '#d1d5db', cursor: 'pointer', fontSize: 12,
              padding: '0 2px', fontFamily: FONT,
            }}
          >✕</button>
        </div>
      </div>
    </div>
  );
}

function QuarterColumn({ quarter, items, onUpdateItem, onDeleteItem, onAddItem }) {
  const completedCount = items.filter((i) => i.status === '완료').length;
  const hasHigh = items.some((i) => i.priority === 'high');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{
        background: hasHigh ? '#fef2f2' : '#f8fafc',
        border: `1px solid ${hasHigh ? '#fecaca' : '#e2e6ef'}`,
        borderBottom: 'none', borderRadius: '10px 10px 0 0',
        padding: '8px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: hasHigh ? '#b91c1c' : '#475569', fontFamily: FONT }}>
          {quarter}
        </span>
        {completedCount > 0 && (
          <span style={{
            fontSize: 10, fontWeight: 600,
            background: '#f0fdf4', color: '#15803d',
            padding: '1px 7px', borderRadius: 20, border: '1px solid #bbf7d0',
            fontFamily: FONT,
          }}>{completedCount}/{items.length} 완료</span>
        )}
      </div>

      <div style={{
        flex: 1,
        border: `1px solid ${hasHigh ? '#fecaca' : '#e2e6ef'}`,
        borderTop: 'none', borderRadius: '0 0 10px 10px',
        padding: 8, display: 'flex', flexDirection: 'column', gap: 6,
        minHeight: 180, background: '#e8eef8',
      }}>
        {items.map((item, i) => (
          <ActionItem
            key={i}
            item={item}
            onUpdate={(updated) => onUpdateItem(i, updated)}
            onDelete={() => onDeleteItem(i)}
          />
        ))}
        <button
          onClick={onAddItem}
          style={{
            marginTop: 'auto', background: 'none',
            border: '1px dashed #d1d5db', borderRadius: 7,
            color: '#94a3b8', fontSize: 11, cursor: 'pointer',
            padding: '6px', fontFamily: FONT,
            transition: 'all 0.15s',
          }}
          onMouseEnter={(ev) => { ev.currentTarget.style.borderColor = '#EF3829'; ev.currentTarget.style.color = '#EF3829'; }}
          onMouseLeave={(ev) => { ev.currentTarget.style.borderColor = '#d1d5db'; ev.currentTarget.style.color = '#94a3b8'; }}
        >+ 액션 추가</button>
      </div>
    </div>
  );
}

export default function AccountPlanTab() {
  const [plansData, setPlansData] = useState(initialPlans);
  const [selectedId, setSelectedId] = useState(initialPlans[0]?.accountId || null);

  const plan = plansData.find((p) => p.accountId === selectedId);

  const updatePlan = (key, value) => {
    setPlansData((prev) => prev.map((p) =>
      p.accountId === selectedId ? { ...p, [key]: value } : p
    ));
  };

  const updateQuarterItem = (q, idx, updated) => {
    const newItems = (plan.quarters[q] || []).map((item, i) => i === idx ? updated : item);
    updatePlan('quarters', { ...plan.quarters, [q]: newItems });
  };

  const deleteQuarterItem = (q, idx) => {
    const newItems = (plan.quarters[q] || []).filter((_, i) => i !== idx);
    updatePlan('quarters', { ...plan.quarters, [q]: newItems });
  };

  const addQuarterItem = (q) => {
    const newItem = { action: '새 액션 입력', status: '예정', priority: 'medium' };
    const newItems = [...(plan.quarters[q] || []), newItem];
    updatePlan('quarters', { ...plan.quarters, [q]: newItems });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={S.heading}>어카운트 플랜</h2>
          <p style={S.subheading}>고객사별 연간 영업 전략 · Q1~Q4 실행 로드맵</p>
        </div>
        <select
          value={selectedId || ''}
          onChange={(e) => setSelectedId(e.target.value)}
          style={{
            fontSize: 13, fontWeight: 600, color: '#0f1420',
            background: '#eef3fb', border: '1px solid #dce5f4',
            borderRadius: 8, padding: '8px 12px',
            cursor: 'pointer', outline: 'none',
            fontFamily: FONT, minWidth: 160,
          }}
        >
          {plansData.map((p) => (
            <option key={p.accountId} value={p.accountId}>{p.accountName}</option>
          ))}
        </select>
      </div>

      {plan && (
        <>
          {/* Overview cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, marginBottom: 16 }}>
            {/* Goal card */}
            <div style={{
              background: '#eef3fb', borderRadius: 12, border: '1px solid #dce5f4',
              padding: '18px 20px',
            }}>
              <div style={{ fontSize: 10, color: '#94a3b8', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8, fontFamily: FONT }}>
                연간 목표
              </div>
              <input
                value={plan.annualGoal}
                onChange={(ev) => updatePlan('annualGoal', ev.target.value)}
                style={{
                  ...inlineInput,
                  fontSize: 28, fontWeight: 700, color: '#EF3829',
                  marginBottom: 10, display: 'block',
                }}
              />
              <input
                value={plan.keyInitiative}
                onChange={(ev) => updatePlan('keyInitiative', ev.target.value)}
                style={{
                  ...inlineInput,
                  fontSize: 11, fontWeight: 600, color: '#EF3829',
                  background: 'rgba(239,56,41,0.07)', borderRadius: 6, padding: '5px 10px',
                  display: 'block',
                }}
              />
            </div>

            {/* Strategy card */}
            <div style={{
              background: '#fffbeb', borderRadius: 12,
              border: '1px solid #fde68a', padding: '18px 20px',
            }}>
              <div style={{ fontSize: 10, color: '#92400e', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8, fontFamily: FONT }}>
                전략 방향
              </div>
              <textarea
                value={plan.strategy}
                onChange={(ev) => updatePlan('strategy', ev.target.value)}
                rows={4}
                style={{
                  ...inlineInput,
                  fontSize: 13, color: '#1e293b', lineHeight: 1.7,
                  resize: 'none', background: 'transparent',
                  borderBottom: '1px dashed rgba(0,0,0,0.1)',
                }}
              />
            </div>
          </div>

          {/* Quarter timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
              <QuarterColumn
                key={q}
                quarter={q}
                items={plan.quarters[q] || []}
                onUpdateItem={(idx, updated) => updateQuarterItem(q, idx, updated)}
                onDeleteItem={(idx) => deleteQuarterItem(q, idx)}
                onAddItem={() => addQuarterItem(q)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
