// 实时数据层 - 天气 + 汇率
// 全部免费 API，无需 Key；双源互备 + 失败兜底
import { getCityCoord } from '@/data/city-coords';

// ========== 汇率 ==========
const EXCHANGE_PRIMARY = 'https://api.frankfurter.dev/v1/latest';
const EXCHANGE_BACKUP = 'https://open.er-api.com/v6/latest';

// 国家 → ISO 货币代码（用于汇率查询）
const COUNTRY_CURRENCY: Record<string, string> = {
  '日本': 'JPY', '韩国': 'KRW', '新加坡': 'SGD', '泰国': 'THB', '马来西亚': 'MYR',
  '越南': 'VND', '印度尼西亚': 'IDR', '菲律宾': 'PHP', '法国': 'EUR', '意大利': 'EUR',
  '英国': 'GBP', '德国': 'EUR', '西班牙': 'EUR', '葡萄牙': 'EUR', '希腊': 'EUR',
  '瑞士': 'CHF', '荷兰': 'EUR', '美国': 'USD', '加拿大': 'CAD', '澳大利亚': 'AUD',
  '新西兰': 'NZD', '阿联酋': 'AED', '土耳其': 'TRY', '埃及': 'EGP',
  '中国': 'CNY', '北京': 'CNY', '上海': 'CNY', '广州': 'CNY', '深圳': 'CNY',
  '成都': 'CNY', '重庆': 'CNY', '杭州': 'CNY', '南京': 'CNY', '武汉': 'CNY',
  '西安': 'CNY', '长沙': 'CNY', '昆明': 'CNY', '大理': 'CNY', '丽江': 'CNY',
  '桂林': 'CNY', '三亚': 'CNY', '海口': 'CNY', '哈尔滨': 'CNY', '青岛': 'CNY',
  '厦门': 'CNY', '苏州': 'CNY', '天津': 'CNY', '沈阳': 'CNY', '大连': 'CNY',
  '郑州': 'CNY', '洛阳': 'CNY', '济南': 'CNY', '兰州': 'CNY', '西宁': 'CNY',
  '银川': 'CNY', '乌鲁木齐': 'CNY', '拉萨': 'CNY', '呼和浩特': 'CNY', '石家庄': 'CNY',
  '太原': 'CNY', '南昌': 'CNY', '合肥': 'CNY', '福州': 'CNY', '南宁': 'CNY',
  '贵阳': 'CNY', '长春': 'CNY', '敦煌': 'CNY', '香港': 'HKD', '澳门': 'MOP', '台湾': 'TWD',
  '东京': 'JPY', '大阪': 'JPY', '京都': 'JPY', '奈良': 'JPY', '札幌': 'JPY', '冲绳': 'JPY', '福冈': 'JPY',
  '首尔': 'KRW', '釜山': 'KRW', '济州岛': 'KRW',
  '曼谷': 'THB', '清迈': 'THB', '普吉岛': 'THB', '芭堤雅': 'THB',
  '吉隆坡': 'MYR', '槟城': 'MYR', '马六甲': 'MYR',
  '胡志明市': 'VND', '河内': 'VND', '岘港': 'VND', '芽庄': 'VND',
  '巴厘岛': 'IDR', '雅加达': 'IDR', '马尼拉': 'PHP', '宿务': 'PHP', '长滩岛': 'PHP',
  '巴黎': 'EUR', '尼斯': 'EUR', '马赛': 'EUR', '罗马': 'EUR', '米兰': 'EUR',
  '威尼斯': 'EUR', '佛罗伦萨': 'EUR', '伦敦': 'GBP', '爱丁堡': 'GBP', '曼彻斯特': 'GBP',
  '柏林': 'EUR', '慕尼黑': 'EUR', '法兰克福': 'EUR', '巴塞罗那': 'EUR', '马德里': 'EUR',
  '塞维利亚': 'EUR', '里斯本': 'EUR', '波尔图': 'EUR', '雅典': 'EUR', '圣托里尼': 'EUR',
  '苏黎世': 'CHF', '日内瓦': 'CHF', '因特拉肯': 'CHF', '阿姆斯特丹': 'EUR', '鹿特丹': 'EUR',
  '伊斯坦布尔': 'TRY', '开罗': 'EGP', '纽约': 'USD', '洛杉矶': 'USD', '旧金山': 'USD',
  '拉斯维加斯': 'USD', '西雅图': 'USD', '芝加哥': 'USD', '夏威夷': 'USD',
  '温哥华': 'CAD', '多伦多': 'CAD', '蒙特利尔': 'CAD', '悉尼': 'AUD', '墨尔本': 'AUD',
  '黄金海岸': 'AUD', '珀斯': 'AUD', '奥克兰': 'NZD', '皇后镇': 'NZD', '基督城': 'NZD',
  '迪拜': 'AED', '阿布扎比': 'AED',
};

export interface ExchangeRate {
  rate: number;          // 1 CNY = rate 外币
  currency: string;      // 外币代码
  updatedAt: string;     // 更新时间
  live: boolean;         // 是否实时
  symbol: string;        // 货币符号
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  CNY: '¥', JPY: '¥', KRW: '₩', SGD: 'S$', THB: '฿', MYR: 'RM', VND: '₫',
  IDR: 'Rp', PHP: '₱', EUR: '€', GBP: '£', CHF: 'CHF', USD: '$', CAD: 'C$',
  AUD: 'A$', NZD: 'NZ$', AED: 'د.إ', TRY: '₺', EGP: 'E£', HKD: 'HK$', MOP: 'MOP$', TWD: 'NT$',
};

export function getCurrencyForCity(cityName: string): string {
  if (!cityName) return 'CNY';
  const name = cityName.trim();
  if (COUNTRY_CURRENCY[name]) return COUNTRY_CURRENCY[name];
  // 模糊匹配
  for (const [k, v] of Object.entries(COUNTRY_CURRENCY)) {
    if (name.includes(k) || k.includes(name)) return v;
  }
  return 'CNY';
}

export function getCurrencySymbol(code: string): string {
  return CURRENCY_SYMBOLS[code] || code;
}

async function fetchJson(url: string, timeoutMs = 6000): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// 获取汇率：1 CNY = ? 外币（双源互备）
export async function getExchangeRate(cityName: string): Promise<ExchangeRate | null> {
  const currency = getCurrencyForCity(cityName);
  if (currency === 'CNY') {
    return { rate: 1, currency: 'CNY', updatedAt: '', live: false, symbol: '¥' };
  }

  // 主源：Frankfurter
  try {
    const data = await fetchJson(`${EXCHANGE_PRIMARY}?base=CNY&symbols=${currency}`);
    if (data?.rates?.[currency]) {
      return {
        rate: data.rates[currency],
        currency,
        updatedAt: data.date || '',
        live: true,
        symbol: getCurrencySymbol(currency),
      };
    }
    throw new Error('rate missing');
  } catch {
    // 备用源：open.er-api.com
    try {
      const data = await fetchJson(`${EXCHANGE_BACKUP}/CNY`);
      if (data?.result === 'success' && data?.rates?.[currency]) {
        return {
          rate: data.rates[currency],
          currency,
          updatedAt: data.time_last_update_utc || '',
          live: true,
          symbol: getCurrencySymbol(currency),
        };
      }
      return null;
    } catch {
      return null;
    }
  }
}

// ========== 天气 ==========
const WEATHER_BASE = 'https://api.open-meteo.com/v1/forecast';

// WMO 天气代码 → 中文描述 + emoji
const WEATHER_CODES: Record<number, { desc: string; icon: string }> = {
  0: { desc: '晴朗', icon: '☀️' },
  1: { desc: '大部晴朗', icon: '🌤️' },
  2: { desc: '多云', icon: '⛅' },
  3: { desc: '阴天', icon: '☁️' },
  45: { desc: '雾', icon: '🌫️' },
  48: { desc: '雾凇', icon: '🌫️' },
  51: { desc: '毛毛雨', icon: '🌦️' },
  53: { desc: '毛毛雨', icon: '🌦️' },
  55: { desc: '毛毛雨', icon: '🌦️' },
  61: { desc: '小雨', icon: '🌧️' },
  63: { desc: '中雨', icon: '🌧️' },
  65: { desc: '大雨', icon: '🌧️' },
  71: { desc: '小雪', icon: '🌨️' },
  73: { desc: '中雪', icon: '🌨️' },
  75: { desc: '大雪', icon: '❄️' },
  80: { desc: '阵雨', icon: '🌦️' },
  81: { desc: '阵雨', icon: '🌧️' },
  82: { desc: '强阵雨', icon: '⛈️' },
  95: { desc: '雷阵雨', icon: '⛈️' },
};

export interface WeatherInfo {
  temp: number;
  feelsLike?: number;
  desc: string;
  icon: string;
  humidity?: number;
  windSpeed?: number;
  updatedAt: string;
  live: boolean;
}

// 获取实时天气（内置经纬度 → Open-Meteo）
export async function getWeather(cityName: string): Promise<WeatherInfo | null> {
  const coord = getCityCoord(cityName);
  if (!coord) return null;

  try {
    const url = `${WEATHER_BASE}?latitude=${coord.lat}&longitude=${coord.lng}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;
    const data = await fetchJson(url);
    const current = data?.current;
    if (!current) return null;

    const code = WEATHER_CODES[current.weather_code] || { desc: '未知', icon: '🌡️' };
    return {
      temp: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      desc: code.desc,
      icon: code.icon,
      windSpeed: current.wind_speed_10m,
      updatedAt: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      live: true,
    };
  } catch {
    return null;
  }
}
