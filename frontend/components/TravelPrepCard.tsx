import { useEffect, useState } from 'react';
import { TravelPrep } from '@/data/travel-prep';
import { getWeather, getExchangeRate, WeatherInfo, ExchangeRate } from '@/lib/live-data';

interface TravelPrepCardProps {
  prep: TravelPrep;
  cityName: string;
  isDomestic: boolean;
}

function LiveBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-1.5 py-0.5 ml-2 align-middle">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      {label}
    </span>
  );
}

function FallbackBadge() {
  return (
    <span className="inline-flex items-center text-[10px] font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-1.5 py-0.5 ml-2 align-middle">
      ⚠️ 实时获取失败，显示参考值
    </span>
  );
}

export default function TravelPrepCard({ prep, cityName, isDomestic }: TravelPrepCardProps) {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [weatherFailed, setWeatherFailed] = useState(false);
  const [rate, setRate] = useState<ExchangeRate | null>(null);
  const [rateFailed, setRateFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setWeather(null);
    setWeatherFailed(false);
    setRate(null);
    setRateFailed(false);

    // 实时天气
    getWeather(cityName).then(w => {
      if (cancelled) return;
      if (w) setWeather(w);
      else setWeatherFailed(true);
    });

    // 实时汇率（非人民币城市才查）
    if (!isDomestic) {
      getExchangeRate(cityName).then(r => {
        if (cancelled) return;
        if (r && r.live) setRate(r);
        else setRateFailed(true);
      });
    }

    return () => { cancelled = true; };
  }, [cityName, isDomestic]);

  const prepItems = [
    { icon: '🛂', label: '证件', value: prep.documents },
    { icon: '🎫', label: '签证/预约', value: prep.visa },
    { icon: '💰', label: '货币', value: prep.currency },
    { icon: '🔌', label: '插头/电压', value: prep.plug },
    { icon: '📱', label: '通讯', value: prep.comm },
    { icon: '💉', label: '健康', value: prep.health },
    { icon: '🌦️', label: '天气', value: prep.weather },
  ];

  return (
    <section className="bg-white rounded-3xl shadow-xl border-2 border-white/60 p-6 md:p-8 mb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400"></div>

      <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center relative z-10">
        <span className="w-2 h-6 rounded-full bg-gradient-to-b from-pink-500 to-yellow-400 mr-3 inline-block"></span>
        出行准备 · {cityName}
      </h2>
      <p className="text-xs text-gray-400 mb-5 relative z-10">
        {isDomestic ? '国内旅行准备清单' : '国际旅行准备清单（请以官方最新要求为准）'}
      </p>

      {/* Live Weather & Exchange Rate Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 relative z-10">
        {/* 实时天气 */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl px-4 py-3">
          <span className="text-2xl flex-shrink-0">
            {weather ? weather.icon : (weatherFailed ? '🌡️' : '⏳')}
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-blue-500 mb-0.5 flex items-center">
              实时天气
              {weather ? <LiveBadge label="实时" /> : weatherFailed ? <FallbackBadge /> : <span className="text-[10px] text-gray-300 ml-2">获取中...</span>}
            </div>
            {weather ? (
              <div className="text-gray-800 font-bold">
                {weather.temp}°C {weather.desc}
                <span className="text-xs font-normal text-gray-500 ml-2">
                  {weather.humidity !== undefined && `湿度${weather.humidity}%`}
                  {weather.windSpeed !== undefined && ` 风${weather.windSpeed}km/h`}
                </span>
                <span className="text-[10px] text-gray-400 font-normal ml-2">更新于 {weather.updatedAt}</span>
              </div>
            ) : weatherFailed ? (
              <div className="text-sm text-gray-600 font-medium">{prep.weather}</div>
            ) : (
              <div className="text-sm text-gray-400">正在获取...</div>
            )}
          </div>
        </div>

        {/* 实时汇率（国际城市） */}
        {!isDomestic ? (
          <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl px-4 py-3">
            <span className="text-2xl flex-shrink-0">💱</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-green-600 mb-0.5 flex items-center">
                实时汇率
                {rate ? <LiveBadge label="实时" /> : rateFailed ? <FallbackBadge /> : <span className="text-[10px] text-gray-300 ml-2">获取中...</span>}
              </div>
              {rate ? (
                <div className="text-gray-800 font-bold">
                  1¥ ≈ {rate.rate.toFixed(2)} {rate.symbol}
                  <span className="text-xs font-normal text-gray-500 ml-2">{rate.currency}</span>
                  {rate.updatedAt && (
                    <span className="text-[10px] text-gray-400 font-normal ml-2">更新于 {rate.updatedAt}</span>
                  )}
                </div>
              ) : rateFailed ? (
                <div className="text-sm text-gray-600 font-medium">{prep.currency}</div>
              ) : (
                <div className="text-sm text-gray-400">正在获取...</div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl px-4 py-3">
            <span className="text-2xl flex-shrink-0">💱</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-green-600 mb-0.5">货币</div>
              <div className="text-gray-800 font-bold text-sm">{prep.currency}</div>
            </div>
          </div>
        )}
      </div>

      {/* 静态准备信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
        {prepItems.map(item => (
          <div key={item.label} className="flex items-start gap-3 bg-gray-50 hover:bg-pink-50 rounded-xl px-4 py-3 transition-colors">
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <div className="min-w-0">
              <div className="text-xs font-bold text-gray-400 mb-0.5">{item.label}</div>
              <div className="text-sm text-gray-800 font-medium leading-snug">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      {prep.tips.length > 0 && (
        <div className="mt-4 relative z-10">
          <div className="text-xs font-bold text-gray-400 mb-2 flex items-center">
            <span className="mr-1.5">💡</span> 旅行贴士
          </div>
          <div className="flex flex-wrap gap-2">
            {prep.tips.map((tip, i) => (
              <span key={i} className="bg-gradient-to-r from-pink-50 to-yellow-50 border border-pink-100 text-gray-700 text-xs font-medium rounded-full px-3 py-1.5">
                {tip}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
