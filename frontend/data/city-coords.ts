// 内置城市经纬度表 - 用于 Open-Meteo 天气查询
// 覆盖全球热门城市 + 中国主要城市（中文名可直接匹配）
// 未收录的城市将回退到 Open-Meteo 地理编码 API 查询

export interface CityCoord {
  name: string;      // 中文名
  en: string;        // 英文名（用于 geocoding 兜底）
  lat: number;
  lng: number;
  country?: string;  // 所属国家/地区
}

export const CITY_COORDS: CityCoord[] = [
  // ===== 东亚 =====
  { name: '东京', en: 'Tokyo', lat: 35.68, lng: 139.69, country: '日本' },
  { name: '大阪', en: 'Osaka', lat: 34.69, lng: 135.50, country: '日本' },
  { name: '京都', en: 'Kyoto', lat: 35.01, lng: 135.77, country: '日本' },
  { name: '奈良', en: 'Nara', lat: 34.69, lng: 135.80, country: '日本' },
  { name: '札幌', en: 'Sapporo', lat: 43.06, lng: 141.35, country: '日本' },
  { name: '冲绳', en: 'Naha', lat: 26.21, lng: 127.68, country: '日本' },
  { name: '福冈', en: 'Fukuoka', lat: 33.59, lng: 130.40, country: '日本' },
  { name: '首尔', en: 'Seoul', lat: 37.57, lng: 126.98, country: '韩国' },
  { name: '釜山', en: 'Busan', lat: 35.18, lng: 129.08, country: '韩国' },
  { name: '济州岛', en: 'Jeju', lat: 33.50, lng: 126.53, country: '韩国' },
  { name: '北京', en: 'Beijing', lat: 39.90, lng: 116.41, country: '中国' },
  { name: '上海', en: 'Shanghai', lat: 31.23, lng: 121.47, country: '中国' },
  { name: '广州', en: 'Guangzhou', lat: 23.13, lng: 113.26, country: '中国' },
  { name: '深圳', en: 'Shenzhen', lat: 22.54, lng: 114.06, country: '中国' },
  { name: '成都', en: 'Chengdu', lat: 30.57, lng: 104.07, country: '中国' },
  { name: '重庆', en: 'Chongqing', lat: 29.56, lng: 106.55, country: '中国' },
  { name: '杭州', en: 'Hangzhou', lat: 30.27, lng: 120.16, country: '中国' },
  { name: '南京', en: 'Nanjing', lat: 32.06, lng: 118.80, country: '中国' },
  { name: '武汉', en: 'Wuhan', lat: 30.59, lng: 114.31, country: '中国' },
  { name: '西安', en: 'Xian', lat: 34.34, lng: 108.94, country: '中国' },
  { name: '长沙', en: 'Changsha', lat: 28.23, lng: 112.94, country: '中国' },
  { name: '昆明', en: 'Kunming', lat: 25.04, lng: 102.72, country: '中国' },
  { name: '大理', en: 'Dali', lat: 25.61, lng: 100.27, country: '中国' },
  { name: '丽江', en: 'Lijiang', lat: 26.87, lng: 100.23, country: '中国' },
  { name: '桂林', en: 'Guilin', lat: 25.27, lng: 110.29, country: '中国' },
  { name: '三亚', en: 'Sanya', lat: 18.25, lng: 109.51, country: '中国' },
  { name: '海口', en: 'Haikou', lat: 20.04, lng: 110.32, country: '中国' },
  { name: '哈尔滨', en: 'Harbin', lat: 45.80, lng: 126.53, country: '中国' },
  { name: '青岛', en: 'Qingdao', lat: 36.07, lng: 120.38, country: '中国' },
  { name: '厦门', en: 'Xiamen', lat: 24.48, lng: 118.09, country: '中国' },
  { name: '苏州', en: 'Suzhou', lat: 31.30, lng: 120.62, country: '中国' },
  { name: '天津', en: 'Tianjin', lat: 39.34, lng: 117.36, country: '中国' },
  { name: '沈阳', en: 'Shenyang', lat: 41.81, lng: 123.43, country: '中国' },
  { name: '大连', en: 'Dalian', lat: 38.91, lng: 121.61, country: '中国' },
  { name: '郑州', en: 'Zhengzhou', lat: 34.75, lng: 113.63, country: '中国' },
  { name: '洛阳', en: 'Luoyang', lat: 34.62, lng: 112.45, country: '中国' },
  { name: '济南', en: 'Jinan', lat: 36.65, lng: 117.12, country: '中国' },
  { name: '兰州', en: 'Lanzhou', lat: 36.06, lng: 103.83, country: '中国' },
  { name: '西宁', en: 'Xining', lat: 36.62, lng: 101.78, country: '中国' },
  { name: '银川', en: 'Yinchuan', lat: 38.49, lng: 106.23, country: '中国' },
  { name: '乌鲁木齐', en: 'Urumqi', lat: 43.83, lng: 87.62, country: '中国' },
  { name: '拉萨', en: 'Lhasa', lat: 29.65, lng: 91.14, country: '中国' },
  { name: '呼和浩特', en: 'Hohhot', lat: 40.84, lng: 111.75, country: '中国' },
  { name: '石家庄', en: 'Shijiazhuang', lat: 38.04, lng: 114.51, country: '中国' },
  { name: '太原', en: 'Taiyuan', lat: 37.87, lng: 112.55, country: '中国' },
  { name: '南昌', en: 'Nanchang', lat: 28.68, lng: 115.86, country: '中国' },
  { name: '合肥', en: 'Hefei', lat: 31.82, lng: 117.23, country: '中国' },
  { name: '福州', en: 'Fuzhou', lat: 26.07, lng: 119.30, country: '中国' },
  { name: '南宁', en: 'Nanning', lat: 22.82, lng: 108.32, country: '中国' },
  { name: '贵阳', en: 'Guiyang', lat: 26.65, lng: 106.63, country: '中国' },
  { name: '长春', en: 'Changchun', lat: 43.82, lng: 125.32, country: '中国' },
  { name: '敦煌', en: 'Dunhuang', lat: 40.14, lng: 94.66, country: '中国' },
  { name: '香港', en: 'Hong Kong', lat: 22.32, lng: 114.17, country: '中国' },
  { name: '澳门', en: 'Macau', lat: 22.20, lng: 113.54, country: '中国' },
  { name: '台北', en: 'Taipei', lat: 25.03, lng: 121.57, country: '中国' },

  // ===== 东南亚 =====
  { name: '曼谷', en: 'Bangkok', lat: 13.76, lng: 100.50, country: '泰国' },
  { name: '清迈', en: 'Chiang Mai', lat: 18.79, lng: 98.98, country: '泰国' },
  { name: '普吉岛', en: 'Phuket', lat: 7.88, lng: 98.40, country: '泰国' },
  { name: '芭堤雅', en: 'Pattaya', lat: 12.92, lng: 100.88, country: '泰国' },
  { name: '新加坡', en: 'Singapore', lat: 1.35, lng: 103.82, country: '新加坡' },
  { name: '吉隆坡', en: 'Kuala Lumpur', lat: 3.14, lng: 101.69, country: '马来西亚' },
  { name: '槟城', en: 'George Town', lat: 5.41, lng: 100.34, country: '马来西亚' },
  { name: '马六甲', en: 'Malacca', lat: 2.19, lng: 102.25, country: '马来西亚' },
  { name: '胡志明市', en: 'Ho Chi Minh City', lat: 10.82, lng: 106.63, country: '越南' },
  { name: '河内', en: 'Hanoi', lat: 21.03, lng: 105.85, country: '越南' },
  { name: '岘港', en: 'Da Nang', lat: 16.05, lng: 108.22, country: '越南' },
  { name: '芽庄', en: 'Nha Trang', lat: 12.24, lng: 109.19, country: '越南' },
  { name: '巴厘岛', en: 'Denpasar', lat: -8.65, lng: 115.22, country: '印度尼西亚' },
  { name: '雅加达', en: 'Jakarta', lat: -6.21, lng: 106.85, country: '印度尼西亚' },
  { name: '马尼拉', en: 'Manila', lat: 14.60, lng: 120.98, country: '菲律宾' },
  { name: '宿务', en: 'Cebu', lat: 10.32, lng: 123.89, country: '菲律宾' },
  { name: '长滩岛', en: 'Boracay', lat: 11.97, lng: 121.92, country: '菲律宾' },

  // ===== 欧洲 =====
  { name: '巴黎', en: 'Paris', lat: 48.86, lng: 2.35, country: '法国' },
  { name: '尼斯', en: 'Nice', lat: 43.70, lng: 7.27, country: '法国' },
  { name: '马赛', en: 'Marseille', lat: 43.30, lng: 5.37, country: '法国' },
  { name: '罗马', en: 'Rome', lat: 41.90, lng: 12.50, country: '意大利' },
  { name: '米兰', en: 'Milan', lat: 45.46, lng: 9.19, country: '意大利' },
  { name: '威尼斯', en: 'Venice', lat: 45.44, lng: 12.32, country: '意大利' },
  { name: '佛罗伦萨', en: 'Florence', lat: 43.77, lng: 11.26, country: '意大利' },
  { name: '伦敦', en: 'London', lat: 51.51, lng: -0.13, country: '英国' },
  { name: '爱丁堡', en: 'Edinburgh', lat: 55.95, lng: -3.19, country: '英国' },
  { name: '曼彻斯特', en: 'Manchester', lat: 53.48, lng: -2.24, country: '英国' },
  { name: '柏林', en: 'Berlin', lat: 52.52, lng: 13.41, country: '德国' },
  { name: '慕尼黑', en: 'Munich', lat: 48.14, lng: 11.58, country: '德国' },
  { name: '法兰克福', en: 'Frankfurt', lat: 50.11, lng: 8.68, country: '德国' },
  { name: '巴塞罗那', en: 'Barcelona', lat: 41.39, lng: 2.17, country: '西班牙' },
  { name: '马德里', en: 'Madrid', lat: 40.42, lng: -3.70, country: '西班牙' },
  { name: '塞维利亚', en: 'Seville', lat: 37.39, lng: -5.98, country: '西班牙' },
  { name: '里斯本', en: 'Lisbon', lat: 38.72, lng: -9.14, country: '葡萄牙' },
  { name: '波尔图', en: 'Porto', lat: 41.15, lng: -8.61, country: '葡萄牙' },
  { name: '雅典', en: 'Athens', lat: 37.98, lng: 23.73, country: '希腊' },
  { name: '圣托里尼', en: 'Santorini', lat: 36.39, lng: 25.46, country: '希腊' },
  { name: '苏黎世', en: 'Zurich', lat: 47.38, lng: 8.54, country: '瑞士' },
  { name: '日内瓦', en: 'Geneva', lat: 46.20, lng: 6.14, country: '瑞士' },
  { name: '因特拉肯', en: 'Interlaken', lat: 46.69, lng: 7.85, country: '瑞士' },
  { name: '阿姆斯特丹', en: 'Amsterdam', lat: 52.37, lng: 4.90, country: '荷兰' },
  { name: '鹿特丹', en: 'Rotterdam', lat: 51.92, lng: 4.48, country: '荷兰' },
  { name: '伊斯坦布尔', en: 'Istanbul', lat: 41.01, lng: 28.98, country: '土耳其' },
  { name: '开罗', en: 'Cairo', lat: 30.04, lng: 31.24, country: '埃及' },

  // ===== 美洲 =====
  { name: '纽约', en: 'New York', lat: 40.71, lng: -74.01, country: '美国' },
  { name: '洛杉矶', en: 'Los Angeles', lat: 34.05, lng: -118.24, country: '美国' },
  { name: '旧金山', en: 'San Francisco', lat: 37.77, lng: -122.42, country: '美国' },
  { name: '拉斯维加斯', en: 'Las Vegas', lat: 36.17, lng: -115.14, country: '美国' },
  { name: '西雅图', en: 'Seattle', lat: 47.61, lng: -122.33, country: '美国' },
  { name: '芝加哥', en: 'Chicago', lat: 41.88, lng: -87.63, country: '美国' },
  { name: '夏威夷', en: 'Honolulu', lat: 21.31, lng: -157.86, country: '美国' },
  { name: '温哥华', en: 'Vancouver', lat: 49.28, lng: -123.12, country: '加拿大' },
  { name: '多伦多', en: 'Toronto', lat: 43.65, lng: -79.38, country: '加拿大' },
  { name: '蒙特利尔', en: 'Montreal', lat: 45.50, lng: -73.57, country: '加拿大' },

  // ===== 大洋洲 =====
  { name: '悉尼', en: 'Sydney', lat: -33.87, lng: 151.21, country: '澳大利亚' },
  { name: '墨尔本', en: 'Melbourne', lat: -37.81, lng: 144.96, country: '澳大利亚' },
  { name: '黄金海岸', en: 'Gold Coast', lat: -28.02, lng: 153.40, country: '澳大利亚' },
  { name: '珀斯', en: 'Perth', lat: -31.95, lng: 115.86, country: '澳大利亚' },
  { name: '奥克兰', en: 'Auckland', lat: -36.85, lng: 174.76, country: '新西兰' },
  { name: '皇后镇', en: 'Queenstown', lat: -45.03, lng: 168.66, country: '新西兰' },
  { name: '基督城', en: 'Christchurch', lat: -43.53, lng: 172.64, country: '新西兰' },

  // ===== 中东 =====
  { name: '迪拜', en: 'Dubai', lat: 25.20, lng: 55.27, country: '阿联酋' },
  { name: '阿布扎比', en: 'Abu Dhabi', lat: 24.45, lng: 54.38, country: '阿联酋' },
];

// 根据中文城市名查找经纬度
export function getCityCoord(cityName: string): CityCoord | null {
  if (!cityName) return null;
  const name = cityName.trim();
  // 精确匹配
  const exact = CITY_COORDS.find(c => c.name === name);
  if (exact) return exact;
  // 包含匹配（如 "东京, 日本" 提取后 "东京"）
  const contains = CITY_COORDS.find(c => name.includes(c.name) || c.name.includes(name));
  return contains || null;
}
