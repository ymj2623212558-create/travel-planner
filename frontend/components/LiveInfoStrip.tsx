// 结果页实时天气/汇率小组件（轻量版，用于行程结果区）
import { useEffect, useState } from 'react';
import { getWeather, getExchangeRate, WeatherInfo, ExchangeRate, getCurrencyForCity } from '@/lib/live-data';

interface LiveInfoStripProps {
  cityName: string;      // 终点城市名（如 "东京"）
}

export default function LiveInfoStrip({ cityName }: LiveInfoStripProps) {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [rate, setRate] = useState<ExchangeRate | null>(null);

  useEffect(() => {
    let cancelled = false;
    setWeather(null);
    setRate(null);
    if (!cityName) return;

    (async () => {
      const w = await getWeather(cityName);
      if (!cancelled) setWeather(w);
      const r = await getExchangeRate(cityName);
      if (!cancelled) setRate(r);
    })();

    return () => { cancelled = true; };
  }, [cityName]);

  const hasData = weather || (rate && rate.currency !== 'CNY');
  if (!hasData) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {weather && (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-700 bg-white border border-pink-100 rounded-full px-3 py-1 shadow-sm">
          {weather.icon} {cityName} {weather.temp}°C {weather.desc}
          <span className="text-green-500 font-bold">实时</span>
        </span>
      )}
      {rate && rate.currency !== 'CNY' && (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-700 bg-white border border-pink-100 rounded-full px-3 py-1 shadow-sm">
          💱 1元≈{rate.rate} {rate.currency}
          <span className="text-green-500 font-bold">实时</span>
        </span>
      )}
    </div>
  );
}
