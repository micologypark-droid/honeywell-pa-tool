import { useState } from 'react';
import { pipeline, stages } from '../../data/pipeline';

const stageColors = {
  입찰예정: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', header: 'bg-gray-50' },
  입찰중: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', header: 'bg-blue-50' },
  협상중: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', header: 'bg-yellow-50' },
  수주: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', header: 'bg-green-50' },
  실주: { bg: 'bg-red-50', text: 'text-red-400', border: 'border-red-100', header: 'bg-red-50' },
};

function ProjectModal({ project, onClose }) {
  const colors = stageColors[project.stage];
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{project.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{project.account} · {project.type}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400">프로젝트 규모</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{project.value}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-400">수주 확률</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{project.probability}%</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">프로젝트 개요</p>
            <p className="text-sm text-gray-700">{project.description}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-2">추천 제품</p>
            <div className="flex flex-wrap gap-2">
              {project.products.map((p, i) => (
                <span key={i} className="text-xs bg-[#EF3829]/10 text-[#EF3829] px-2 py-1 rounded-full font-medium">
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">예상 마감</p>
              <p className="text-sm font-medium text-gray-700 mt-1">{project.expectedClose}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">경쟁사</p>
              <p className="text-sm font-medium text-gray-700 mt-1">{project.competitor}</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-gray-400">담당 연락처</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{project.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PipelineTab() {
  const [selectedProject, setSelectedProject] = useState(null);

  const totalValue = pipeline
    .filter((p) => p.stage !== '실주')
    .reduce((sum, p) => sum + p.valueNum, 0);

  const expectedValue = pipeline
    .filter((p) => p.stage !== '실주')
    .reduce((sum, p) => sum + (p.valueNum * p.probability) / 100, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">EPC 프로젝트 파이프라인</h2>
        <div className="flex gap-6 mt-2">
          <p className="text-sm text-gray-500">
            파이프라인 총액{' '}
            <span className="font-semibold text-gray-900">
              {(totalValue / 100000000).toFixed(0)}억
            </span>
          </p>
          <p className="text-sm text-gray-500">
            기대 매출{' '}
            <span className="font-semibold text-[#EF3829]">
              {(expectedValue / 100000000).toFixed(0)}억
            </span>
          </p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-3">
        {stages.map((stage) => {
          const stageProjects = pipeline.filter((p) => p.stage === stage);
          const colors = stageColors[stage];
          return (
            <div key={stage} className="flex flex-col">
              <div className={`rounded-t-lg px-3 py-2 border ${colors.header} ${colors.border}`}>
                <div className="flex items-center justify-between">
                  <h3 className={`text-xs font-semibold ${colors.text}`}>{stage}</h3>
                  <span className={`text-xs font-bold ${colors.text}`}>{stageProjects.length}</span>
                </div>
              </div>
              <div className={`flex-1 rounded-b-lg border border-t-0 ${colors.border} p-2 space-y-2 min-h-[200px]`}>
                {stageProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="w-full text-left bg-white rounded-lg border border-gray-200 p-3 hover:shadow-sm hover:border-[#EF3829]/30 transition-all"
                  >
                    <p className="text-xs font-semibold text-gray-800 leading-snug mb-2">
                      {project.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-900">{project.value}</span>
                      <span className="text-xs text-gray-400">{project.probability}%</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {project.products.slice(0, 2).map((p, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                          {p}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
