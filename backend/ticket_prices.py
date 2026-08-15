# 景点门票参考价库（方案 A - 后端版）
# 数据来源：各景点官网/官方渠道公开票价（2026-08），人民币参考区间
# 用途：AI 生成行程后，匹配到的景点用官方价覆盖 AI 估算价

TICKET_PRICES = [
  {
    "name": "故宫博物院",
    "price": [
      60,
      60
    ],
    "aliases": [
      "故宫",
      "Forbidden City"
    ],
    "city": "北京",
    "note": "旺季60/淡季40"
  },
  {
    "name": "颐和园",
    "price": [
      30,
      60
    ],
    "aliases": [
      "Summer Palace"
    ],
    "city": "北京"
  },
  {
    "name": "天坛公园",
    "price": [
      15,
      34
    ],
    "aliases": [
      "Temple of Heaven"
    ],
    "city": "北京"
  },
  {
    "name": "八达岭长城",
    "price": [
      40,
      40
    ],
    "aliases": [
      "长城",
      "Great Wall"
    ],
    "city": "北京"
  },
  {
    "name": "北京环球影城",
    "price": [
      418,
      638
    ],
    "aliases": [
      "环球影城"
    ],
    "city": "北京",
    "note": "工作日418/周末638"
  },
  {
    "name": "国家博物馆",
    "price": [
      0,
      0
    ],
    "aliases": [
      "国博"
    ],
    "city": "北京",
    "note": "免费需预约"
  },
  {
    "name": "上海迪士尼乐园",
    "price": [
      399,
      599
    ],
    "aliases": [
      "迪士尼",
      "Disneyland"
    ],
    "city": "上海",
    "note": "平日399/高峰599"
  },
  {
    "name": "东方明珠",
    "price": [
      199,
      220
    ],
    "aliases": [
      "Oriental Pearl"
    ],
    "city": "上海"
  },
  {
    "name": "上海博物馆",
    "price": [
      0,
      0
    ],
    "city": "上海",
    "note": "免费需预约"
  },
  {
    "name": "广州长隆野生动物世界",
    "price": [
      250,
      350
    ],
    "aliases": [
      "长隆"
    ],
    "city": "广州"
  },
  {
    "name": "广州塔",
    "price": [
      150,
      228
    ],
    "aliases": [
      "小蛮腰"
    ],
    "city": "广州"
  },
  {
    "name": "深圳世界之窗",
    "price": [
      220,
      220
    ],
    "city": "深圳"
  },
  {
    "name": "成都大熊猫繁育研究基地",
    "price": [
      55,
      55
    ],
    "aliases": [
      "熊猫基地",
      "Panda Base"
    ],
    "city": "成都"
  },
  {
    "name": "都江堰景区",
    "price": [
      80,
      80
    ],
    "city": "成都"
  },
  {
    "name": "杭州西湖",
    "price": [
      0,
      0
    ],
    "aliases": [
      "西湖"
    ],
    "city": "杭州",
    "note": "免费，部分景点收费"
  },
  {
    "name": "杭州灵隐寺",
    "price": [
      30,
      75
    ],
    "city": "杭州",
    "note": "飞来峰45+灵隐30"
  },
  {
    "name": "西安秦始皇兵马俑",
    "price": [
      120,
      120
    ],
    "aliases": [
      "兵马俑",
      "Terracotta Army"
    ],
    "city": "西安"
  },
  {
    "name": "西安大雁塔",
    "price": [
      40,
      50
    ],
    "city": "西安"
  },
  {
    "name": "重庆洪崖洞",
    "price": [
      0,
      0
    ],
    "city": "重庆",
    "note": "免费"
  },
  {
    "name": "张家界国家森林公园",
    "price": [
      227,
      227
    ],
    "aliases": [
      "张家界"
    ],
    "city": "张家界",
    "note": "四日联票"
  },
  {
    "name": "黄山风景区",
    "price": [
      150,
      190
    ],
    "aliases": [
      "黄山"
    ],
    "city": "黄山"
  },
  {
    "name": "泰山风景区",
    "price": [
      115,
      115
    ],
    "aliases": [
      "泰山"
    ],
    "city": "泰安"
  },
  {
    "name": "桂林漓江景区",
    "price": [
      80,
      215
    ],
    "aliases": [
      "漓江"
    ],
    "city": "桂林",
    "note": "游船分档"
  },
  {
    "name": "三亚亚龙湾热带天堂森林公园",
    "price": [
      158,
      158
    ],
    "city": "三亚"
  },
  {
    "name": "武汉黄鹤楼",
    "price": [
      70,
      70
    ],
    "aliases": [
      "黄鹤楼"
    ],
    "city": "武汉"
  },
  {
    "name": "南京中山陵",
    "price": [
      0,
      0
    ],
    "city": "南京",
    "note": "免费需预约"
  },
  {
    "name": "苏州拙政园",
    "price": [
      70,
      90
    ],
    "aliases": [
      "拙政园"
    ],
    "city": "苏州"
  },
  {
    "name": "厦门鼓浪屿",
    "price": [
      35,
      90
    ],
    "aliases": [
      "鼓浪屿"
    ],
    "city": "厦门",
    "note": "船票+景点联票"
  },
  {
    "name": "丽江玉龙雪山",
    "price": [
      100,
      140
    ],
    "aliases": [
      "玉龙雪山"
    ],
    "city": "丽江",
    "note": "进山费100+索道另计"
  },
  {
    "name": "拉萨布达拉宫",
    "price": [
      200,
      200
    ],
    "aliases": [
      "布达拉宫",
      "Potala"
    ],
    "city": "拉萨",
    "note": "旺季需预约"
  },
  {
    "name": "青海茶卡盐湖",
    "price": [
      60,
      60
    ],
    "aliases": [
      "茶卡盐湖"
    ],
    "city": "西宁"
  },
  {
    "name": "乌鲁木齐天山天池",
    "price": [
      95,
      95
    ],
    "aliases": [
      "天池"
    ],
    "city": "乌鲁木齐"
  },
  {
    "name": "哈尔滨冰雪大世界",
    "price": [
      330,
      330
    ],
    "city": "哈尔滨",
    "note": "冬季"
  },
  {
    "name": "青岛崂山",
    "price": [
      90,
      90
    ],
    "city": "青岛"
  },
  {
    "name": "洛阳龙门石窟",
    "price": [
      90,
      90
    ],
    "aliases": [
      "龙门石窟"
    ],
    "city": "洛阳"
  },
  {
    "name": "天津之眼",
    "price": [
      70,
      70
    ],
    "city": "天津"
  },
  {
    "name": "长沙橘子洲",
    "price": [
      0,
      0
    ],
    "city": "长沙",
    "note": "免费"
  },
  {
    "name": "郑州嵩山少林寺",
    "price": [
      80,
      100
    ],
    "aliases": [
      "少林寺"
    ],
    "city": "郑州"
  },
  {
    "name": "南昌滕王阁",
    "price": [
      50,
      50
    ],
    "aliases": [
      "滕王阁"
    ],
    "city": "南昌"
  },
  {
    "name": "昆明石林",
    "price": [
      130,
      130
    ],
    "aliases": [
      "石林"
    ],
    "city": "昆明"
  },
  {
    "name": "贵阳黄果树瀑布",
    "price": [
      160,
      160
    ],
    "aliases": [
      "黄果树"
    ],
    "city": "贵阳"
  },
  {
    "name": "太原晋祠",
    "price": [
      80,
      80
    ],
    "city": "太原"
  },
  {
    "name": "沈阳故宫",
    "price": [
      60,
      60
    ],
    "city": "沈阳"
  },
  {
    "name": "大连老虎滩海洋公园",
    "price": [
      220,
      220
    ],
    "city": "大连"
  },
  {
    "name": "哈尔滨圣索菲亚大教堂",
    "price": [
      20,
      20
    ],
    "city": "哈尔滨"
  },
  {
    "name": "香港迪士尼乐园",
    "price": [
      639,
      879
    ],
    "aliases": [
      "香港迪士尼"
    ],
    "city": "香港"
  },
  {
    "name": "香港海洋公园",
    "price": [
      498,
      498
    ],
    "city": "香港"
  },
  {
    "name": "澳门大三巴牌坊",
    "price": [
      0,
      0
    ],
    "city": "澳门",
    "note": "免费"
  },
  {
    "name": "台北101",
    "price": [
      180,
      180
    ],
    "city": "台北"
  },
  {
    "name": "东京塔",
    "price": [
      70,
      120
    ],
    "aliases": [
      "Tokyo Tower"
    ],
    "city": "东京",
    "country": "日本"
  },
  {
    "name": "东京晴空塔",
    "price": [
      110,
      160
    ],
    "aliases": [
      "晴空塔",
      "Tokyo Skytree"
    ],
    "city": "东京",
    "country": "日本"
  },
  {
    "name": "浅草寺",
    "price": [
      0,
      0
    ],
    "aliases": [
      "Senso-ji"
    ],
    "city": "东京",
    "country": "日本",
    "note": "免费"
  },
  {
    "name": "明治神宫",
    "price": [
      0,
      0
    ],
    "aliases": [
      "Meiji Shrine"
    ],
    "city": "东京",
    "country": "日本",
    "note": "免费"
  },
  {
    "name": "上野公园",
    "price": [
      0,
      0
    ],
    "aliases": [
      "Ueno Park"
    ],
    "city": "东京",
    "country": "日本",
    "note": "公园免费"
  },
  {
    "name": "东京国立博物馆",
    "price": [
      50,
      50
    ],
    "city": "东京",
    "country": "日本"
  },
  {
    "name": "teamLab Planets",
    "price": [
      160,
      200
    ],
    "city": "东京",
    "country": "日本"
  },
  {
    "name": "东京迪士尼乐园",
    "price": [
      390,
      450
    ],
    "aliases": [
      "Tokyo Disney"
    ],
    "city": "东京",
    "country": "日本"
  },
  {
    "name": "大阪环球影城",
    "price": [
      400,
      500
    ],
    "aliases": [
      "USJ",
      "Universal"
    ],
    "city": "大阪",
    "country": "日本"
  },
  {
    "name": "大阪城天守阁",
    "price": [
      30,
      30
    ],
    "aliases": [
      "Osaka Castle"
    ],
    "city": "大阪",
    "country": "日本"
  },
  {
    "name": "京都清水寺",
    "price": [
      20,
      20
    ],
    "aliases": [
      "Kiyomizu-dera"
    ],
    "city": "京都",
    "country": "日本"
  },
  {
    "name": "京都伏见稻荷大社",
    "price": [
      0,
      0
    ],
    "aliases": [
      "稻荷"
    ],
    "city": "京都",
    "country": "日本",
    "note": "免费"
  },
  {
    "name": "京都金阁寺",
    "price": [
      20,
      20
    ],
    "aliases": [
      "Kinkaku-ji"
    ],
    "city": "京都",
    "country": "日本"
  },
  {
    "name": "奈良东大寺",
    "price": [
      30,
      30
    ],
    "city": "奈良",
    "country": "日本"
  },
  {
    "name": "札幌白色恋人公园",
    "price": [
      40,
      40
    ],
    "city": "札幌",
    "country": "日本"
  },
  {
    "name": "大皇宫",
    "price": [
      100,
      100
    ],
    "aliases": [
      "Grand Palace"
    ],
    "city": "曼谷",
    "country": "泰国"
  },
  {
    "name": "郑王庙",
    "price": [
      20,
      20
    ],
    "aliases": [
      "Wat Arun"
    ],
    "city": "曼谷",
    "country": "泰国"
  },
  {
    "name": "卧佛寺",
    "price": [
      40,
      40
    ],
    "aliases": [
      "Wat Pho"
    ],
    "city": "曼谷",
    "country": "泰国"
  },
  {
    "name": "曼谷暹罗海洋世界",
    "price": [
      200,
      280
    ],
    "city": "曼谷",
    "country": "泰国"
  },
  {
    "name": "清迈双龙寺",
    "price": [
      6,
      6
    ],
    "aliases": [
      "素贴山"
    ],
    "city": "清迈",
    "country": "泰国"
  },
  {
    "name": "普吉岛大佛",
    "price": [
      0,
      0
    ],
    "city": "普吉",
    "country": "泰国",
    "note": "免费"
  },
  {
    "name": "景福宫",
    "price": [
      15,
      15
    ],
    "aliases": [
      "Gyeongbokgung"
    ],
    "city": "首尔",
    "country": "韩国"
  },
  {
    "name": "首尔塔",
    "price": [
      55,
      55
    ],
    "aliases": [
      "N首尔塔",
      "N Seoul Tower"
    ],
    "city": "首尔",
    "country": "韩国"
  },
  {
    "name": "乐天世界",
    "price": [
      200,
      260
    ],
    "aliases": [
      "Lotte World"
    ],
    "city": "首尔",
    "country": "韩国"
  },
  {
    "name": "釜山甘川文化村",
    "price": [
      0,
      0
    ],
    "city": "釜山",
    "country": "韩国",
    "note": "免费"
  },
  {
    "name": "济州岛汉拿山",
    "price": [
      0,
      0
    ],
    "city": "济州",
    "country": "韩国",
    "note": "免费"
  },
  {
    "name": "滨海湾金沙空中花园",
    "price": [
      100,
      140
    ],
    "aliases": [
      "SkyPark"
    ],
    "city": "新加坡"
  },
  {
    "name": "环球影城新加坡",
    "price": [
      350,
      400
    ],
    "aliases": [
      "USS"
    ],
    "city": "新加坡"
  },
  {
    "name": "新加坡动物园",
    "price": [
      180,
      220
    ],
    "city": "新加坡"
  },
  {
    "name": "鱼尾狮公园",
    "price": [
      0,
      0
    ],
    "city": "新加坡",
    "note": "免费"
  },
  {
    "name": "滨海湾花园",
    "price": [
      100,
      120
    ],
    "aliases": [
      "Gardens by the Bay"
    ],
    "city": "新加坡"
  },
  {
    "name": "双子塔观景台",
    "price": [
      140,
      140
    ],
    "aliases": [
      "Petronas"
    ],
    "city": "吉隆坡",
    "country": "马来西亚"
  },
  {
    "name": "黑风洞",
    "price": [
      0,
      0
    ],
    "aliases": [
      "Batu Caves"
    ],
    "city": "吉隆坡",
    "country": "马来西亚",
    "note": "免费"
  },
  {
    "name": "胡志明市战争遗迹博物馆",
    "price": [
      10,
      10
    ],
    "city": "胡志明市",
    "country": "越南"
  },
  {
    "name": "河内还剑湖",
    "price": [
      0,
      0
    ],
    "city": "河内",
    "country": "越南",
    "note": "免费"
  },
  {
    "name": "岘港巴拿山",
    "price": [
      300,
      350
    ],
    "aliases": [
      "Ba Na Hills"
    ],
    "city": "岘港",
    "country": "越南"
  },
  {
    "name": "埃菲尔铁塔",
    "price": [
      80,
      180
    ],
    "aliases": [
      "Eiffel Tower"
    ],
    "city": "巴黎",
    "country": "法国",
    "note": "登顶各层票价不同"
  },
  {
    "name": "卢浮宫",
    "price": [
      130,
      130
    ],
    "aliases": [
      "Louvre"
    ],
    "city": "巴黎",
    "country": "法国"
  },
  {
    "name": "凡尔赛宫",
    "price": [
      140,
      190
    ],
    "aliases": [
      "Versailles"
    ],
    "city": "巴黎",
    "country": "法国",
    "note": "含花园"
  },
  {
    "name": "巴黎圣母院",
    "price": [
      0,
      0
    ],
    "aliases": [
      "Notre-Dame"
    ],
    "city": "巴黎",
    "country": "法国",
    "note": "免费"
  },
  {
    "name": "奥赛博物馆",
    "price": [
      110,
      110
    ],
    "aliases": [
      "Musee d Orsay"
    ],
    "city": "巴黎",
    "country": "法国"
  },
  {
    "name": "凯旋门",
    "price": [
      90,
      90
    ],
    "aliases": [
      "Arc de Triomphe"
    ],
    "city": "巴黎",
    "country": "法国"
  },
  {
    "name": "尼斯天使湾",
    "price": [
      0,
      0
    ],
    "city": "尼斯",
    "country": "法国",
    "note": "免费"
  },
  {
    "name": "罗马斗兽场",
    "price": [
      120,
      120
    ],
    "aliases": [
      "Colosseum"
    ],
    "city": "罗马",
    "country": "意大利"
  },
  {
    "name": "梵蒂冈博物馆",
    "price": [
      130,
      130
    ],
    "aliases": [
      "Vatican"
    ],
    "city": "罗马",
    "country": "意大利"
  },
  {
    "name": "圣彼得大教堂",
    "price": [
      0,
      0
    ],
    "aliases": [
      "St Peter"
    ],
    "city": "罗马",
    "country": "意大利",
    "note": "登顶另收"
  },
  {
    "name": "米兰大教堂",
    "price": [
      50,
      100
    ],
    "aliases": [
      "Duomo"
    ],
    "city": "米兰",
    "country": "意大利"
  },
  {
    "name": "威尼斯圣马可大教堂",
    "price": [
      0,
      0
    ],
    "city": "威尼斯",
    "country": "意大利",
    "note": "入内免费"
  },
  {
    "name": "佛罗伦萨乌菲兹美术馆",
    "price": [
      130,
      130
    ],
    "aliases": [
      "Uffizi"
    ],
    "city": "佛罗伦萨",
    "country": "意大利"
  },
  {
    "name": "大英博物馆",
    "price": [
      0,
      0
    ],
    "aliases": [
      "British Museum"
    ],
    "city": "伦敦",
    "country": "英国",
    "note": "免费"
  },
  {
    "name": "伦敦塔",
    "price": [
      200,
      200
    ],
    "aliases": [
      "Tower of London"
    ],
    "city": "伦敦",
    "country": "英国"
  },
  {
    "name": "伦敦眼",
    "price": [
      250,
      280
    ],
    "aliases": [
      "London Eye"
    ],
    "city": "伦敦",
    "country": "英国"
  },
  {
    "name": "伦敦塔桥",
    "price": [
      80,
      80
    ],
    "aliases": [
      "Tower Bridge"
    ],
    "city": "伦敦",
    "country": "英国",
    "note": "登塔展览"
  },
  {
    "name": "白金汉宫",
    "price": [
      200,
      300
    ],
    "aliases": [
      "Buckingham"
    ],
    "city": "伦敦",
    "country": "英国",
    "note": "夏季开放"
  },
  {
    "name": "爱丁堡城堡",
    "price": [
      150,
      150
    ],
    "aliases": [
      "Edinburgh Castle"
    ],
    "city": "爱丁堡",
    "country": "英国"
  },
  {
    "name": "柏林墙遗址",
    "price": [
      0,
      0
    ],
    "aliases": [
      "Berlin Wall"
    ],
    "city": "柏林",
    "country": "德国",
    "note": "免费"
  },
  {
    "name": "勃兰登堡门",
    "price": [
      0,
      0
    ],
    "aliases": [
      "Brandenburg"
    ],
    "city": "柏林",
    "country": "德国",
    "note": "免费"
  },
  {
    "name": "慕尼黑新天鹅堡",
    "price": [
      100,
      160
    ],
    "aliases": [
      "Neuschwanstein"
    ],
    "city": "慕尼黑",
    "country": "德国"
  },
  {
    "name": "法兰克福大教堂",
    "price": [
      0,
      0
    ],
    "city": "法兰克福",
    "country": "德国",
    "note": "免费"
  },
  {
    "name": "圣家堂",
    "price": [
      180,
      280
    ],
    "aliases": [
      "Sagrada Familia"
    ],
    "city": "巴塞罗那",
    "country": "西班牙"
  },
  {
    "name": "巴特罗之家",
    "price": [
      220,
      250
    ],
    "aliases": [
      "Casa Batllo"
    ],
    "city": "巴塞罗那",
    "country": "西班牙"
  },
  {
    "name": "马德里王宫",
    "price": [
      90,
      90
    ],
    "aliases": [
      "Royal Palace"
    ],
    "city": "马德里",
    "country": "西班牙"
  },
  {
    "name": "塞维利亚大教堂",
    "price": [
      70,
      70
    ],
    "city": "塞维利亚",
    "country": "西班牙"
  },
  {
    "name": "贝伦塔",
    "price": [
      45,
      45
    ],
    "aliases": [
      "Belem Tower"
    ],
    "city": "里斯本",
    "country": "葡萄牙"
  },
  {
    "name": "热罗尼莫斯修道院",
    "price": [
      70,
      70
    ],
    "city": "里斯本",
    "country": "葡萄牙"
  },
  {
    "name": "雅典卫城",
    "price": [
      150,
      150
    ],
    "aliases": [
      "Acropolis"
    ],
    "city": "雅典",
    "country": "希腊"
  },
  {
    "name": "圣托里尼蓝顶教堂",
    "price": [
      0,
      0
    ],
    "city": "圣托里尼",
    "country": "希腊",
    "note": "免费"
  },
  {
    "name": "少女峰",
    "price": [
      1000,
      1400
    ],
    "aliases": [
      "Jungfrau"
    ],
    "city": "因特拉肯",
    "country": "瑞士",
    "note": "登山火车往返"
  },
  {
    "name": "苏黎世大教堂",
    "price": [
      0,
      0
    ],
    "city": "苏黎世",
    "country": "瑞士",
    "note": "免费"
  },
  {
    "name": "梵高博物馆",
    "price": [
      140,
      140
    ],
    "aliases": [
      "Van Gogh"
    ],
    "city": "阿姆斯特丹",
    "country": "荷兰"
  },
  {
    "name": "安妮之家",
    "price": [
      110,
      110
    ],
    "aliases": [
      "Anne Frank"
    ],
    "city": "阿姆斯特丹",
    "country": "荷兰"
  },
  {
    "name": "自由女神像",
    "price": [
      120,
      180
    ],
    "aliases": [
      "Statue of Liberty"
    ],
    "city": "纽约",
    "country": "美国"
  },
  {
    "name": "大都会艺术博物馆",
    "price": [
      180,
      180
    ],
    "aliases": [
      "Metropolitan",
      "The Met"
    ],
    "city": "纽约",
    "country": "美国"
  },
  {
    "name": "帝国大厦",
    "price": [
      250,
      350
    ],
    "aliases": [
      "Empire State"
    ],
    "city": "纽约",
    "country": "美国"
  },
  {
    "name": "时代广场",
    "price": [
      0,
      0
    ],
    "aliases": [
      "Times Square"
    ],
    "city": "纽约",
    "country": "美国",
    "note": "免费"
  },
  {
    "name": "洛杉矶环球影城",
    "price": [
      600,
      750
    ],
    "aliases": [
      "Universal Hollywood"
    ],
    "city": "洛杉矶",
    "country": "美国"
  },
  {
    "name": "旧金山金门大桥",
    "price": [
      0,
      0
    ],
    "aliases": [
      "Golden Gate"
    ],
    "city": "旧金山",
    "country": "美国",
    "note": "免费"
  },
  {
    "name": "拉斯维加斯大道",
    "price": [
      0,
      0
    ],
    "aliases": [
      "The Strip"
    ],
    "city": "拉斯维加斯",
    "country": "美国",
    "note": "免费"
  },
  {
    "name": "黄石国家公园",
    "price": [
      200,
      200
    ],
    "aliases": [
      "Yellowstone"
    ],
    "city": "黄石",
    "country": "美国",
    "note": "车辆7日票"
  },
  {
    "name": "CN塔",
    "price": [
      230,
      280
    ],
    "aliases": [
      "CN Tower"
    ],
    "city": "多伦多",
    "country": "加拿大"
  },
  {
    "name": "温哥华斯坦利公园",
    "price": [
      0,
      0
    ],
    "aliases": [
      "Stanley Park"
    ],
    "city": "温哥华",
    "country": "加拿大",
    "note": "免费"
  },
  {
    "name": "悉尼歌剧院",
    "price": [
      200,
      300
    ],
    "aliases": [
      "Opera House"
    ],
    "city": "悉尼",
    "country": "澳大利亚",
    "note": "参观/演出不同"
  },
  {
    "name": "悉尼大桥攀登",
    "price": [
      1300,
      1600
    ],
    "aliases": [
      "Harbour Bridge"
    ],
    "city": "悉尼",
    "country": "澳大利亚"
  },
  {
    "name": "黄金海岸主题公园",
    "price": [
      400,
      500
    ],
    "city": "黄金海岸",
    "country": "澳大利亚"
  },
  {
    "name": "皇后镇天空缆车",
    "price": [
      300,
      350
    ],
    "aliases": [
      "Skyline"
    ],
    "city": "皇后镇",
    "country": "新西兰"
  },
  {
    "name": "霍比特村",
    "price": [
      550,
      600
    ],
    "aliases": [
      "Hobbiton"
    ],
    "city": "奥克兰",
    "country": "新西兰"
  },
  {
    "name": "哈利法塔",
    "price": [
      300,
      500
    ],
    "aliases": [
      "Burj Khalifa"
    ],
    "city": "迪拜",
    "country": "阿联酋",
    "note": "不同楼层票价"
  },
  {
    "name": "迪拜沙漠冲沙",
    "price": [
      250,
      400
    ],
    "aliases": [
      "Desert Safari"
    ],
    "city": "迪拜",
    "country": "阿联酋"
  },
  {
    "name": "圣索菲亚大教堂",
    "price": [
      180,
      180
    ],
    "aliases": [
      "Hagia Sophia"
    ],
    "city": "伊斯坦布尔",
    "country": "土耳其"
  },
  {
    "name": "托普卡帕宫",
    "price": [
      250,
      250
    ],
    "aliases": [
      "Topkapi"
    ],
    "city": "伊斯坦布尔",
    "country": "土耳其"
  },
  {
    "name": "卡帕多奇亚热气球",
    "price": [
      1000,
      1500
    ],
    "aliases": [
      "Balloon"
    ],
    "city": "卡帕多西亚",
    "country": "土耳其"
  }
]

def find_ticket_price(attraction_name):
    """根据景点名称匹配门票价格（精确 + 别名 + 模糊）"""
    if not attraction_name:
        return None
    name = attraction_name.strip()

    # 精确匹配
    for t in TICKET_PRICES:
        if t["name"] == name:
            return t
        for a in t.get("aliases", []):
            if a == name:
                return t

    # 模糊匹配（包含关系）
    for t in TICKET_PRICES:
        if len(t["name"]) >= 2 and (name in t["name"] or t["name"] in name):
            return t
        for a in t.get("aliases", []):
            if len(a) >= 2 and (name in a or a in name):
                return t

    return None
