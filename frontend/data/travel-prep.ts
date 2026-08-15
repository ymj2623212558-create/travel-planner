// 出行准备数据 - 全球热门国家 + 中国各省
// 数据完全内置前端，不依赖后端，GitHub 部署可用
import { HOT_COUNTRIES, CHINA_REGIONS } from '@/data/regions';

export interface TravelPrep {
  documents: string;   // 证件
  visa: string;        // 签证/预约
  currency: string;    // 货币
  plug: string;        // 插头/电压
  comm: string;        // 通讯
  health: string;      // 健康
  weather: string;     // 天气
  tips: string[];      // 贴士
}

export const COUNTRY_PREP: Record<string, TravelPrep> = {
  '日本': {
    documents: '护照（有效期 6 个月以上）',
    visa: '中国护照需办理签证；单次旅游签一般 15 天',
    currency: '日元（JPY）；现金 + 信用卡，小商户多用现金',
    plug: 'A/B 型两脚扁插，电压 100V',
    comm: '机场可租 WiFi 蛋或买 eSIM；东京大阪信号极好',
    health: '无需疫苗；便利店可买常用药',
    weather: '春樱秋枫最美，夏季炎热多雨，冬季干燥',
    tips: ['地铁西瓜卡 Suica 通用', '公共场所安静不喧哗', '垃圾分类严格，随身带小垃圾袋'],
  },
  '泰国': {
    documents: '护照（有效期 6 个月以上）',
    visa: '中国护照免签！停留 60 天',
    currency: '泰铢（THB）；现金为主，7-11 可支付宝/微信',
    plug: 'A/C 型两脚扁插，电压 220V',
    comm: '机场买 AIS/TrueMove 卡，30-60 元可用一周',
    health: '建议防蚊；肠胃药必带（路边摊谨慎）',
    weather: '11-2 月凉爽最佳；4-5 月最热，6-10 月雨季',
    tips: ['进寺庙要脱鞋、遮肩盖腿', '打车用 Bolt/Grab 避免被宰', '小费非强制，按摩可给 50-100 铢'],
  },
  '韩国': {
    documents: '护照（有效期 6 个月以上）',
    visa: '中国护照需办理签证；济州岛免签',
    currency: '韩元（KRW）；Visa/Master 普及，现金少量即可',
    plug: 'C/F 型两脚圆插，电压 220V',
    comm: '机场买 KT/SK 电话卡或 eSIM',
    health: '无需疫苗；药店很多',
    weather: '春秋最佳；冬冷（首尔 -5°C），夏热多雨',
    tips: ['T-money 交通卡通用', '餐厅不提供免费纸巾', '夜间打车用 Kakao T'],
  },
  '新加坡': {
    documents: '护照（有效期 6 个月以上）',
    visa: '中国护照免签！停留 30 天',
    currency: '新加坡元（SGD）；刷卡极普及，现金少量',
    plug: 'G 型三脚扁插（英标），电压 230V',
    comm: '机场买 Singtel 卡或 eSIM；地铁覆盖全岛',
    health: '无需疫苗；医疗发达但贵，建议买旅行险',
    weather: '全年热带，26-32°C；11-1 月多雨',
    tips: ['地铁公交用 SimplyGo 卡', '公共场合禁止吸烟吃口香糖', '室内冷气足，带薄外套'],
  },
  '马来西亚': {
    documents: '护照（有效期 6 个月以上）',
    visa: '中国护照免签！停留 30 天',
    currency: '林吉特（MYR）；现金为主，商场可刷卡',
    plug: 'G 型三脚扁插（英标），电压 230V',
    comm: '机场买 Celcom/Digi 卡',
    health: '建议防蚊（东马丛林区）；水土不服药备好',
    weather: '全年热带 25-32°C；5-10 月西岸雨季',
    tips: ['清真寺参观需穿着得体', '榴莲旺季 6-8 月', 'Grab 打车最方便'],
  },
  '越南': {
    documents: '护照（有效期 6 个月以上）',
    visa: '中国护照需电子签（E-visa）90 天多次',
    currency: '越南盾（VND）；面额大易混，数清零',
    plug: 'A/C 型两脚扁插，电压 220V',
    comm: '机场买 Viettel/Mobifone 卡',
    health: '建议防蚊（疟疾区少）；肠胃药必带',
    weather: '北越春秋最佳；南越 11-2 月旱季最舒服',
    tips: ['打车用 Grab 不坐黑车', '小费非强制', '过马路看车流，摩托超多'],
  },
  '印度尼西亚': {
    documents: '护照（有效期 6 个月以上）',
    visa: '中国护照免签！停留 30 天（仅部分口岸）',
    currency: '印尼盾（IDR）；现金为主，巴厘岛可刷卡',
    plug: 'C/F 型两脚圆插，电压 220V',
    comm: '机场买 Telkomsel 卡',
    health: '建议防蚊（登革热区）；饮食注意卫生',
    weather: '巴厘岛 4-10 月旱季最佳；雨季 11-3 月',
    tips: ['寺庙参观系腰带（Sarong）', '巴厘岛打车用 Gojek', '小费给 1-2 万盾即可'],
  },
  '菲律宾': {
    documents: '护照（有效期 6 个月以上）',
    visa: '中国护照需办理签证',
    currency: '比索（PHP）；现金为主',
    plug: 'A/B 型两脚扁插，电压 220V',
    comm: '机场买 Globe/Smart 卡',
    health: '建议防蚊；长滩岛医疗不便，备齐药品',
    weather: '11-5 月旱季最佳；台风季 6-10 月',
    tips: ['长滩岛要坐船+突突车', '小费给 20-50 比索', '潜水选正规潜店'],
  },
  '法国': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需申根签证（提前 1-2 月办理）',
    currency: '欧元（EUR）；刷卡普及，现金少量',
    plug: 'C/E 型两脚圆插，电压 230V',
    comm: '机场买 Orange/Free 卡；地铁站有 WiFi',
    health: '无需疫苗；药房绿十字标志',
    weather: '4-6 月、9-10 月最佳；夏季巴黎较热',
    tips: ['博物馆周一/周二多闭馆，提前查', '巴黎地铁小偷多，背包前背', '餐厅小费含在账单内'],
  },
  '意大利': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需申根签证（提前 1-2 月办理）',
    currency: '欧元（EUR）；刷卡普及',
    plug: 'C/F/L 型两脚圆插，电压 230V',
    comm: '机场买 TIM/Vodafone 卡',
    health: '无需疫苗',
    weather: '4-6 月、9-10 月最佳；夏季南部酷热',
    tips: ['斗兽场/梵蒂冈提前官网订票', '火车站附近小偷多', '进教堂需遮肩盖腿'],
  },
  '英国': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需英国签证（提前 1-2 月办理）',
    currency: '英镑（GBP）；刷卡极普及，可无现金出行',
    plug: 'G 型三脚扁插（英标），电压 230V',
    comm: '机场买 EE/O2 卡；地铁有免费 WiFi',
    health: '无需疫苗',
    weather: '5-9 月最佳；天气多变常下雨，带伞',
    tips: ['Oyster 卡坐地铁更便宜', '博物馆大多免费', '餐厅一般收 10% 服务费'],
  },
  '德国': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需申根签证',
    currency: '欧元（EUR）；刷卡普及，小商铺要现金',
    plug: 'C/F 型两脚圆插，电压 230V',
    comm: '机场买 Telekom/Vodafone 卡',
    health: '无需疫苗',
    weather: '5-9 月最佳；冬季圣诞市场很美但冷',
    tips: ['地铁公交无闸机，自觉买票（查票重罚）', '周日商店全关门', '自来水可直饮'],
  },
  '西班牙': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需申根签证',
    currency: '欧元（EUR）；刷卡普及',
    plug: 'C/F 型两脚圆插，电压 230V',
    comm: '机场买 Vodafone/Orange 卡',
    health: '无需疫苗',
    weather: '春秋最佳；夏季南部 40°C 酷热',
    tips: ['午餐 14:00 晚餐 21:00 才开始', '小偷多，景点背包注意', '弗拉明戈表演值得一看'],
  },
  '葡萄牙': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需申根签证',
    currency: '欧元（EUR）',
    plug: 'C/F 型两脚圆插，电压 230V',
    comm: '机场买 NOS/MEO 卡',
    health: '无需疫苗',
    weather: '5-10 月最佳，阳光充足',
    tips: ['里斯本电车 28 路经典', '蛋挞去贝伦区总店', '坡度大穿舒适鞋'],
  },
  '希腊': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需申根签证',
    currency: '欧元（EUR）；岛上现金为主',
    plug: 'C/F 型两脚圆插，电压 230V',
    comm: '雅典机场买 Cosmote 卡',
    health: '无需疫苗',
    weather: '5-10 月最佳；7-8 月圣托里尼最旺',
    tips: ['圣托里尼看日落提前占位', '岛间坐船慢，飞机会快', '古迹区域防晒必备'],
  },
  '瑞士': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需申根签证',
    currency: '瑞士法郎（CHF）；刷卡极普及',
    plug: 'C/J 型三脚圆插，电压 230V',
    comm: '机场买 Swisscom 卡；火车上有 WiFi',
    health: '无需疫苗；医疗极贵，必买保险',
    weather: '6-9 月徒步最佳；冬季滑雪季 12-3 月',
    tips: ['Swiss Travel Pass 火车通票超值', '物价高，超市买水最便宜', '少女峰/马特洪峰提前看天气'],
  },
  '荷兰': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需申根签证',
    currency: '欧元（EUR）；刷卡普及',
    plug: 'C/F 型两脚圆插，电压 230V',
    comm: '机场买 KPN/Vodafone 卡',
    health: '无需疫苗',
    weather: '4-5 月郁金香季最佳',
    tips: ['郁金香公园 Keukenhof 3-5 月开放', '自行车王国，租车游城市', '红灯区禁止拍照'],
  },
  '美国': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需 B1/B2 旅游签证（面试办理，提前 1-3 月）',
    currency: '美元（USD）；刷卡极普及，小店也要卡',
    plug: 'A/B 型两脚扁插，电压 120V',
    comm: '机场买 T-Mobile/AT&T 卡；公共 WiFi 少',
    health: '无强制疫苗；医疗极贵，必买旅行保险',
    weather: '纽约春秋最佳；加州全年宜人；夏季拉斯维加斯 40°C',
    tips: ['小费文化：餐厅 15-20%', '租车需满 21 岁 + 国际驾照', '国家公园提前预约'],
  },
  '加拿大': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需加拿大签证（E-TA 不适用中国护照，需正式签证）',
    currency: '加元（CAD）；刷卡普及',
    plug: 'A/B 型两脚扁插，电压 120V',
    comm: '机场买 Rogers/Bell 卡',
    health: '无需疫苗',
    weather: '夏季 6-9 月最佳；班夫冬季滑雪',
    tips: ['班夫国家公园门票按车算', '小费 15-18%', '极光最佳 9 月-3 月'],
  },
  '澳大利亚': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需电子签（ETA/600 旅游签，在线办理）',
    currency: '澳元（AUD）；刷卡普及',
    plug: 'I 型三脚扁插（品字），电压 230V',
    comm: '机场买 Telstra/Optus 卡',
    health: '无需疫苗；防晒霜必带（紫外线极强）',
    weather: '10-4 月最佳；悉尼 12-2 月最热',
    tips: ['大堡礁/十二门徒报团省心', '驾车靠左行驶', '动物园区可抱考拉'],
  },
  '新西兰': {
    documents: '护照（有效期 6 个月以上）',
    visa: '需电子签（NZeTA/旅游签）',
    currency: '新西兰元（NZD）；刷卡普及',
    plug: 'I 型三脚扁插（品字），电压 230V',
    comm: '机场买 Spark/Vodafone 卡',
    health: '无需疫苗；户外活动买保险',
    weather: '11-4 月最佳；南岛冬季 6-8 月',
    tips: ['皇后镇极限运动胜地', '自驾租车+导航必备', '霍比特村提前订票'],
  },
  '阿联酋': {
    documents: '护照（有效期 6 个月以上）',
    visa: '中国护照免签！停留 30 天',
    currency: '迪拉姆（AED）；刷卡普及',
    plug: 'G 型三脚扁插（英标），电压 230V',
    comm: '机场买 du/Etisalat 卡',
    health: '无需疫苗；室内外温差大',
    weather: '11-3 月最佳；夏季 45°C+ 不宜出行',
    tips: ['哈利法塔日落场提前买票', '公共场所穿着得体', '斋月期间白天禁食'],
  },
  '土耳其': {
    documents: '护照（有效期 6 个月以上）',
    visa: '中国护照需电子签（E-visa，60 天单次）',
    currency: '里拉（TRY）；现金为主，热门地可刷卡',
    plug: 'C/F 型两脚圆插，电压 220V',
    comm: '机场买 Turkcell/Vodafone 卡',
    health: '无需疫苗；肠胃药备好',
    weather: '4-6 月、9-10 月最佳；卡帕多奇亚热气球 4-11 月',
    tips: ['热气球提前订并看天气', '大巴扎砍价对半砍', '进清真寺脱鞋'],
  },
  '埃及': {
    documents: '护照（有效期 6 个月以上）',
    visa: '落地签 25 美元（需酒店预订单）',
    currency: '埃镑（EGP）；现金为主',
    plug: 'C/F 型两脚圆插，电压 220V',
    comm: '机场买 Orange/Vodafone 卡',
    health: '建议疫苗（黄热病区入境需证书）；肠胃药必带',
    weather: '10-4 月最佳；夏季 40°C+',
    tips: ['金字塔门票提前买', '骑骆驼谈好价格再上', '小费普遍，准备零钱'],
  },
};

export const CHINA_PREP: Record<string, TravelPrep> = {
  '北京': {
    documents: '身份证',
    visa: '部分景点需提前预约（故宫、国博等）',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '春秋最佳；冬季干燥寒冷，夏季炎热',
    tips: ['故宫门票提前 7 天官网约', '地铁公交一卡通/乘车码', '烤鸭全聚德/四季民福'],
  },
  '天津': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '春秋最佳；夏季闷热',
    tips: ['五大道骑共享单车逛', '瓷房子、意大利风情街', '狗不理包子打卡'],
  },
  '上海': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '3-5 月、9-11 月最佳；梅雨季 6 月',
    tips: ['外滩夜景 18:30 后最美', '地铁大都会乘车码', '迪士尼提前订票'],
  },
  '重庆': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '夏季极热（40°C），防暑',
    weather: '春秋最佳；冬季多雾，夏季火炉',
    tips: ['李子坝轻轨穿楼', '洪崖洞夜景免费', '火锅微辣起步'],
  },
  '香港': {
    documents: '身份证 + 港澳通行证 + 签注',
    visa: '港澳通行证有效签注（G/L 签）',
    currency: '港币（HKD）；八达通/支付宝可用',
    plug: 'G 型三脚扁插（英标），220V',
    comm: '本地电话卡或漫游；地铁覆盖全港',
    health: '无需特殊准备',
    weather: '10-12 月最佳；夏季湿热有台风',
    tips: ['八达通卡地铁通用', '迪士尼/海洋公园提前网上买票', '茶餐厅人均 50-100 港币'],
  },
  '澳门': {
    documents: '身份证 + 港澳通行证 + 签注',
    visa: '港澳通行证有效签注',
    currency: '澳门元（MOP）；港币通用，可刷卡',
    plug: 'G 型三脚扁插（英标），220V',
    comm: '本地电话卡或漫游',
    health: '无需特殊准备',
    weather: '10-12 月最佳',
    tips: ['大三巴免费打卡', '葡挞去玛嘉烈/安德鲁', '赌场 21 岁才能进'],
  },
  '台湾': {
    documents: '大陆居民往来台湾通行证 + 入台证',
    visa: '需入台证（通过旅行社办理）',
    currency: '新台币（TWD）；现金为主，便利店可刷卡',
    plug: 'A/B 型两脚扁插，110V',
    comm: '本地电话卡或漫游',
    health: '无需特殊准备',
    weather: '春秋最佳；夏季台风季',
    tips: ['悠游卡地铁公交通用', '夜市小吃现金为主', '便利店取现方便'],
  },
  '广东': {
    documents: '身份证',
    visa: '无特殊要求（港澳游需通行证）',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '夏季湿热，防暑防蚊',
    weather: '10-12 月、3-4 月最佳；夏季湿热多雨',
    tips: ['早茶体验（陶陶居/点都德）', '广州塔夜景', '长隆乐园提前订票'],
  },
  '江苏': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '3-5 月、9-11 月最佳；夏季闷热',
    tips: ['南京博物院免费需预约', '苏州园林选拙政园/留园', '扬州早茶（皮包水）'],
  },
  '浙江': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '3-5 月、9-11 月最佳；夏季台风沿海',
    tips: ['西湖免费环湖骑行', '乌镇/西塘水乡选一个', '杭州灵隐寺早去'],
  },
  '山东': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '5-10 月最佳；青岛 7-8 月旺季',
    tips: ['泰山夜爬看日出', '青岛啤酒博物馆', '威海/烟台海岸线美'],
  },
  '四川': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '高原区（九寨沟 3000m）防高反',
    weather: '春秋最佳；九寨沟 9-10 月秋色最美',
    tips: ['九寨沟限流提前订票', '大熊猫基地早上去', '乐山大佛+峨眉山连玩'],
  },
  '湖北': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '春秋最佳；夏季武汉火炉',
    tips: ['黄鹤楼+长江大桥', '武汉大学樱花 3 月', '热干面过早文化'],
  },
  '湖南': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '春秋最佳；夏季湿热',
    tips: ['张家界玻璃桥/天门山', '橘子洲头看烟花（周末）', '湘菜辣度先问'],
  },
  '福建': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '春秋最佳；夏季台风季',
    tips: ['鼓浪屿船票提前订', '武夷山竹筏漂流', '土楼在永定/南靖'],
  },
  '河南': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '春秋最佳；夏季炎热',
    tips: ['龙门石窟夜景震撼', '少林寺看武术表演', '洛阳水席尝一尝'],
  },
  '河北': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '春秋最佳；冬季冷',
    tips: ['承德避暑山庄', '秦皇岛阿那亚/北戴河', '草原天路自驾 7-9 月'],
  },
  '安徽': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '黄山登山备好体力',
    weather: '4-6 月、9-10 月最佳；黄山冬季有雾凇',
    tips: ['黄山看日出住山顶', '宏村/西递徽派古村', '徽菜臭鳜鱼'],
  },
  '江西': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '春秋最佳；庐山夏季避暑',
    tips: ['庐山含鄱口看日出', '景德镇陶溪川', '婺源篁岭晒秋 9-11 月'],
  },
  '陕西': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '春秋最佳；冬季干冷',
    tips: ['兵马俑提前订票', '大雁塔喷泉晚上', '回民街小吃现金'],
  },
  '广西': {
    documents: '身份证',
    visa: '无特殊要求（越南边民互市需边境通行证）',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '4-10 月最佳；桂林雨多带伞',
    tips: ['漓江竹筏+阳朔骑行', '龙脊梯田 5-10 月', '北海银滩/涠洲岛'],
  },
  '海南': {
    documents: '身份证',
    visa: '国际游客 59 国免签（中国公民直接用身份证）',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '防晒必带（紫外线强）',
    weather: '11-3 月避寒最佳；夏季台风季',
    tips: ['三亚免税店购物', '蜈支洲岛浮潜', '椰子鸡必吃'],
  },
  '云南': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '香格里拉/玉龙雪山 3000m+ 防高反',
    weather: '四季如春；雨季 6-8 月',
    tips: ['玉龙雪山索道提前订', '大理环洱海骑行', '丽江古城早去人少'],
  },
  '贵州': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '夏季避暑胜地；春秋最佳',
    tips: ['黄果树瀑布雨季更壮观', '千户苗寨夜景', '梵净山徒步'],
  },
  '辽宁': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '冬季严寒注意保暖',
    weather: '5-10 月最佳；冬季 -15°C',
    tips: ['大连滨海路', '沈阳故宫（小故宫）', '丹东鸭绿江断桥'],
  },
  '吉林': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '冬季极寒，羽绒服必备',
    weather: '6-9 月避暑；12-2 月滑雪季',
    tips: ['长白山天池看天气', '雾凇岛 12-2 月', '延吉朝鲜族美食'],
  },
  '黑龙江': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '冬季 -30°C，暖宝宝/防滑鞋',
    weather: '6-8 月避暑；12-1 月冰城季',
    tips: ['冰雪大世界 12 月底开放', '中央大街马迭尔冰棍', '漠河北极村找北'],
  },
  '山西': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '无需特殊准备',
    weather: '春秋最佳；冬季干冷',
    tips: ['平遥古城看《又见平遥》', '云冈石窟', '五台山祈福'],
  },
  '内蒙古': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '草原昼夜温差大，带外套',
    weather: '6-9 月草原最美',
    tips: ['呼伦贝尔大草原', '响沙湾沙漠', '烤全羊/手把肉'],
  },
  '甘肃': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '敦煌干燥，多补水防晒',
    weather: '5-10 月最佳；冬季冷',
    tips: ['莫高窟提前 30 天订票', '鸣沙山月牙泉', '张掖七彩丹霞日落'],
  },
  '新疆': {
    documents: '身份证',
    visa: '无特殊要求（边境地区需边防证）',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '时差 2 小时；防晒补水',
    weather: '5-10 月最佳；喀纳斯 9 月秋色',
    tips: ['喀纳斯/禾木秋季封神', '赛里木湖环湖', '大盘鸡/烤包子'],
  },
  '宁夏': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '干燥防晒',
    weather: '5-10 月最佳',
    tips: ['沙坡头沙漠黄河', '西夏王陵', '手抓羊肉'],
  },
  '青海': {
    documents: '身份证',
    visa: '无特殊要求',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '高原 3200m+，防高反、防晒',
    weather: '6-9 月最佳；昼夜温差大',
    tips: ['青海湖环湖骑行', '茶卡盐湖天空之镜', '塔尔寺'],
  },
  '西藏': {
    documents: '身份证',
    visa: '外籍游客需入藏函（中国公民无需）',
    currency: '人民币；手机支付普及',
    plug: 'A/C 型两脚扁插，220V',
    comm: '全国通用手机卡',
    health: '高反预防：提前一周吃红景天，慢行多喝水',
    weather: '5-10 月最佳；冬季含氧量更低',
    tips: ['布达拉宫提前订票', '纳木错看星空', '进藏首日不洗澡不剧烈运动'],
  },
};

// 辅助函数：根据城市名匹配准备数据
export function getPrepForCity(cityName: string, scope: 'global' | 'domestic'): TravelPrep | null {
  if (!cityName) return null;
  const city = cityName.split(',')[0].trim();

  if (scope === 'domestic') {
    // 中国：按城市名匹配省份
    // 1. 直接匹配省名/直辖市名（如 "广东"、"北京"）
    if (CHINA_PREP[city]) return CHINA_PREP[city];
    // 2. 用 CHINA_REGIONS 反查城市属于哪个省
    for (const region of CHINA_REGIONS) {
      if (region.province === city) return CHINA_PREP[region.province] || null;
      for (const c of region.cities) {
        if (city.includes(c) || c.includes(city)) {
          return CHINA_PREP[region.province] || null;
        }
      }
    }
    // 3. 兜底：内部映射
    for (const [region, prep] of Object.entries(CHINA_PREP)) {
      const regionCities = getChinaRegionCities(region);
      if (regionCities.some(c => city.includes(c) || c.includes(city))) {
        return prep;
      }
    }
    return null;
  } else {
    // 全球：城市名 -> 国家
    // 1. 直接匹配国家名（如 "日本"、"泰国"）
    if (COUNTRY_PREP[city]) return COUNTRY_PREP[city];
    // 2. 用 HOT_COUNTRIES 反查城市属于哪个国家
    for (const country of HOT_COUNTRIES) {
      if (country.country === city) return COUNTRY_PREP[country.country] || null;
      for (const c of country.cities) {
        if (city.includes(c) || c.includes(city)) {
          return COUNTRY_PREP[country.country] || null;
        }
      }
    }
    // 3. 兜底：国家名模糊匹配
    for (const [country, prep] of Object.entries(COUNTRY_PREP)) {
      if (city.includes(country) || country.includes(city)) {
        return prep;
      }
    }
    return null;
  }
}

// 从 regions.ts 获取省份的城市列表（延迟导入避免循环）
function getChinaRegionCities(province: string): string[] {
  try {
    // 动态引入 regions 数据（简单映射兜底）
    const regionMap: Record<string, string[]> = {
      '北京': ['北京市'], '天津': ['天津市'], '上海': ['上海市'], '重庆': ['重庆市'],
      '香港': ['香港'], '澳门': ['澳门'], '台湾': ['台北', '高雄', '台中'],
      '广东': ['广州', '深圳', '珠海', '佛山', '东莞', '中山', '惠州', '汕头'],
      '江苏': ['南京', '苏州', '无锡', '常州', '扬州', '南通', '徐州'],
      '浙江': ['杭州', '宁波', '温州', '绍兴', '嘉兴', '金华', '湖州'],
      '山东': ['济南', '青岛', '烟台', '威海', '潍坊', '泰安', '日照'],
      '四川': ['成都', '绵阳', '乐山', '宜宾', '泸州', '都江堰'],
      '湖北': ['武汉', '宜昌', '襄阳', '荆州', '黄冈'],
      '湖南': ['长沙', '株洲', '湘潭', '岳阳', '张家界', '衡阳'],
      '福建': ['福州', '厦门', '泉州', '漳州', '莆田'],
      '河南': ['郑州', '洛阳', '开封', '安阳', '南阳'],
      '河北': ['石家庄', '唐山', '秦皇岛', '保定', '邯郸'],
      '安徽': ['合肥', '芜湖', '黄山', '安庆', '蚌埠'],
      '江西': ['南昌', '九江', '赣州', '景德镇', '上饶'],
      '陕西': ['西安', '咸阳', '宝鸡', '延安', '汉中'],
      '广西': ['南宁', '桂林', '柳州', '北海', '梧州'],
      '海南': ['海口', '三亚', '万宁', '文昌'],
      '云南': ['昆明', '大理', '丽江', '西双版纳', '香格里拉', '玉溪'],
      '贵州': ['贵阳', '遵义', '安顺', '黔东南', '凯里'],
      '辽宁': ['沈阳', '大连', '鞍山', '锦州', '丹东'],
      '吉林': ['长春', '吉林市', '延边', '松原'],
      '黑龙江': ['哈尔滨', '齐齐哈尔', '大庆', '牡丹江'],
      '山西': ['太原', '大同', '临汾', '运城'],
      '内蒙古': ['呼和浩特', '包头', '鄂尔多斯', '呼伦贝尔', '赤峰'],
      '甘肃': ['兰州', '敦煌', '天水', '张掖', '酒泉'],
      '新疆': ['乌鲁木齐', '喀什', '吐鲁番', '伊犁', '阿勒泰'],
      '宁夏': ['银川', '中卫', '吴忠'],
      '青海': ['西宁', '格尔木', '玉树'],
      '西藏': ['拉萨', '日喀则', '林芝'],
    };
    return regionMap[province] || [];
  } catch {
    return [];
  }
}
