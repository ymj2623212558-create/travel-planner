// 景点门票参考价库（方案 A）
// 数据来源：各景点官网/官方渠道公开票价，整理为人民币参考区间
// 用途：AI 生成行程时优先匹配此库（有官方依据），库外景点才用 AI 估算
// 更新时间：2026-08（价格可能变动，页面标注"以官方为准"）

export interface TicketPrice {
  name: string;        // 景点名称（中文，支持模糊匹配）
  aliases?: string[];  // 别名/英文名（用于匹配 AI 输出）
  price: [number, number];  // 价格区间 [最低, 最高] 人民币
  city?: string;       // 所在城市
  country?: string;    // 国家
  note?: string;       // 备注（如"旺季/淡季"、"含讲解"）
}

export const TICKET_PRICES: TicketPrice[] = [
  // ============ 🇨🇳 中国 ============
  { name: '故宫博物院', aliases: ['故宫', 'Forbidden City'], price: [60, 60], city: '北京', note: '旺季60/淡季40' },
  { name: '颐和园', aliases: ['Summer Palace'], price: [30, 60], city: '北京' },
  { name: '天坛公园', aliases: ['Temple of Heaven'], price: [15, 34], city: '北京' },
  { name: '八达岭长城', aliases: ['长城', 'Great Wall'], price: [40, 40], city: '北京' },
  { name: '北京环球影城', aliases: ['环球影城'], price: [418, 638], city: '北京', note: '工作日418/周末638' },
  { name: '国家博物馆', aliases: ['国博'], price: [0, 0], city: '北京', note: '免费需预约' },
  { name: '上海迪士尼乐园', aliases: ['迪士尼', 'Disneyland'], price: [399, 599], city: '上海', note: '平日399/高峰599' },
  { name: '东方明珠', aliases: ['Oriental Pearl'], price: [199, 220], city: '上海' },
  { name: '上海博物馆', price: [0, 0], city: '上海', note: '免费需预约' },
  { name: '广州长隆野生动物世界', aliases: ['长隆'], price: [250, 350], city: '广州' },
  { name: '广州塔', aliases: ['小蛮腰'], price: [150, 228], city: '广州' },
  { name: '深圳世界之窗', price: [220, 220], city: '深圳' },
  { name: '成都大熊猫繁育研究基地', aliases: ['熊猫基地', 'Panda Base'], price: [55, 55], city: '成都' },
  { name: '都江堰景区', price: [80, 80], city: '成都' },
  { name: '杭州西湖', aliases: ['西湖'], price: [0, 0], city: '杭州', note: '免费，部分景点收费' },
  { name: '杭州灵隐寺', price: [30, 75], city: '杭州', note: '飞来峰45+灵隐30' },
  { name: '西安秦始皇兵马俑', aliases: ['兵马俑', 'Terracotta Army'], price: [120, 120], city: '西安' },
  { name: '西安大雁塔', price: [40, 50], city: '西安' },
  { name: '重庆洪崖洞', price: [0, 0], city: '重庆', note: '免费' },
  { name: '张家界国家森林公园', aliases: ['张家界'], price: [227, 227], city: '张家界', note: '四日联票' },
  { name: '黄山风景区', aliases: ['黄山'], price: [150, 190], city: '黄山' },
  { name: '泰山风景区', aliases: ['泰山'], price: [115, 115], city: '泰安' },
  { name: '桂林漓江景区', aliases: ['漓江'], price: [80, 215], city: '桂林', note: '游船分档' },
  { name: '三亚亚龙湾热带天堂森林公园', price: [158, 158], city: '三亚' },
  { name: '武汉黄鹤楼', aliases: ['黄鹤楼'], price: [70, 70], city: '武汉' },
  { name: '南京中山陵', price: [0, 0], city: '南京', note: '免费需预约' },
  { name: '苏州拙政园', aliases: ['拙政园'], price: [70, 90], city: '苏州' },
  { name: '厦门鼓浪屿', aliases: ['鼓浪屿'], price: [35, 90], city: '厦门', note: '船票+景点联票' },
  { name: '丽江玉龙雪山', aliases: ['玉龙雪山'], price: [100, 140], city: '丽江', note: '进山费100+索道另计' },
  { name: '拉萨布达拉宫', aliases: ['布达拉宫', 'Potala'], price: [200, 200], city: '拉萨', note: '旺季需预约' },
  { name: '青海茶卡盐湖', aliases: ['茶卡盐湖'], price: [60, 60], city: '西宁' },
  { name: '乌鲁木齐天山天池', aliases: ['天池'], price: [95, 95], city: '乌鲁木齐' },
  { name: '哈尔滨冰雪大世界', price: [330, 330], city: '哈尔滨', note: '冬季' },
  { name: '青岛崂山', price: [90, 90], city: '青岛' },
  { name: '洛阳龙门石窟', aliases: ['龙门石窟'], price: [90, 90], city: '洛阳' },
  { name: '天津之眼', price: [70, 70], city: '天津' },
  { name: '长沙橘子洲', price: [0, 0], city: '长沙', note: '免费' },
  { name: '郑州嵩山少林寺', aliases: ['少林寺'], price: [80, 100], city: '郑州' },
  { name: '南昌滕王阁', aliases: ['滕王阁'], price: [50, 50], city: '南昌' },
  { name: '昆明石林', aliases: ['石林'], price: [130, 130], city: '昆明' },
  { name: '贵阳黄果树瀑布', aliases: ['黄果树'], price: [160, 160], city: '贵阳' },
  { name: '太原晋祠', price: [80, 80], city: '太原' },
  { name: '沈阳故宫', price: [60, 60], city: '沈阳' },
  { name: '大连老虎滩海洋公园', price: [220, 220], city: '大连' },
  { name: '哈尔滨圣索菲亚大教堂', price: [20, 20], city: '哈尔滨' },
  { name: '香港迪士尼乐园', aliases: ['香港迪士尼'], price: [639, 879], city: '香港' },
  { name: '香港海洋公园', price: [498, 498], city: '香港' },
  { name: '澳门大三巴牌坊', price: [0, 0], city: '澳门', note: '免费' },
  { name: '台北101', price: [180, 180], city: '台北' },

  // ============ 🇯🇵 日本 ============
  { name: '东京塔', aliases: ['Tokyo Tower'], price: [70, 120], city: '东京', country: '日本' },
  { name: '东京晴空塔', aliases: ['晴空塔', 'Tokyo Skytree'], price: [110, 160], city: '东京', country: '日本' },
  { name: '浅草寺', aliases: ['Senso-ji'], price: [0, 0], city: '东京', country: '日本', note: '免费' },
  { name: '明治神宫', aliases: ['Meiji Shrine'], price: [0, 0], city: '东京', country: '日本', note: '免费' },
  { name: '上野公园', aliases: ['Ueno Park'], price: [0, 0], city: '东京', country: '日本', note: '公园免费' },
  { name: '东京国立博物馆', price: [50, 50], city: '东京', country: '日本' },
  { name: 'teamLab Planets', price: [160, 200], city: '东京', country: '日本' },
  { name: '东京迪士尼乐园', aliases: ['Tokyo Disney'], price: [390, 450], city: '东京', country: '日本' },
  { name: '大阪环球影城', aliases: ['USJ', 'Universal'], price: [400, 500], city: '大阪', country: '日本' },
  { name: '大阪城天守阁', aliases: ['Osaka Castle'], price: [30, 30], city: '大阪', country: '日本' },
  { name: '京都清水寺', aliases: ['Kiyomizu-dera'], price: [20, 20], city: '京都', country: '日本' },
  { name: '京都伏见稻荷大社', aliases: ['稻荷'], price: [0, 0], city: '京都', country: '日本', note: '免费' },
  { name: '京都金阁寺', aliases: ['Kinkaku-ji'], price: [20, 20], city: '京都', country: '日本' },
  { name: '奈良东大寺', price: [30, 30], city: '奈良', country: '日本' },
  { name: '札幌白色恋人公园', price: [40, 40], city: '札幌', country: '日本' },

  // ============ 🇹🇭 泰国 ============
  { name: '大皇宫', aliases: ['Grand Palace'], price: [100, 100], city: '曼谷', country: '泰国' },
  { name: '郑王庙', aliases: ['Wat Arun'], price: [20, 20], city: '曼谷', country: '泰国' },
  { name: '卧佛寺', aliases: ['Wat Pho'], price: [40, 40], city: '曼谷', country: '泰国' },
  { name: '曼谷暹罗海洋世界', price: [200, 280], city: '曼谷', country: '泰国' },
  { name: '清迈双龙寺', aliases: ['素贴山'], price: [6, 6], city: '清迈', country: '泰国' },
  { name: '普吉岛大佛', price: [0, 0], city: '普吉', country: '泰国', note: '免费' },

  // ============ 🇰🇷 韩国 ============
  { name: '景福宫', aliases: ['Gyeongbokgung'], price: [15, 15], city: '首尔', country: '韩国' },
  { name: '首尔塔', aliases: ['N首尔塔', 'N Seoul Tower'], price: [55, 55], city: '首尔', country: '韩国' },
  { name: '乐天世界', aliases: ['Lotte World'], price: [200, 260], city: '首尔', country: '韩国' },
  { name: '釜山甘川文化村', price: [0, 0], city: '釜山', country: '韩国', note: '免费' },
  { name: '济州岛汉拿山', price: [0, 0], city: '济州', country: '韩国', note: '免费' },

  // ============ 🇸🇬 新加坡 ============
  { name: '滨海湾金沙空中花园', aliases: ['SkyPark'], price: [100, 140], city: '新加坡' },
  { name: '环球影城新加坡', aliases: ['USS'], price: [350, 400], city: '新加坡' },
  { name: '新加坡动物园', price: [180, 220], city: '新加坡' },
  { name: '鱼尾狮公园', price: [0, 0], city: '新加坡', note: '免费' },
  { name: '滨海湾花园', aliases: ['Gardens by the Bay'], price: [100, 120], city: '新加坡' },

  // ============ 🇲🇾 马来西亚 ============
  { name: '双子塔观景台', aliases: ['Petronas'], price: [140, 140], city: '吉隆坡', country: '马来西亚' },
  { name: '黑风洞', aliases: ['Batu Caves'], price: [0, 0], city: '吉隆坡', country: '马来西亚', note: '免费' },

  // ============ 🇻🇳 越南 ============
  { name: '胡志明市战争遗迹博物馆', price: [10, 10], city: '胡志明市', country: '越南' },
  { name: '河内还剑湖', price: [0, 0], city: '河内', country: '越南', note: '免费' },
  { name: '岘港巴拿山', aliases: ['Ba Na Hills'], price: [300, 350], city: '岘港', country: '越南' },

  // ============ 🇫🇷 法国 ============
  { name: '埃菲尔铁塔', aliases: ['Eiffel Tower'], price: [80, 180], city: '巴黎', country: '法国', note: '登顶各层票价不同' },
  { name: '卢浮宫', aliases: ['Louvre'], price: [130, 130], city: '巴黎', country: '法国' },
  { name: '凡尔赛宫', aliases: ['Versailles'], price: [140, 190], city: '巴黎', country: '法国', note: '含花园' },
  { name: '巴黎圣母院', aliases: ['Notre-Dame'], price: [0, 0], city: '巴黎', country: '法国', note: '免费' },
  { name: '奥赛博物馆', aliases: ['Musee d Orsay'], price: [110, 110], city: '巴黎', country: '法国' },
  { name: '凯旋门', aliases: ['Arc de Triomphe'], price: [90, 90], city: '巴黎', country: '法国' },
  { name: '尼斯天使湾', price: [0, 0], city: '尼斯', country: '法国', note: '免费' },

  // ============ 🇮🇹 意大利 ============
  { name: '罗马斗兽场', aliases: ['Colosseum'], price: [120, 120], city: '罗马', country: '意大利' },
  { name: '梵蒂冈博物馆', aliases: ['Vatican'], price: [130, 130], city: '罗马', country: '意大利' },
  { name: '圣彼得大教堂', aliases: ['St Peter'], price: [0, 0], city: '罗马', country: '意大利', note: '登顶另收' },
  { name: '米兰大教堂', aliases: ['Duomo'], price: [50, 100], city: '米兰', country: '意大利' },
  { name: '威尼斯圣马可大教堂', price: [0, 0], city: '威尼斯', country: '意大利', note: '入内免费' },
  { name: '佛罗伦萨乌菲兹美术馆', aliases: ['Uffizi'], price: [130, 130], city: '佛罗伦萨', country: '意大利' },

  // ============ 🇬🇧 英国 ============
  { name: '大英博物馆', aliases: ['British Museum'], price: [0, 0], city: '伦敦', country: '英国', note: '免费' },
  { name: '伦敦塔', aliases: ['Tower of London'], price: [200, 200], city: '伦敦', country: '英国' },
  { name: '伦敦眼', aliases: ['London Eye'], price: [250, 280], city: '伦敦', country: '英国' },
  { name: '伦敦塔桥', aliases: ['Tower Bridge'], price: [80, 80], city: '伦敦', country: '英国', note: '登塔展览' },
  { name: '白金汉宫', aliases: ['Buckingham'], price: [200, 300], city: '伦敦', country: '英国', note: '夏季开放' },
  { name: '爱丁堡城堡', aliases: ['Edinburgh Castle'], price: [150, 150], city: '爱丁堡', country: '英国' },

  // ============ 🇩🇪 德国 ============
  { name: '柏林墙遗址', aliases: ['Berlin Wall'], price: [0, 0], city: '柏林', country: '德国', note: '免费' },
  { name: '勃兰登堡门', aliases: ['Brandenburg'], price: [0, 0], city: '柏林', country: '德国', note: '免费' },
  { name: '慕尼黑新天鹅堡', aliases: ['Neuschwanstein'], price: [100, 160], city: '慕尼黑', country: '德国' },
  { name: '法兰克福大教堂', price: [0, 0], city: '法兰克福', country: '德国', note: '免费' },

  // ============ 🇪🇸 西班牙 ============
  { name: '圣家堂', aliases: ['Sagrada Familia'], price: [180, 280], city: '巴塞罗那', country: '西班牙' },
  { name: '巴特罗之家', aliases: ['Casa Batllo'], price: [220, 250], city: '巴塞罗那', country: '西班牙' },
  { name: '马德里王宫', aliases: ['Royal Palace'], price: [90, 90], city: '马德里', country: '西班牙' },
  { name: '塞维利亚大教堂', price: [70, 70], city: '塞维利亚', country: '西班牙' },

  // ============ 🇵🇹 葡萄牙 ============
  { name: '贝伦塔', aliases: ['Belem Tower'], price: [45, 45], city: '里斯本', country: '葡萄牙' },
  { name: '热罗尼莫斯修道院', price: [70, 70], city: '里斯本', country: '葡萄牙' },

  // ============ 🇬🇷 希腊 ============
  { name: '雅典卫城', aliases: ['Acropolis'], price: [150, 150], city: '雅典', country: '希腊' },
  { name: '圣托里尼蓝顶教堂', price: [0, 0], city: '圣托里尼', country: '希腊', note: '免费' },

  // ============ 🇨🇭 瑞士 ============
  { name: '少女峰', aliases: ['Jungfrau'], price: [1000, 1400], city: '因特拉肯', country: '瑞士', note: '登山火车往返' },
  { name: '苏黎世大教堂', price: [0, 0], city: '苏黎世', country: '瑞士', note: '免费' },

  // ============ 🇳🇱 荷兰 ============
  { name: '梵高博物馆', aliases: ['Van Gogh'], price: [140, 140], city: '阿姆斯特丹', country: '荷兰' },
  { name: '安妮之家', aliases: ['Anne Frank'], price: [110, 110], city: '阿姆斯特丹', country: '荷兰' },

  // ============ 🇺🇸 美国 ============
  { name: '自由女神像', aliases: ['Statue of Liberty'], price: [120, 180], city: '纽约', country: '美国' },
  { name: '大都会艺术博物馆', aliases: ['Metropolitan', 'The Met'], price: [180, 180], city: '纽约', country: '美国' },
  { name: '帝国大厦', aliases: ['Empire State'], price: [250, 350], city: '纽约', country: '美国' },
  { name: '时代广场', aliases: ['Times Square'], price: [0, 0], city: '纽约', country: '美国', note: '免费' },
  { name: '洛杉矶环球影城', aliases: ['Universal Hollywood'], price: [600, 750], city: '洛杉矶', country: '美国' },
  { name: '旧金山金门大桥', aliases: ['Golden Gate'], price: [0, 0], city: '旧金山', country: '美国', note: '免费' },
  { name: '拉斯维加斯大道', aliases: ['The Strip'], price: [0, 0], city: '拉斯维加斯', country: '美国', note: '免费' },
  { name: '黄石国家公园', aliases: ['Yellowstone'], price: [200, 200], city: '黄石', country: '美国', note: '车辆7日票' },

  // ============ 🇨🇦 加拿大 ============
  { name: 'CN塔', aliases: ['CN Tower'], price: [230, 280], city: '多伦多', country: '加拿大' },
  { name: '温哥华斯坦利公园', aliases: ['Stanley Park'], price: [0, 0], city: '温哥华', country: '加拿大', note: '免费' },

  // ============ 🇦🇺 澳大利亚 ============
  { name: '悉尼歌剧院', aliases: ['Opera House'], price: [200, 300], city: '悉尼', country: '澳大利亚', note: '参观/演出不同' },
  { name: '悉尼大桥攀登', aliases: ['Harbour Bridge'], price: [1300, 1600], city: '悉尼', country: '澳大利亚' },
  { name: '黄金海岸主题公园', price: [400, 500], city: '黄金海岸', country: '澳大利亚' },

  // ============ 🇳🇿 新西兰 ============
  { name: '皇后镇天空缆车', aliases: ['Skyline'], price: [300, 350], city: '皇后镇', country: '新西兰' },
  { name: '霍比特村', aliases: ['Hobbiton'], price: [550, 600], city: '奥克兰', country: '新西兰' },

  // ============ 🇦🇪 阿联酋 ============
  { name: '哈利法塔', aliases: ['Burj Khalifa'], price: [300, 500], city: '迪拜', country: '阿联酋', note: '不同楼层票价' },
  { name: '迪拜沙漠冲沙', aliases: ['Desert Safari'], price: [250, 400], city: '迪拜', country: '阿联酋' },

  // ============ 🇹🇷 土耳其 ============
  { name: '圣索菲亚大教堂', aliases: ['Hagia Sophia'], price: [180, 180], city: '伊斯坦布尔', country: '土耳其' },
  { name: '托普卡帕宫', aliases: ['Topkapi'], price: [250, 250], city: '伊斯坦布尔', country: '土耳其' },
  { name: '卡帕多奇亚热气球', aliases: ['Balloon'], price: [1000, 1500], city: '卡帕多西亚', country: '土耳其' },
];

// 匹配函数：根据景点名称匹配门票价格（支持别名）
export function findTicketPrice(attractionName: string): TicketPrice | null {
  if (!attractionName) return null;
  const name = attractionName.trim();
  
  // 精确匹配（中文名或别名）
  for (const t of TICKET_PRICES) {
    if (t.name === name) return t;
    if (t.aliases?.some(a => a === name)) return t;
  }
  
  // 模糊匹配：包含关系（如"故宫博物院"匹配"故宫"）
  for (const t of TICKET_PRICES) {
    if (t.name.length >= 2 && (name.includes(t.name) || t.name.includes(name))) return t;
    if (t.aliases?.some(a => a.length >= 2 && (name.includes(a) || a.includes(name)))) return t;
  }
  
  return null;
}
