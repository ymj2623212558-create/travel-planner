import React from 'react';
import Head from 'next/head';

type ProjectType = 'travel-planner' | 'resume-optimizer' | 'silver-economy' | 'fortune-telling';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, description, icon, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${color} rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default function Home() {
  const projects = [
    {
      id: 'travel-planner',
      title: '旅游规划',
      description: '起点/终点规划 + AI 生成每日行程 + 花费估算',
      icon: '✈️',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      action: () => window.location.href = '/itinerary'
    },
    {
      id: 'resume-optimizer',
      title: '简历优化',
      description: 'AI 简历优化 + ATS 关键词匹配 + humanizer-zh 去 AI 味',
      icon: '📄',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      action: () => window.location.href = '/resume'
    },
    {
      id: 'silver-economy',
      title: '银发经济',
      description: '公众号内容自动化流水线 -  crawling + writing + publishing',
      icon: '👵',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      action: () => window.location.href = '/silver-economy'
    },
    {
      id: 'fortune-telling',
      title: '算命大师',
      description: '抽签/塔罗/梅花易数/八字 - 四种占卜原生 UI',
      icon: '🔮',
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      action: () => window.location.href = '/fortune-telling'
    }
  ];

  return (
    <>
      <Head>
        <title>我的项目中心</title>
        <meta name="description" content="Hermes Agent 项目导航中心" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              🎯 项目导航中心
            </h1>
            <p className="mt-2 text-gray-600">
              选择你今天要使用的项目
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                icon={project.icon}
                color={project.color}
                onClick={project.action}
              />
            ))}
          </div>

          {/* Additional Info Section */}
          <section className="mt-12 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">💡 使用说明</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>所有项目均已集成到 Hermes Agent 生态系统</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>点击卡片即可快速启动对应应用</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>每个项目独立运行，互不影响</span>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
