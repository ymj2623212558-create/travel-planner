import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SearchCity from '@/components/SearchCity';
import TravelPrepCard from '@/components/TravelPrepCard';
import { getPrepForCity } from '@/data/travel-prep';

interface JourneyInput {
  start_city: string;
  end_city: string;
  days: number;
  budget_per_day?: number;
  interests: string[];
}

// SVG Icon Components (replace emoji with SVG)
const PlaneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const BackArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7m8 14l-7-7 7-7" />
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" />
  </svg>
);

const AICogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Dopamine-style color mapping for interest tags
// 未选中：灰色；选中后显示对应彩色
const interestColors: Record<string, string> = {
  history: 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-200',
  nature: 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-200',
  food: 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-200',
  shopping: 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-200',
  culture: 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-200',
  adventure: 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 border border-gray-200',
};

const interestColorsActive: Record<string, string> = {
  history: 'bg-pink-500 text-white shadow-md',
  nature: 'bg-green-500 text-white shadow-md',
  food: 'bg-orange-500 text-white shadow-md',
  shopping: 'bg-blue-500 text-white shadow-md',
  culture: 'bg-purple-500 text-white shadow-md',
  adventure: 'bg-yellow-500 text-white shadow-md',
};

export default function ItineraryPage() {
  const [input, setInput] = useState<JourneyInput>({
    start_city: '',
    end_city: '',
    days: 3,
    budget_per_day: undefined,
    interests: []
  });
  
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Crowdsource actual cost reporting (方案 D)
  const [costReports, setCostReports] = useState<Record<string, { amount: number; note: string; ts: number }>>({});
  const [reportingFor, setReportingFor] = useState<string | null>(null);
  const [reportAmount, setReportAmount] = useState('');
  const [reportNote, setReportNote] = useState('');
  // Detail expansion (1): expanded activity key "dayIdx-actIdx"
  const [expandedAct, setExpandedAct] = useState<string | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  // Fetch AI details (tips/why) on demand
  const fetchActivityDetails = async (dayIdx: number, actIdx: number, act: any) => {
    const key = `${dayIdx}-${actIdx}`;
    setExpandedAct(key);
    if (act?.tips || act?.why || detailLoading) return; // already has details
    setDetailLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (apiKey) headers['X-API-Key'] = apiKey;
      if (apiUrl) headers['X-API-URL'] = apiUrl;
      if (modelName) headers['X-API-Model'] = modelName;
      const response = await axios.post('http://localhost:8000/api/itinerary/details', {
        activities: [act],
      }, { headers });
      const details = response.data?.details || {};
      const actDetails = details[act?.name];
      if (actDetails && itinerary) {
        const updated = { ...itinerary };
        const target = updated.daily_plans[dayIdx]?.activities?.[actIdx];
        if (target) {
          if (actDetails.tips) target.tips = actDetails.tips;
          if (actDetails.why) target.why = actDetails.why;
        }
        setItinerary(updated);
      }
    } catch (e) {
      // silently ignore - details optional
    } finally {
      setDetailLoading(false);
    }
  };
  // Manual edit (2): editing state
  const [editingAct, setEditingAct] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; time: string; cost: string; description: string; tips: string; why: string }>({ name: '', time: '', cost: '', description: '', tips: '', why: '' });
  // AI modify (2b): modify request input
  const [aiModifyOpen, setAiModifyOpen] = useState(false);
  const [aiModifyReq, setAiModifyReq] = useState('');
  const [aiModifying, setAiModifying] = useState(false);
  // Export (3)
  const [exportOpen, setExportOpen] = useState(false);
  const [exportCopied, setExportCopied] = useState(false);
  // Progress bar state
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('');
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Progress stages with target percentages (staged pauses)
  const PROGRESS_STAGES = [
    { target: 25, text: '正在规划路线...', duration: 5000 },
    { target: 45, text: 'AI 正在思考行程方案...', duration: 8000 },
    { target: 65, text: '生成每日行程中...', duration: 10000 },
    { target: 85, text: '计算费用与行程细节...', duration: 10000 },
    { target: 95, text: '整理行程，即将完成...', duration: 10000 },
  ];

  // Start simulated progress with staged pauses
  const startProgress = () => {
    setProgress(0);
    setProgressStage(PROGRESS_STAGES[0].text);
    let stageIdx = 0;
    let current = 0;

    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    progressTimerRef.current = setInterval(() => {
      const stage = PROGRESS_STAGES[stageIdx];
      if (!stage) return;

      // Move toward stage target
      const increment = (stage.target - current) / (stage.duration / 300);
      current = Math.min(current + Math.max(increment, 0.3), stage.target);
      setProgress(Math.floor(current));

      // Advance to next stage when reached
      if (current >= stage.target && stageIdx < PROGRESS_STAGES.length - 1) {
        stageIdx++;
        setProgressStage(PROGRESS_STAGES[stageIdx].text);
      }
    }, 300);
  };

  // Finish progress (100% or fail)
  const stopProgress = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };
  // New: Scope selector - global vs domestic cities
  const [scopeMode, setScopeMode] = useState<'global' | 'domestic'>('global');

  // API Key state - persisted in localStorage
  // NOTE: useState 初始化为空（SSR 与客户端一致），useEffect 挂载后读取 localStorage（避免 hydration 失败）
  const [apiKey, setApiKey] = useState<string>('');
  const [apiUrl, setApiUrl] = useState<string>('');
  const [modelName, setModelName] = useState<string>('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // History state - persisted in localStorage
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load persisted values AFTER mount (hydration-safe)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedKey = localStorage.getItem('travel_planner_api_key');
      if (savedKey) setApiKey(savedKey);
      const savedUrl = localStorage.getItem('travel_planner_api_url');
      if (savedUrl) setApiUrl(savedUrl);
      const savedModel = localStorage.getItem('travel_planner_model');
      if (savedModel) setModelName(savedModel);
      const savedHistory = localStorage.getItem('travel_planner_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      const savedCosts = localStorage.getItem('travel_planner_cost_reports');
      if (savedCosts) {
        setCostReports(JSON.parse(savedCosts));
      }
    } catch (e) {
      // ignore corrupted storage
    }
  }, []);

  // Save a user-reported actual cost for an activity (方案 D 众包)
  const submitCostReport = (activityName: string) => {
    const amount = parseFloat(reportAmount);
    if (isNaN(amount) || amount <= 0) return;
    const updated = {
      ...costReports,
      [activityName]: { amount, note: reportNote.trim(), ts: Date.now() }
    };
    setCostReports(updated);
    if (typeof window !== 'undefined') {
      try { localStorage.setItem('travel_planner_cost_reports', JSON.stringify(updated)); } catch (e) {}
    }
    setReportingFor(null);
    setReportAmount('');
    setReportNote('');
  };

  // Manual edit: start editing an activity
  const startEditActivity = (dayIdx: number, actIdx: number, act: any) => {
    const key = `${dayIdx}-${actIdx}`;
    setEditingAct(key);
    setExpandedAct(key);
    setEditForm({
      name: act?.name || '',
      time: act?.time || '',
      cost: act?.estimated_cost ? String(act.estimated_cost) : '',
      description: act?.description || '',
      tips: act?.tips || '',
      why: act?.why || '',
    });
  };

  // Manual edit: save changes to the itinerary
  const saveEditActivity = (dayIdx: number, actIdx: number) => {
    if (!itinerary) return;
    const updated = { ...itinerary };
    const act = updated.daily_plans[dayIdx]?.activities?.[actIdx];
    if (!act) return;
    if (editForm.name) act.name = editForm.name;
    if (editForm.time) act.time = editForm.time;
    const cost = parseFloat(editForm.cost);
    if (!isNaN(cost) && cost >= 0) act.estimated_cost = cost;
    act.description = editForm.description;
    act.tips = editForm.tips;
    act.why = editForm.why;
    // Recompute daily total + grand total
    for (const plan of updated.daily_plans) {
      plan.total_cost = (plan.activities || []).reduce((s: number, a: any) => s + (a.estimated_cost || 0), 0);
    }
    updated.total_estimated_cost = (updated.daily_plans || []).reduce((s: number, p: any) => s + (p.total_cost || 0), 0);
    setItinerary(updated);
    setEditingAct(null);
  };

  // AI modify: ask AI to adjust the itinerary
  const handleAiModify = async () => {
    if (!itinerary || !aiModifyReq.trim()) return;
    setAiModifying(true);
    try {
      const headers: Record<string, string> = {};
      if (apiKey) headers['X-API-Key'] = apiKey;
      if (apiUrl) headers['X-API-URL'] = apiUrl;
      if (modelName) headers['X-API-Model'] = modelName;
      const response = await axios.post('http://localhost:8000/api/itinerary/modify', {
        itinerary: itinerary,
        request: aiModifyReq.trim(),
        start_city: input.start_city,
        end_city: input.end_city,
      }, { headers });
      setItinerary(response.data);
      setAiModifyOpen(false);
      setAiModifyReq('');
    } catch (err: any) {
      alert(err.response?.data?.detail || 'AI 修改失败，请重试');
    } finally {
      setAiModifying(false);
    }
  };

  // Export: build markdown text from itinerary
  const buildMarkdown = (): string => {
    if (!itinerary) return '';
    const lines: string[] = [];
    lines.push(`# 🧳 旅行行程：${itinerary.start_city} → ${itinerary.end_city}`);
    lines.push('');
    lines.push(`- 📅 天数：${itinerary.days} 天`);
    lines.push(`- 💰 预估总费用：¥${itinerary.total_estimated_cost || 0}`);
    lines.push('');
    const breakdown = itinerary.cost_breakdown || {};
    if (Object.keys(breakdown).length > 0) {
      lines.push('## 💰 费用明细');
      for (const [k, v] of Object.entries(breakdown)) {
        lines.push(`- ${k}：¥${v}`);
      }
      lines.push('');
    }
    for (const day of itinerary.daily_plans || []) {
      lines.push(`## 📅 Day ${day.day}｜${day.theme || ''}${day.date ? `（${day.date}）` : ''}`);
      lines.push('');
      for (const act of day.activities || []) {
        const icon = act.type === 'hotel' ? '🏨' : act.type === 'restaurant' ? '🍽️' : act.type === 'transport' ? '🚆' : '📍';
        const cost = act.estimated_cost ? ` ¥${act.estimated_cost}` : '';
        const time = act.time ? `${act.time} ` : '';
        lines.push(`- ${icon} ${time}**${act.name}**${cost}`);
        if (act.description) lines.push(`  - ${act.description}`);
        if (act.tips) lines.push(`  - 💡 ${act.tips}`);
        if (act.why) lines.push(`  - ⭐ ${act.why}`);
      }
      if (day.notes) lines.push(`- 💬 ${day.notes}`);
      lines.push('');
    }
    return lines.join('\n');
  };

  // Export: copy markdown to clipboard
  const copyMarkdown = async () => {
    const md = buildMarkdown();
    try {
      await navigator.clipboard.writeText(md);
      setExportCopied(true);
      setTimeout(() => setExportCopied(false), 2000);
    } catch (e) {
      // fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = md;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setExportCopied(true);
      setTimeout(() => setExportCopied(false), 2000);
    }
  };

  // Export: download markdown file
  const downloadMarkdown = () => {
    const md = buildMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `行程_${input.start_city?.split(',')[0] || '旅行'}_${input.end_city?.split(',')[0] || ''}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export: print to PDF (browser print dialog)
  const printPdf = () => {
    window.print();
  };

  // Persist history to localStorage
  const saveHistory = (record: any) => {
    setHistory(prev => {
      const updated = [record, ...prev].slice(0, 20);
      if (typeof window !== 'undefined') {
        localStorage.setItem('travel_planner_history', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('travel_planner_history', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('travel_planner_history');
    }
  };

  // Load a history record back into the form
  const loadHistoryItem = (item: any) => {
    setInput({
      start_city: item.start_city || '',
      end_city: item.end_city || '',
      days: item.days || 3,
      budget_per_day: item.budget_per_day || undefined,
      interests: item.interests || []
    });
    if (item.itinerary) {
      setItinerary(item.itinerary);
    }
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Persist settings to localStorage
  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('travel_planner_api_key', value);
    }
  };
  const handleApiUrlChange = (value: string) => {
    setApiUrl(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('travel_planner_api_url', value);
    }
  };
  const handleModelChange = (value: string) => {
    setModelName(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('travel_planner_model', value);
    }
  };

  const handleInputChange = (field: keyof JourneyInput, value: any) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const addInterest = (interest: string) => {
    if (!input.interests.includes(interest)) {
      setInput(prev => ({ ...prev, interests: [...prev.interests, interest] }));
    }
  };

  const removeInterest = (interest: string) => {
    setInput(prev => ({ 
      ...prev, 
      interests: prev.interests.filter(i => i !== interest) 
    }));
  };

  // Emoji icons for interest tags - user wants them visible!
  const availableInterests = [
    { id: 'history', label: '历史', icon: '🏛️' },
    { id: 'nature', label: '自然', icon: '🌲' },
    { id: 'food', label: '美食', icon: '🍜' },
    { id: 'shopping', label: '购物', icon: '🛍️' },
    { id: 'culture', label: '文化', icon: '🎭' },
    { id: 'adventure', label: '冒险', icon: '🧗' }
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    startProgress();
    
    try {
      const headers: Record<string, string> = {};
      if (apiKey) headers['X-API-Key'] = apiKey;
      if (apiUrl) headers['X-API-URL'] = apiUrl;
      if (modelName) headers['X-API-Model'] = modelName;
      
      const response = await axios.post('http://localhost:8000/api/itinerary/generate', input, { headers });
      stopProgress();
      setProgress(100);
      setItinerary(response.data);
      
      // Save to history
      saveHistory({
        id: response.data.journey_id || `trip_${Date.now()}`,
        start_city: input.start_city,
        end_city: input.end_city,
        days: input.days,
        budget_per_day: input.budget_per_day,
        interests: input.interests,
        scopeMode,
        itinerary: response.data,
        createdAt: Date.now()
      });
    } catch (err: any) {
      stopProgress();
      setProgress(0);
      setError(err.response?.data?.detail || '生成行程失败，请重试');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = input.start_city && input.end_city && input.days > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-orange-400 to-yellow-400">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur sticky top-0 z-50 border-b border-pink-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight tracking-tight bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">智能旅行规划师</h1>
              <p className="text-gray-700 mt-1 text-base font-normal max-w-xl">输入起点、终点和天数，AI 为您生成完美行程</p>
            </div>
            
            <div className="flex items-center gap-3 self-start md:self-center flex-wrap">
              {/* City Scope Selector Tab */}
              <div className="flex items-center space-x-1 bg-pink-50 rounded-full p-1 border border-pink-100">
                <button
                  onClick={() => setScopeMode('global')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    scopeMode === 'global'
                      ? 'bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🌍 全球
                </button>
                <button
                  onClick={() => setScopeMode('domestic')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    scopeMode === 'domestic'
                      ? 'bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🇨🇳 中国
                </button>
              </div>

              {/* History Button */}
              <button
                onClick={() => setShowHistory(true)}
                className="w-9 h-9 rounded-full bg-pink-50 border border-pink-100 text-gray-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-100 flex items-center justify-center transition-all duration-200 relative"
                title="历史记录"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {history.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 text-white text-[10px] font-bold flex items-center justify-center">
                    {history.length > 99 ? '99+' : history.length}
                  </span>
                )}
              </button>

              {/* Settings Gear Button */}
              <button
                onClick={() => setShowSettings(true)}
                className="w-9 h-9 rounded-full bg-pink-50 border border-pink-100 text-gray-500 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-100 flex items-center justify-center transition-all duration-200 group"
                title="API 设置"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 transition-transform duration-500 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowSettings(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold text-base flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                API 设置
              </h3>
              <button onClick={() => setShowSettings(false)} className="text-white/80 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-4">
              {/* API URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">API 地址 (URL)</label>
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => handleApiUrlChange(e.target.value)}
                  placeholder="https://api.deepseek.com/v1"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-100 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">支持 DeepSeek / OpenAI 兼容接口地址，留空使用默认</p>
              </div>

              {/* API Key */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">API Key</label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => handleApiKeyChange(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-xl border-2 border-gray-100 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
                    title={showApiKey ? '隐藏 Key' : '显示 Key'}
                  >
                    {showApiKey ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">每台设备前 8 次免费，之后需填写自己的 Key</p>
              </div>

              {/* Model Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">模型名称</label>
                <input
                  type="text"
                  value={modelName}
                  onChange={(e) => handleModelChange(e.target.value)}
                  placeholder="deepseek-chat"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-100 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none bg-gray-50 text-gray-800 placeholder-gray-400 transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">留空使用默认模型</p>
              </div>

              {/* Notice */}
              <div className="bg-gradient-to-r from-pink-50 to-yellow-50 border border-pink-100 rounded-xl px-4 py-3 text-xs text-gray-600 leading-relaxed">
                <div className="font-bold text-pink-600 mb-1">📌 注意事项</div>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>Key 仅保存在<b>你的浏览器本地</b>（localStorage），不会上传到服务器</li>
                  <li>使用你自己的 Key 产生的调用费用由 Key 所属账户承担</li>
                  <li>填写后无需刷新，直接生成即可生效；可随时修改或清除</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="px-5 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:shadow-lg transition-all"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowHistory(false)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold text-base flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                历史记录
                <span className="ml-2 text-xs font-semibold bg-white/25 rounded-full px-2 py-0.5">{history.length} 条</span>
              </h3>
              <button onClick={() => setShowHistory(false)} className="text-white/80 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body - History List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-400 font-medium">暂无历史记录</p>
                  <p className="text-gray-300 text-sm mt-1">生成行程后会自动保存到这里</p>
                </div>
              ) : (
                history.map((item: any) => (
                  <div key={item.id} className="bg-gray-50 hover:bg-pink-50 border-2 border-gray-100 hover:border-pink-200 rounded-2xl p-4 transition-all duration-200 cursor-pointer group" onClick={() => loadHistoryItem(item)}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                        <span className="text-pink-500">✈️</span>
                        <span>{item.start_city}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span>{item.end_city}</span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(item.createdAt).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="bg-white rounded-full px-2.5 py-0.5 font-medium border border-gray-100">📅 {item.days} 天</span>
                      {item.budget_per_day ? (
                        <span className="bg-white rounded-full px-2.5 py-0.5 font-medium border border-gray-100">💰 ¥{item.budget_per_day}/天</span>
                      ) : null}
                      {item.interests?.length > 0 && (
                        <span className="bg-white rounded-full px-2.5 py-0.5 font-medium border border-gray-100">
                          🎯 {item.interests.map((i: string) => availableInterests.find(x => x.id === i)?.icon || '').join(' ')}
                        </span>
                      )}
                      {item.itinerary?.total_estimated_cost ? (
                        <span className="ml-auto font-bold text-orange-500">¥{item.itinerary.total_estimated_cost.toLocaleString()}</span>
                      ) : null}
                    </div>
                    {/* Delete button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteHistoryItem(item.id); }}
                      className="absolute mt-[-12px] right-4 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
                      title="删除"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
              <button
                onClick={clearHistory}
                disabled={history.length === 0}
                className="px-3 py-2 text-xs font-semibold text-gray-400 hover:text-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                清空全部
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowHistory(false)}
                  className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  关闭
                </button>
                {history.length > 0 && (
                  <button
                    onClick={() => { loadHistoryItem(history[0]); }}
                    className="px-5 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:shadow-lg transition-all"
                  >
                    查看最新
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-6 py-8">
        {/* Input Form Card */}
        <section className="bg-white rounded-3xl shadow-xl border-2 border-white/60 p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/40 to-yellow-200/40 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center relative z-10">
            <span className="w-2 h-6 rounded-full bg-gradient-to-b from-pink-500 to-orange-400 mr-3 inline-block"></span>
            旅程信息
          </h2>
          
          <div className="space-y-5 relative z-10">
            {/* Start & End Cities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SearchCity
                label="起点城市"
                value={input.start_city}
                onChange={(city) => handleInputChange('start_city', city)}
                placeholder={`搜索${scopeMode === 'global' ? '全球' : '中国'}城市`}
                scope={scopeMode}
              />
              
              <SearchCity
                label="终点城市"
                value={input.end_city}
                onChange={(city) => handleInputChange('end_city', city)}
                placeholder={`搜索${scopeMode === 'global' ? '全球' : '中国'}城市`}
                scope={scopeMode}
              />
            </div>

            {/* Days Slider & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  旅行天数：<span className="font-bold text-pink-600">{input.days}</span>天
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={input.days}
                  onChange={(e) => handleInputChange('days', parseInt(e.target.value))}
                  className="w-full h-2.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg appearance-none cursor-pointer accent-gradient"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #FF6B9D 0%, #FFA62B 50%, #FFD93D 100%)',
                    backgroundSize: `${((input.days - 1) / 29) * 100}% 100%`,
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1 font-medium">
                  <span>1 天</span>
                  <span>{input.days}天</span>
                  <span>30 天</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">每日预算（元）</label>
                <input
                  type="number"
                  value={input.budget_per_day || ''}
                  onChange={(e) => handleInputChange('budget_per_day', e.target.value ? parseFloat(e.target.value) : undefined)}
                  placeholder="选填"
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-2xl text-base focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all outline-none bg-gray-50 hover:border-pink-200"
                />
              </div>
            </div>

            {/* Interests - WITH EMOJIS ✅ */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                兴趣爱好
                <span className="text-[10px] font-medium text-pink-500 bg-pink-50 border border-pink-100 rounded-full px-2 py-0.5">
                  ✨ 选择后生成针对性行程
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {availableInterests.map(interest => (
                  <button
                    key={interest.id}
                    onClick={() => input.interests.includes(interest.id) ? removeInterest(interest.id) : addInterest(interest.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                      input.interests.includes(interest.id)
                        ? interestColorsActive[interest.id]
                        : interestColors[interest.id]
                    }`}
                  >
                    <span className="mr-1.5 text-base">{interest.icon}</span>
                    {interest.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading || !isFormValid}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 transform ${
                loading || !isFormValid
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed transform scale-100'
                  : 'bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  正在生成...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">✨</span>
                  生成 AI 行程
                  <span className="ml-1 opacity-0 hover:opacity-100 transition-opacity transform translate-x-[-4px] hover:translate-x-0">→</span>
                </span>
              )}
            </button>
          </div>
        </section>

        {/* Travel Prep - shows for start & end cities */}
      {(() => {
        const cities: { name: string; prep: ReturnType<typeof getPrepForCity> }[] = [];
        const startName = input.start_city?.split(',')[0]?.trim();
        const endName = input.end_city?.split(',')[0]?.trim();
        
        if (startName) {
          const prep = getPrepForCity(startName, scopeMode);
          if (prep) cities.push({ name: startName, prep });
        }
        if (endName && endName !== startName) {
          const prep = getPrepForCity(endName, scopeMode);
          if (prep) cities.push({ name: endName, prep });
        }
        
        return cities.map(c => (
          <TravelPrepCard key={c.name} prep={c.prep!} cityName={c.name} isDomestic={scopeMode === 'domestic'} />
        ));
      })()}

      {/* Error Message */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-pink-500 text-red-700 px-4 py-3 rounded-lg mb-6 relative overflow-hidden">
            <div className="relative z-10"><p className="font-medium">{error}</p></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-500 opacity-20"></div>
          </div>
        )}

        {/* Results Section - shows during loading (progress bar) and after (itinerary) */}
        {(itinerary || loading) && (
          <section className="bg-white rounded-3xl shadow-xl border-2 border-white/60 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400"></div>
            
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center relative z-10">
              <span className="w-2 h-6 rounded-full bg-gradient-to-b from-pink-500 to-yellow-400 mr-3 inline-block"></span>
              您的行程安排
              {/* AI modify + Export buttons */}
              {itinerary && (
                <span className="ml-auto flex gap-2">
                  <button
                    onClick={() => setAiModifyOpen(true)}
                    className="text-[11px] font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full px-3 py-1.5 hover:shadow-md transition-all"
                  >
                    ✨ AI 调整
                  </button>
                  <button
                    onClick={() => setExportOpen(true)}
                    className="text-[11px] font-semibold text-white bg-gradient-to-r from-green-500 to-teal-400 rounded-full px-3 py-1.5 hover:shadow-md transition-all"
                  >
                    📤 导出
                  </button>
                </span>
              )}
            </h2>

            {/* Summary Cards - only when itinerary exists */}
            {itinerary && (
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-4 rounded-2xl text-white shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
                <div className="text-3xl font-bold">{itinerary.days}</div>
                <div className="text-sm opacity-90 mt-1 font-medium">总天数</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-4 rounded-2xl text-white shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
                <div className="text-3xl font-bold">¥{typeof itinerary.total_estimated_cost === 'number' ? itinerary.total_estimated_cost.toLocaleString() : '--'}</div>
                <div className="text-sm opacity-90 mt-1 font-medium">预估费用</div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 rounded-2xl text-white shadow-md hover:shadow-lg transition-shadow transform hover:-translate-y-1">
                <div className="text-3xl font-bold">{itinerary.daily_plans?.length || 0}</div>
                <div className="text-sm opacity-90 mt-1 font-medium">日程项</div>
              </div>
            </div>
            )}

            {/* Cost Breakdown - only when itinerary exists */}
            {itinerary?.cost_breakdown && Object.keys(itinerary.cost_breakdown).length > 0 && (
              <div className="mb-6 relative z-10">
                <div className="text-xs font-bold text-gray-400 mb-2">💰 费用明细</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(itinerary.cost_breakdown).map(([key, val]: [string, any]) => (
                    <span key={key} className="bg-gradient-to-r from-pink-50 to-yellow-50 border border-pink-100 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700">
                      {key} <span className="text-orange-500 font-bold">¥{typeof val === 'number' ? val.toLocaleString() : val}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Plans */}
            {itinerary?.daily_plans && itinerary.daily_plans.length > 0 ? (
              <div className="space-y-6 relative z-10">
                {itinerary.daily_plans.map((day: any, dayIdx: number) => (
                  <div key={dayIdx} className="border-2 border-gray-100 rounded-2xl overflow-hidden">
                    {/* Day Header */}
                    <div className="bg-gradient-to-r from-pink-50 to-yellow-50 px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-gradient-to-br from-pink-500 to-orange-400 text-white font-bold text-sm rounded-xl w-9 h-9 flex items-center justify-center shadow-sm">
                          {day?.day || dayIdx + 1}
                        </span>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">
                            {day?.theme || `第 ${day?.day || dayIdx + 1} 天`}
                          </div>
                          {day?.date && (
                            <div className="text-xs text-gray-400 font-medium">{day.date}</div>
                          )}
                        </div>
                      </div>
                      {typeof day?.total_cost === 'number' && (
                        <span className="text-sm font-bold text-orange-500">¥{day.total_cost.toLocaleString()}</span>
                      )}
                    </div>

                    {/* Activities */}
                    <div className="divide-y divide-gray-50">
                      {day?.activities?.map((act: any, actIdx: number) => (
                        <div key={actIdx} className="flex items-start gap-3 px-5 py-3 hover:bg-pink-50/50 transition-colors">
                          {/* Time badge */}
                          {act?.time && (
                            <span className="flex-shrink-0 mt-0.5 w-14 text-center bg-gradient-to-r from-pink-50 to-yellow-50 border border-pink-100 rounded-lg py-1 text-[11px] font-bold text-pink-600">
                              {act.time}
                            </span>
                          )}
                          {/* Type Icon */}
                          <span className="text-lg flex-shrink-0 mt-0.5">
                            {act?.type === 'hotel' ? '🏨' : act?.type === 'restaurant' ? '🍽️' : act?.type === 'transport' ? '🚆' : '📍'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-gray-900 text-sm">{act?.name || ''}</span>
                              {typeof act?.estimated_cost === 'number' && act.estimated_cost > 0 && (
                                <span className="text-xs font-bold flex-shrink-0">
                                  <span className={act?.price_source === 'official' ? 'text-green-600' : 'text-orange-500'}>
                                    ¥{act.estimated_cost}
                                  </span>
                                  <span className={`font-normal ml-1 ${act?.price_source === 'official' ? 'text-green-500 bg-green-50 rounded px-1 py-0.5' : 'text-gray-400'}`}>
                                    {act?.price_source === 'official' ? '官方价' : '参考'}
                                  </span>
                                </span>
                              )}
                              {act?.ticket_price_range && (
                                <span className="text-[10px] text-green-600 bg-green-50 rounded px-1 py-0.5 flex-shrink-0">
                                  门票{act.ticket_price_range}元
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2 flex-wrap">
                              <span className="bg-gray-100 rounded-full px-2 py-0.5 font-medium">{act?.category || act?.type || ''}</span>
                              {typeof act?.duration_hours === 'number' && (
                                <span>⏱ {act.duration_hours}小时</span>
                              )}
                              {act?.rating ? (
                                <span className="text-yellow-500">⭐ {act.rating}</span>
                              ) : null}
                            </div>
                            {act?.description && (
                              <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{act.description}</p>
                            )}
                            {/* Detail expansion (1) */}
                            <button
                              onClick={() => {
                                if (expandedAct === `${dayIdx}-${actIdx}`) {
                                  setExpandedAct(null);
                                } else {
                                  fetchActivityDetails(dayIdx, actIdx, act);
                                }
                              }}
                              className="mt-1.5 text-[11px] font-semibold text-pink-500 hover:text-pink-700 transition-colors"
                            >
                              {expandedAct === `${dayIdx}-${actIdx}` ? '▲ 收起详情' : (detailLoading ? '⏳ 加载详情...' : '▼ 查看详情')}
                            </button>
                            {expandedAct === `${dayIdx}-${actIdx}` && (
                              <div className="mt-2 bg-gradient-to-br from-pink-50/70 to-yellow-50/70 border border-pink-100 rounded-xl p-3 space-y-2">
                                {act?.description && (
                                  <p className="text-xs text-gray-700 leading-relaxed"><span className="font-bold text-pink-600">📖 介绍：</span>{act.description}</p>
                                )}
                                {act?.tips && (
                                  <p className="text-xs text-gray-700 leading-relaxed"><span className="font-bold text-amber-600">💡 建议：</span>{act.tips}</p>
                                )}
                                {act?.why && (
                                  <p className="text-xs text-gray-700 leading-relaxed"><span className="font-bold text-green-600">⭐ 推荐理由：</span>{act.why}</p>
                                )}
                                {/* Edit button (2) */}
                                <div className="flex gap-2 pt-1">
                                  <button
                                    onClick={() => startEditActivity(dayIdx, actIdx, act)}
                                    className="px-2.5 py-1 text-[11px] font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg hover:shadow-md transition-all"
                                  >
                                    ✏️ 编辑此项
                                  </button>
                                </div>
                              </div>
                            )}
                            {/* 众包：用户报告实际花费（方案 D） */}
                            {costReports[act?.name] ? (
                              <div className="mt-1.5 text-xs text-blue-600 bg-blue-50 rounded-lg px-2 py-1 inline-block">
                                💡 有用户实际花费：¥{costReports[act.name].amount}
                                {costReports[act.name].note ? `（${costReports[act.name].note}）` : ''}
                              </div>
                            ) : (
                              reportingFor === act?.name ? (
                                <div className="mt-2 flex items-center gap-2 flex-wrap bg-blue-50/60 rounded-lg p-2">
                                  <input
                                    type="number"
                                    placeholder="实际花费 ¥"
                                    value={reportAmount}
                                    onChange={(e) => setReportAmount(e.target.value)}
                                    className="w-24 px-2 py-1 text-xs border border-blue-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                                  />
                                  <input
                                    type="text"
                                    placeholder="备注（可选）"
                                    value={reportNote}
                                    onChange={(e) => setReportNote(e.target.value)}
                                    className="w-32 px-2 py-1 text-xs border border-blue-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                                  />
                                  <button
                                    onClick={() => submitCostReport(act.name)}
                                    className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                  >
                                    提交
                                  </button>
                                  <button
                                    onClick={() => setReportingFor(null)}
                                    className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
                                  >
                                    取消
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => { setReportingFor(act.name); setReportAmount(''); setReportNote(''); }}
                                  className="mt-1.5 text-[10px] text-gray-400 hover:text-blue-500 transition-colors"
                                  title="分享你的实际花费，帮助其他旅行者"
                                >
                                  📝 报实际花费
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Day Notes */}
                    {day?.notes && (
                      <div className="px-5 py-2.5 bg-gray-50/80 text-xs text-gray-500">
                        💡 {day.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 relative z-10">
                {/* Animated icon */}
                <div className="relative w-20 h-20 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 to-orange-300 opacity-30 animate-ping"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 opacity-40 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <svg className="w-9 h-9 text-pink-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                </div>

                <p className="text-lg font-bold text-gray-900 mb-1">AI 正在生成您的专属行程</p>
                <p className="text-sm text-gray-500 mb-6">{progressStage || '正在准备...'}</p>

                {/* Progress bar */}
                <div className="max-w-md mx-auto mb-3">
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400 font-medium">生成约需 30-60 秒</span>
                    <span className="text-sm font-bold text-pink-500">{progress}%</span>
                  </div>
                </div>

                {/* Stage dots */}
                <div className="flex justify-center gap-2">
                  {PROGRESS_STAGES.map((stage, i) => {
                    const reached = progress >= stage.target;
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full transition-all ${reached ? 'bg-gradient-to-r from-pink-500 to-orange-400 scale-125' : 'bg-gray-200'}`}></div>
                        {i < PROGRESS_STAGES.length - 1 && <div className="w-4 h-px bg-gray-200"></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Edit Activity Modal (2) */}
        {editingAct && itinerary && (() => {
          const [dIdx, aIdx] = editingAct.split('-').map(Number);
          return (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setEditingAct(null)}>
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-pink-500 to-orange-400 inline-block"></span>
                  ✏️ 编辑活动
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">名称</label>
                    <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">时间</label>
                      <input value={editForm.time} placeholder="如 09:00" onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">费用 ¥</label>
                      <input type="number" value={editForm.cost} onChange={(e) => setEditForm({ ...editForm, cost: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">介绍</label>
                    <textarea value={editForm.description} rows={2} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">建议/注意</label>
                    <textarea value={editForm.tips} rows={2} onChange={(e) => setEditForm({ ...editForm, tips: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">推荐理由</label>
                    <textarea value={editForm.why} rows={2} onChange={(e) => setEditForm({ ...editForm, why: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-5">
                  <button onClick={() => setEditingAct(null)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">取消</button>
                  <button onClick={() => saveEditActivity(dIdx, aIdx)} className="px-5 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:shadow-lg transition-all">保存修改</button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* AI Modify Modal (2b) */}
        {aiModifyOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setAiModifyOpen(false)}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-blue-500 to-indigo-400 inline-block"></span>
                ✨ AI 调整行程
              </h3>
              <p className="text-xs text-gray-500 mb-3">告诉 AI 你想怎么改，例如：第三天加一个夜市、第一天换一家更便宜的酒店、减少一天行程...</p>
              <textarea
                value={aiModifyReq}
                onChange={(e) => setAiModifyReq(e.target.value)}
                rows={3}
                placeholder="例如：第二天下午加一个水族馆，晚上换成夜市"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setAiModifyOpen(false)} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">取消</button>
                <button
                  onClick={handleAiModify}
                  disabled={aiModifying || !aiModifyReq.trim()}
                  className="px-5 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-blue-500 to-indigo-400 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {aiModifying ? '⏳ AI 调整中...' : '开始调整'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Export Modal (3) */}
        {exportOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setExportOpen(false)}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-green-500 to-teal-400 inline-block"></span>
                📤 导出行程
              </h3>
              <div className="space-y-3">
                <button onClick={copyMarkdown} className="w-full flex items-center gap-3 p-3 border-2 border-gray-100 rounded-2xl hover:border-green-300 hover:bg-green-50/50 transition-all text-left">
                  <span className="text-2xl">📋</span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-900">复制 Markdown</span>
                    <span className="block text-xs text-gray-400">{exportCopied ? '✅ 已复制到剪贴板！' : '复制为文本，可粘贴到笔记/微信'}</span>
                  </span>
                </button>
                <button onClick={downloadMarkdown} className="w-full flex items-center gap-3 p-3 border-2 border-gray-100 rounded-2xl hover:border-green-300 hover:bg-green-50/50 transition-all text-left">
                  <span className="text-2xl">📄</span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-900">下载 .md 文件</span>
                    <span className="block text-xs text-gray-400">保存为 Markdown 文档</span>
                  </span>
                </button>
                <button onClick={printPdf} className="w-full flex items-center gap-3 p-3 border-2 border-gray-100 rounded-2xl hover:border-green-300 hover:bg-green-50/50 transition-all text-left">
                  <span className="text-2xl">🖨️</span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-900">打印 / 存为 PDF</span>
                    <span className="block text-xs text-gray-400">浏览器打印对话框，选择&ldquo;另存为 PDF&rdquo;</span>
                  </span>
                </button>
              </div>
              <div className="flex justify-end mt-5">
                <button onClick={() => setExportOpen(false)} className="px-5 py-2 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-green-500 to-teal-400 hover:shadow-lg transition-all">关闭</button>
              </div>
            </div>
          </div>
        )}

        {/* Feature Cards */}
        {!itinerary && !loading && (
          <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 路线优化 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-white/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl text-white">
                  <MapIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">路线优化</h3>
                  <p className="text-sm text-gray-600">不走回头路，科学规划起点到终点的最佳路径</p>
                </div>
              </div>
            </div>

            {/* AI 智能规划 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-white/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl text-white">
                  <AICogIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI 智能规划</h3>
                  <p className="text-sm text-gray-600">根据您的兴趣和偏好，生成个性化的每日行程</p>
                </div>
              </div>
            </div>

            {/* 花费估算 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-white/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl text-white">
                  <MoneyIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">花费估算</h3>
                  <p className="text-sm text-gray-600">门票 + 交通 + 餐饮 + 住宿，详细费用一目了然</p>
                </div>
              </div>
            </div>

            {/* 出行准备 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-white/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">出行准备</h3>
                  <p className="text-sm text-gray-600">证件签证、货币插头、天气健康，出发前一次看清</p>
                </div>
              </div>
            </div>

            {/* 旅行贴士 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-white/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">旅行贴士</h3>
                  <p className="text-sm text-gray-600">当地习俗、避坑指南、安全提醒，玩得更顺心</p>
                </div>
              </div>
            </div>

            {/* 更多服务 */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-white/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI 解答</h3>
                  <p className="text-sm text-gray-600">行程问题随时问，生成后还可追问细节调整</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
