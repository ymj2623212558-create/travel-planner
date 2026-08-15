# 景点门票参考价库（方案 A - 后端版）
# 数据来源：各景点官网/官方渠道公开票价（2026-08），人民币参考区间
# 用途：AI 生成行程后，匹配到的景点用官方价覆盖 AI 估算价

TICKET_PRICES = [
  {
    "name": "天坛公园",
    "price": [15, 34],
    "aliases": ["天坛"],
    "city": "北京"
  },
  {
    "name": "八达岭长城",
    "price": [40, 40],
    "aliases": ["长城", "八达岭"],
    "city": "北京"
  },
  {
    "name": "国家博物馆",
    "price": [0, 0],
    "aliases": ["国博"],
    "city": "北京"
  },
  {
    "name": "北京环球影城",
    "price": [418, 638],
    "aliases": ["环球影城"],
    "city": "北京"
  },
  {
    "name": "恭王府",
    "price": [40, 40],
    "aliases": [],
    "city": "北京"
  },
  {
    "name": "雍和宫",
    "price": [25, 25],
    "aliases": [],
    "city": "北京"
  },
  {
    "name": "北海公园",
    "price": [10, 20],
    "aliases": [],
    "city": "北京"
  },
  {
    "name": "景山公园",
    "price": [2, 10],
    "aliases": [],
    "city": "北京"
  },
  {
    "name": "圆明园",
    "price": [10, 25],
    "aliases": [],
    "city": "北京"
  },
  {
    "name": "香山公园",
    "price": [5, 10],
    "aliases": [],
    "city": "北京"
  },
  {
    "name": "北京野生动物园",
    "price": [130, 150],
    "aliases": [],
    "city": "北京"
  },
  {
    "name": "北京海洋馆",
    "price": [160, 175],
    "aliases": [],
    "city": "北京"
  },
  {
    "name": "居庸关长城",
    "price": [35, 40],
    "aliases": [],
    "city": "北京"
  },
  {
    "name": "慕田峪长城",
    "price": [40, 45],
    "aliases": [],
    "city": "北京"
  },
  {
    "name": "明十三陵",
    "price": [30, 65],
    "aliases": [],
    "city": "北京"
  },
  {
    "name": "上海迪士尼",
    "price": [399, 599],
    "aliases": ["迪士尼"],
    "city": "上海"
  },
  {
    "name": "上海中心大厦",
    "price": [180, 220],
    "aliases": ["上海之巅"],
    "city": "上海"
  },
  {
    "name": "东方明珠",
    "price": [120, 220],
    "aliases": [],
    "city": "上海"
  },
  {
    "name": "上海海洋水族馆",
    "price": [160, 160],
    "aliases": [],
    "city": "上海"
  },
  {
    "name": "豫园",
    "price": [30, 40],
    "aliases": [],
    "city": "上海"
  },
  {
    "name": "上海科技馆",
    "price": [45, 60],
    "aliases": [],
    "city": "上海"
  },
  {
    "name": "上海博物馆",
    "price": [0, 0],
    "aliases": [],
    "city": "上海"
  },
  {
    "name": "朱家角古镇",
    "price": [0, 80],
    "aliases": [],
    "city": "上海"
  },
  {
    "name": "上海野生动物园",
    "price": [130, 165],
    "aliases": [],
    "city": "上海"
  },
  {
    "name": "金茂大厦",
    "price": [120, 150],
    "aliases": [],
    "city": "上海"
  },
  {
    "name": "上海杜莎夫人蜡像馆",
    "price": [190, 210],
    "aliases": [],
    "city": "上海"
  },
  {
    "name": "广州塔",
    "price": [150, 228],
    "aliases": ["小蛮腰"],
    "city": "广州"
  },
  {
    "name": "长隆野生动物世界",
    "price": [250, 350],
    "aliases": ["长隆"],
    "city": "广州"
  },
  {
    "name": "长隆欢乐世界",
    "price": [250, 300],
    "aliases": [],
    "city": "广州"
  },
  {
    "name": "白云山",
    "price": [5, 10],
    "aliases": [],
    "city": "广州"
  },
  {
    "name": "陈家祠",
    "price": [10, 10],
    "aliases": [],
    "city": "广州"
  },
  {
    "name": "沙面",
    "price": [0, 0],
    "aliases": [],
    "city": "广州"
  },
  {
    "name": "广州海洋馆",
    "price": [130, 130],
    "aliases": [],
    "city": "广州"
  },
  {
    "name": "岭南印象园",
    "price": [60, 60],
    "aliases": [],
    "city": "广州"
  },
  {
    "name": "世界之窗",
    "price": [220, 240],
    "aliases": [],
    "city": "深圳"
  },
  {
    "name": "欢乐谷",
    "price": [230, 250],
    "aliases": [],
    "city": "深圳"
  },
  {
    "name": "东部华侨城",
    "price": [180, 200],
    "aliases": [],
    "city": "深圳"
  },
  {
    "name": "锦绣中华",
    "price": [200, 220],
    "aliases": [],
    "city": "深圳"
  },
  {
    "name": "深圳野生动物园",
    "price": [200, 240],
    "aliases": [],
    "city": "深圳"
  },
  {
    "name": "大梅沙",
    "price": [0, 0],
    "aliases": [],
    "city": "深圳"
  },
  {
    "name": "仙湖植物园",
    "price": [15, 15],
    "aliases": [],
    "city": "深圳"
  },
  {
    "name": "成都大熊猫基地",
    "price": [55, 55],
    "aliases": ["大熊猫基地", "熊猫基地"],
    "city": "成都"
  },
  {
    "name": "都江堰",
    "price": [80, 80],
    "aliases": [],
    "city": "成都"
  },
  {
    "name": "青城山",
    "price": [80, 80],
    "aliases": [],
    "city": "成都"
  },
  {
    "name": "武侯祠",
    "price": [50, 50],
    "aliases": [],
    "city": "成都"
  },
  {
    "name": "锦里",
    "price": [0, 0],
    "aliases": [],
    "city": "成都"
  },
  {
    "name": "宽窄巷子",
    "price": [0, 0],
    "aliases": [],
    "city": "成都"
  },
  {
    "name": "成都欢乐谷",
    "price": [200, 230],
    "aliases": [],
    "city": "成都"
  },
  {
    "name": "西岭雪山",
    "price": [120, 180],
    "aliases": [],
    "city": "成都"
  },
  {
    "name": "杜甫草堂",
    "price": [50, 50],
    "aliases": [],
    "city": "成都"
  },
  {
    "name": "洪崖洞",
    "price": [0, 0],
    "aliases": [],
    "city": "重庆"
  },
  {
    "name": "长江索道",
    "price": [20, 30],
    "aliases": [],
    "city": "重庆"
  },
  {
    "name": "武隆天生三桥",
    "price": [95, 135],
    "aliases": ["天生三桥"],
    "city": "重庆"
  },
  {
    "name": "大足石刻",
    "price": [100, 135],
    "aliases": [],
    "city": "重庆"
  },
  {
    "name": "金佛山",
    "price": [90, 90],
    "aliases": [],
    "city": "重庆"
  },
  {
    "name": "磁器口",
    "price": [0, 0],
    "aliases": [],
    "city": "重庆"
  },
  {
    "name": "白帝城",
    "price": [60, 100],
    "aliases": [],
    "city": "重庆"
  },
  {
    "name": "仙女山",
    "price": [50, 60],
    "aliases": [],
    "city": "重庆"
  },
  {
    "name": "西湖",
    "price": [0, 0],
    "aliases": [],
    "city": "杭州"
  },
  {
    "name": "灵隐寺",
    "price": [45, 75],
    "aliases": [],
    "city": "杭州"
  },
  {
    "name": "千岛湖",
    "price": [130, 150],
    "aliases": [],
    "city": "杭州"
  },
  {
    "name": "宋城",
    "price": [300, 320],
    "aliases": [],
    "city": "杭州"
  },
  {
    "name": "西溪湿地",
    "price": [80, 140],
    "aliases": [],
    "city": "杭州"
  },
  {
    "name": "雷峰塔",
    "price": [40, 40],
    "aliases": [],
    "city": "杭州"
  },
  {
    "name": "六和塔",
    "price": [20, 30],
    "aliases": [],
    "city": "杭州"
  },
  {
    "name": "良渚古城",
    "price": [60, 80],
    "aliases": [],
    "city": "杭州"
  },
  {
    "name": "拙政园",
    "price": [80, 90],
    "aliases": [],
    "city": "苏州"
  },
  {
    "name": "狮子林",
    "price": [40, 40],
    "aliases": [],
    "city": "苏州"
  },
  {
    "name": "周庄",
    "price": [100, 100],
    "aliases": [],
    "city": "苏州"
  },
  {
    "name": "同里古镇",
    "price": [80, 100],
    "aliases": [],
    "city": "苏州"
  },
  {
    "name": "虎丘",
    "price": [70, 80],
    "aliases": [],
    "city": "苏州"
  },
  {
    "name": "寒山寺",
    "price": [20, 20],
    "aliases": [],
    "city": "苏州"
  },
  {
    "name": "留园",
    "price": [45, 55],
    "aliases": [],
    "city": "苏州"
  },
  {
    "name": "金鸡湖",
    "price": [0, 0],
    "aliases": [],
    "city": "苏州"
  },
  {
    "name": "中山陵",
    "price": [0, 0],
    "aliases": [],
    "city": "南京"
  },
  {
    "name": "夫子庙",
    "price": [30, 50],
    "aliases": [],
    "city": "南京"
  },
  {
    "name": "明孝陵",
    "price": [70, 70],
    "aliases": [],
    "city": "南京"
  },
  {
    "name": "总统府",
    "price": [35, 40],
    "aliases": [],
    "city": "南京"
  },
  {
    "name": "南京博物院",
    "price": [0, 0],
    "aliases": [],
    "city": "南京"
  },
  {
    "name": "牛首山",
    "price": [98, 160],
    "aliases": [],
    "city": "南京"
  },
  {
    "name": "玄武湖",
    "price": [0, 0],
    "aliases": [],
    "city": "南京"
  },
  {
    "name": "栖霞山",
    "price": [25, 40],
    "aliases": [],
    "city": "南京"
  },
  {
    "name": "秦始皇兵马俑",
    "price": [120, 120],
    "aliases": ["兵马俑"],
    "city": "西安"
  },
  {
    "name": "华清宫",
    "price": [120, 150],
    "aliases": ["华清池"],
    "city": "西安"
  },
  {
    "name": "大雁塔",
    "price": [40, 50],
    "aliases": [],
    "city": "西安"
  },
  {
    "name": "小雁塔",
    "price": [0, 30],
    "aliases": [],
    "city": "西安"
  },
  {
    "name": "西安城墙",
    "price": [54, 60],
    "aliases": ["古城墙"],
    "city": "西安"
  },
  {
    "name": "陕西历史博物馆",
    "price": [30, 300],
    "aliases": ["陕博"],
    "city": "西安"
  },
  {
    "name": "大唐芙蓉园",
    "price": [120, 120],
    "aliases": [],
    "city": "西安"
  },
  {
    "name": "法门寺",
    "price": [100, 120],
    "aliases": [],
    "city": "西安"
  },
  {
    "name": "华山",
    "price": [160, 200],
    "aliases": [],
    "city": "西安"
  },
  {
    "name": "壶口瀑布",
    "price": [90, 100],
    "aliases": [],
    "city": "西安"
  },
  {
    "name": "钟鼓楼",
    "price": [35, 50],
    "aliases": [],
    "city": "西安"
  },
  {
    "name": "龙门石窟",
    "price": [90, 120],
    "aliases": [],
    "city": "洛阳"
  },
  {
    "name": "白马寺",
    "price": [35, 50],
    "aliases": [],
    "city": "洛阳"
  },
  {
    "name": "老君山",
    "price": [100, 100],
    "aliases": [],
    "city": "洛阳"
  },
  {
    "name": "洛阳博物馆",
    "price": [0, 0],
    "aliases": [],
    "city": "洛阳"
  },
  {
    "name": "关林庙",
    "price": [40, 40],
    "aliases": [],
    "city": "洛阳"
  },
  {
    "name": "黄鹤楼",
    "price": [70, 70],
    "aliases": [],
    "city": "武汉"
  },
  {
    "name": "东湖",
    "price": [0, 0],
    "aliases": [],
    "city": "武汉"
  },
  {
    "name": "湖北省博物馆",
    "price": [0, 0],
    "aliases": [],
    "city": "武汉"
  },
  {
    "name": "武汉大学",
    "price": [0, 0],
    "aliases": [],
    "city": "武汉"
  },
  {
    "name": "户部巷",
    "price": [0, 0],
    "aliases": [],
    "city": "武汉"
  },
  {
    "name": "木兰天池",
    "price": [70, 80],
    "aliases": [],
    "city": "武汉"
  },
  {
    "name": "岳麓山",
    "price": [0, 0],
    "aliases": [],
    "city": "长沙"
  },
  {
    "name": "橘子洲",
    "price": [0, 0],
    "aliases": [],
    "city": "长沙"
  },
  {
    "name": "湖南省博物馆",
    "price": [0, 0],
    "aliases": ["湘博"],
    "city": "长沙"
  },
  {
    "name": "岳麓书院",
    "price": [40, 50],
    "aliases": [],
    "city": "长沙"
  },
  {
    "name": "长沙世界之窗",
    "price": [200, 200],
    "aliases": [],
    "city": "长沙"
  },
  {
    "name": "太平街",
    "price": [0, 0],
    "aliases": [],
    "city": "长沙"
  },
  {
    "name": "鼓浪屿",
    "price": [35, 90],
    "aliases": [],
    "city": "厦门"
  },
  {
    "name": "南普陀寺",
    "price": [0, 0],
    "aliases": [],
    "city": "厦门"
  },
  {
    "name": "厦门大学",
    "price": [0, 0],
    "aliases": [],
    "city": "厦门"
  },
  {
    "name": "环岛路",
    "price": [0, 0],
    "aliases": [],
    "city": "厦门"
  },
  {
    "name": "厦门植物园",
    "price": [30, 40],
    "aliases": [],
    "city": "厦门"
  },
  {
    "name": "方特梦幻王国",
    "price": [220, 280],
    "aliases": [],
    "city": "厦门"
  },
  {
    "name": "石林",
    "price": [130, 175],
    "aliases": [],
    "city": "昆明"
  },
  {
    "name": "滇池",
    "price": [0, 0],
    "aliases": [],
    "city": "昆明"
  },
  {
    "name": "云南民族村",
    "price": [90, 90],
    "aliases": [],
    "city": "昆明"
  },
  {
    "name": "西山龙门",
    "price": [40, 40],
    "aliases": [],
    "city": "昆明"
  },
  {
    "name": "九乡溶洞",
    "price": [90, 90],
    "aliases": [],
    "city": "昆明"
  },
  {
    "name": "洱海",
    "price": [0, 0],
    "aliases": [],
    "city": "大理"
  },
  {
    "name": "崇圣寺三塔",
    "price": [75, 121],
    "aliases": ["三塔"],
    "city": "大理"
  },
  {
    "name": "大理古城",
    "price": [0, 0],
    "aliases": [],
    "city": "大理"
  },
  {
    "name": "苍山",
    "price": [35, 110],
    "aliases": [],
    "city": "大理"
  },
  {
    "name": "双廊",
    "price": [0, 0],
    "aliases": [],
    "city": "大理"
  },
  {
    "name": "玉龙雪山",
    "price": [100, 130],
    "aliases": [],
    "city": "丽江"
  },
  {
    "name": "丽江古城",
    "price": [0, 50],
    "aliases": [],
    "city": "丽江"
  },
  {
    "name": "蓝月谷",
    "price": [0, 0],
    "aliases": [],
    "city": "丽江"
  },
  {
    "name": "泸沽湖",
    "price": [70, 100],
    "aliases": [],
    "city": "丽江"
  },
  {
    "name": "束河古镇",
    "price": [0, 0],
    "aliases": [],
    "city": "丽江"
  },
  {
    "name": "拉市海",
    "price": [30, 50],
    "aliases": [],
    "city": "丽江"
  },
  {
    "name": "漓江",
    "price": [98, 210],
    "aliases": [],
    "city": "桂林"
  },
  {
    "name": "象鼻山",
    "price": [70, 75],
    "aliases": ["象山"],
    "city": "桂林"
  },
  {
    "name": "两江四湖",
    "price": [180, 210],
    "aliases": [],
    "city": "桂林"
  },
  {
    "name": "阳朔西街",
    "price": [0, 0],
    "aliases": [],
    "city": "桂林"
  },
  {
    "name": "遇龙河",
    "price": [80, 150],
    "aliases": [],
    "city": "桂林"
  },
  {
    "name": "银子岩",
    "price": [70, 80],
    "aliases": [],
    "city": "桂林"
  },
  {
    "name": "龙脊梯田",
    "price": [80, 100],
    "aliases": [],
    "city": "桂林"
  },
  {
    "name": "亚龙湾",
    "price": [0, 0],
    "aliases": [],
    "city": "三亚"
  },
  {
    "name": "天涯海角",
    "price": [68, 81],
    "aliases": [],
    "city": "三亚"
  },
  {
    "name": "蜈支洲岛",
    "price": [140, 168],
    "aliases": [],
    "city": "三亚"
  },
  {
    "name": "南山文化旅游区",
    "price": [108, 145],
    "aliases": ["南山寺"],
    "city": "三亚"
  },
  {
    "name": "大小洞天",
    "price": [75, 90],
    "aliases": [],
    "city": "三亚"
  },
  {
    "name": "亚特兰蒂斯水世界",
    "price": [298, 358],
    "aliases": [],
    "city": "三亚"
  },
  {
    "name": "亚龙湾热带天堂",
    "price": [120, 150],
    "aliases": [],
    "city": "三亚"
  },
  {
    "name": "崂山",
    "price": [90, 130],
    "aliases": [],
    "city": "青岛"
  },
  {
    "name": "栈桥",
    "price": [0, 0],
    "aliases": [],
    "city": "青岛"
  },
  {
    "name": "八大关",
    "price": [0, 0],
    "aliases": [],
    "city": "青岛"
  },
  {
    "name": "青岛海底世界",
    "price": [130, 170],
    "aliases": [],
    "city": "青岛"
  },
  {
    "name": "青岛极地海洋世界",
    "price": [150, 260],
    "aliases": [],
    "city": "青岛"
  },
  {
    "name": "小鱼山公园",
    "price": [10, 10],
    "aliases": [],
    "city": "青岛"
  },
  {
    "name": "冰雪大世界",
    "price": [150, 330],
    "aliases": ["冰雕"],
    "city": "哈尔滨"
  },
  {
    "name": "太阳岛",
    "price": [30, 80],
    "aliases": [],
    "city": "哈尔滨"
  },
  {
    "name": "圣索菲亚教堂",
    "price": [20, 20],
    "aliases": [],
    "city": "哈尔滨"
  },
  {
    "name": "中央大街",
    "price": [0, 0],
    "aliases": [],
    "city": "哈尔滨"
  },
  {
    "name": "哈尔滨极地馆",
    "price": [160, 190],
    "aliases": [],
    "city": "哈尔滨"
  },
  {
    "name": "东北虎林园",
    "price": [90, 110],
    "aliases": [],
    "city": "哈尔滨"
  },
  {
    "name": "天山天池",
    "price": [95, 155],
    "aliases": [],
    "city": "乌鲁木齐"
  },
  {
    "name": "喀纳斯",
    "price": [160, 230],
    "aliases": [],
    "city": "布尔津"
  },
  {
    "name": "火焰山",
    "price": [40, 40],
    "aliases": [],
    "city": "吐鲁番"
  },
  {
    "name": "葡萄沟",
    "price": [60, 75],
    "aliases": [],
    "city": "吐鲁番"
  },
  {
    "name": "那拉提草原",
    "price": [95, 130],
    "aliases": [],
    "city": "新源"
  },
  {
    "name": "赛里木湖",
    "price": [70, 145],
    "aliases": [],
    "city": "博乐"
  },
  {
    "name": "可可托海",
    "price": [90, 120],
    "aliases": [],
    "city": "富蕴"
  },
  {
    "name": "巴音布鲁克",
    "price": [65, 90],
    "aliases": [],
    "city": "和静"
  },
  {
    "name": "布达拉宫",
    "price": [100, 200],
    "aliases": [],
    "city": "拉萨"
  },
  {
    "name": "大昭寺",
    "price": [85, 85],
    "aliases": [],
    "city": "拉萨"
  },
  {
    "name": "纳木错",
    "price": [120, 120],
    "aliases": [],
    "city": "拉萨"
  },
  {
    "name": "羊卓雍措",
    "price": [60, 60],
    "aliases": ["羊湖"],
    "city": "拉萨"
  },
  {
    "name": "扎什伦布寺",
    "price": [55, 80],
    "aliases": [],
    "city": "日喀则"
  },
  {
    "name": "雅鲁藏布大峡谷",
    "price": [150, 270],
    "aliases": [],
    "city": "林芝"
  },
  {
    "name": "巴松措",
    "price": [120, 165],
    "aliases": [],
    "city": "林芝"
  },
  {
    "name": "莫高窟",
    "price": [238, 258],
    "aliases": ["敦煌石窟"],
    "city": "敦煌"
  },
  {
    "name": "鸣沙山月牙泉",
    "price": [110, 120],
    "aliases": ["鸣沙山", "月牙泉"],
    "city": "敦煌"
  },
  {
    "name": "嘉峪关",
    "price": [110, 110],
    "aliases": [],
    "city": "嘉峪关"
  },
  {
    "name": "张掖七彩丹霞",
    "price": [54, 74],
    "aliases": ["七彩丹霞", "丹霞"],
    "city": "张掖"
  },
  {
    "name": "雅丹魔鬼城",
    "price": [50, 120],
    "aliases": [],
    "city": "敦煌"
  },
  {
    "name": "青海湖",
    "price": [90, 100],
    "aliases": [],
    "city": "西宁"
  },
  {
    "name": "茶卡盐湖",
    "price": [60, 70],
    "aliases": ["天空之镜"],
    "city": "西宁"
  },
  {
    "name": "塔尔寺",
    "price": [70, 80],
    "aliases": [],
    "city": "西宁"
  },
  {
    "name": "门源油菜花",
    "price": [0, 60],
    "aliases": [],
    "city": "西宁"
  },
  {
    "name": "沙坡头",
    "price": [80, 100],
    "aliases": [],
    "city": "中卫"
  },
  {
    "name": "西夏王陵",
    "price": [60, 75],
    "aliases": [],
    "city": "银川"
  },
  {
    "name": "沙湖",
    "price": [70, 120],
    "aliases": [],
    "city": "银川"
  },
  {
    "name": "镇北堡西部影城",
    "price": [80, 100],
    "aliases": [],
    "city": "银川"
  },
  {
    "name": "呼伦贝尔草原",
    "price": [0, 0],
    "aliases": [],
    "city": "呼伦贝尔"
  },
  {
    "name": "阿尔山国家森林公园",
    "price": [180, 220],
    "aliases": ["阿尔山"],
    "city": "兴安盟"
  },
  {
    "name": "响沙湾",
    "price": [120, 130],
    "aliases": [],
    "city": "鄂尔多斯"
  },
  {
    "name": "额济纳胡杨林",
    "price": [150, 240],
    "aliases": ["胡杨林"],
    "city": "额济纳"
  },
  {
    "name": "成吉思汗陵",
    "price": [120, 170],
    "aliases": [],
    "city": "鄂尔多斯"
  },
  {
    "name": "张家界国家森林公园",
    "price": [225, 228],
    "aliases": ["武陵源", "森林公园"],
    "city": "张家界"
  },
  {
    "name": "天门山",
    "price": [258, 278],
    "aliases": ["天门山玻璃栈道"],
    "city": "张家界"
  },
  {
    "name": "大峡谷玻璃桥",
    "price": [141, 256],
    "aliases": ["玻璃桥"],
    "city": "张家界"
  },
  {
    "name": "黄龙洞",
    "price": [100, 130],
    "aliases": [],
    "city": "张家界"
  },
  {
    "name": "宝峰湖",
    "price": [96, 110],
    "aliases": [],
    "city": "张家界"
  },
  {
    "name": "黄山风景区",
    "price": [150, 230],
    "aliases": ["黄山"],
    "city": "黄山"
  },
  {
    "name": "宏村",
    "price": [94, 104],
    "aliases": [],
    "city": "黄山"
  },
  {
    "name": "西递",
    "price": [104, 104],
    "aliases": [],
    "city": "黄山"
  },
  {
    "name": "九华山",
    "price": [160, 190],
    "aliases": [],
    "city": "池州"
  },
  {
    "name": "齐云山",
    "price": [75, 75],
    "aliases": [],
    "city": "黄山"
  },
  {
    "name": "翡翠谷",
    "price": [90, 105],
    "aliases": [],
    "city": "黄山"
  },
  {
    "name": "九寨沟",
    "price": [169, 280],
    "aliases": [],
    "city": "九寨沟"
  },
  {
    "name": "黄龙",
    "price": [170, 280],
    "aliases": [],
    "city": "松潘"
  },
  {
    "name": "峨眉山",
    "price": [160, 185],
    "aliases": [],
    "city": "峨眉山"
  },
  {
    "name": "乐山大佛",
    "price": [80, 90],
    "aliases": [],
    "city": "乐山"
  },
  {
    "name": "四姑娘山",
    "price": [60, 150],
    "aliases": [],
    "city": "小金"
  },
  {
    "name": "色达五明佛学院",
    "price": [0, 0],
    "aliases": ["色达"],
    "city": "色达"
  },
  {
    "name": "稻城亚丁",
    "price": [146, 266],
    "aliases": ["亚丁"],
    "city": "稻城"
  },
  {
    "name": "庐山",
    "price": [160, 180],
    "aliases": [],
    "city": "九江"
  },
  {
    "name": "三清山",
    "price": [120, 150],
    "aliases": [],
    "city": "上饶"
  },
  {
    "name": "龙虎山",
    "price": [120, 150],
    "aliases": [],
    "city": "鹰潭"
  },
  {
    "name": "井冈山",
    "price": [165, 190],
    "aliases": [],
    "city": "吉安"
  },
  {
    "name": "滕王阁",
    "price": [50, 50],
    "aliases": [],
    "city": "南昌"
  },
  {
    "name": "武功山",
    "price": [70, 100],
    "aliases": [],
    "city": "萍乡"
  },
  {
    "name": "泰山",
    "price": [115, 125],
    "aliases": [],
    "city": "泰安"
  },
  {
    "name": "趵突泉",
    "price": [40, 40],
    "aliases": [],
    "city": "济南"
  },
  {
    "name": "蓬莱阁",
    "price": [100, 140],
    "aliases": [],
    "city": "蓬莱"
  },
  {
    "name": "曲阜三孔",
    "price": [140, 180],
    "aliases": ["三孔", "孔庙"],
    "city": "曲阜"
  },
  {
    "name": "台儿庄古城",
    "price": [120, 160],
    "aliases": [],
    "city": "枣庄"
  },
  {
    "name": "平遥古城",
    "price": [125, 150],
    "aliases": [],
    "city": "平遥"
  },
  {
    "name": "云冈石窟",
    "price": [120, 150],
    "aliases": [],
    "city": "大同"
  },
  {
    "name": "五台山",
    "price": [135, 135],
    "aliases": [],
    "city": "五台"
  },
  {
    "name": "悬空寺",
    "price": [115, 130],
    "aliases": [],
    "city": "浑源"
  },
  {
    "name": "乔家大院",
    "price": [115, 138],
    "aliases": [],
    "city": "祁县"
  },
  {
    "name": "晋祠",
    "price": [80, 95],
    "aliases": [],
    "city": "太原"
  },
  {
    "name": "少林寺",
    "price": [80, 100],
    "aliases": [],
    "city": "登封"
  },
  {
    "name": "嵩山",
    "price": [80, 100],
    "aliases": [],
    "city": "登封"
  },
  {
    "name": "云台山",
    "price": [120, 180],
    "aliases": [],
    "city": "焦作"
  },
  {
    "name": "清明上河园",
    "price": [120, 140],
    "aliases": [],
    "city": "开封"
  },
  {
    "name": "殷墟",
    "price": [70, 90],
    "aliases": [],
    "city": "安阳"
  },
  {
    "name": "红旗渠",
    "price": [80, 100],
    "aliases": [],
    "city": "林州"
  },
  {
    "name": "天津之眼",
    "price": [70, 100],
    "aliases": ["摩天轮"],
    "city": "天津"
  },
  {
    "name": "瓷房子",
    "price": [50, 50],
    "aliases": [],
    "city": "天津"
  },
  {
    "name": "盘山",
    "price": [78, 130],
    "aliases": [],
    "city": "天津"
  },
  {
    "name": "航母主题公园",
    "price": [220, 280],
    "aliases": [],
    "city": "天津"
  },
  {
    "name": "五大道",
    "price": [0, 0],
    "aliases": [],
    "city": "天津"
  },
  {
    "name": "避暑山庄",
    "price": [90, 130],
    "aliases": [],
    "city": "承德"
  },
  {
    "name": "普陀宗乘之庙",
    "price": [80, 80],
    "aliases": ["小布达拉宫"],
    "city": "承德"
  },
  {
    "name": "外八庙",
    "price": [50, 80],
    "aliases": [],
    "city": "承德"
  },
  {
    "name": "金山岭长城",
    "price": [65, 65],
    "aliases": [],
    "city": "承德"
  },
  {
    "name": "山海关",
    "price": [40, 50],
    "aliases": [],
    "city": "秦皇岛"
  },
  {
    "name": "北戴河",
    "price": [0, 0],
    "aliases": [],
    "city": "秦皇岛"
  },
  {
    "name": "鸽子窝公园",
    "price": [25, 35],
    "aliases": [],
    "city": "秦皇岛"
  },
  {
    "name": "老龙头",
    "price": [60, 60],
    "aliases": [],
    "city": "秦皇岛"
  },
  {
    "name": "沈阳故宫",
    "price": [60, 60],
    "aliases": [],
    "city": "沈阳"
  },
  {
    "name": "张氏帅府",
    "price": [46, 50],
    "aliases": [],
    "city": "沈阳"
  },
  {
    "name": "北陵公园",
    "price": [50, 50],
    "aliases": [],
    "city": "沈阳"
  },
  {
    "name": "本溪水洞",
    "price": [135, 165],
    "aliases": [],
    "city": "本溪"
  },
  {
    "name": "千山",
    "price": [80, 80],
    "aliases": [],
    "city": "鞍山"
  },
  {
    "name": "大连老虎滩海洋公园",
    "price": [210, 240],
    "aliases": ["老虎滩"],
    "city": "大连"
  },
  {
    "name": "大连森林动物园",
    "price": [100, 120],
    "aliases": [],
    "city": "大连"
  },
  {
    "name": "长白山",
    "price": [105, 190],
    "aliases": ["长白山天池"],
    "city": "延边"
  },
  {
    "name": "净月潭",
    "price": [30, 50],
    "aliases": [],
    "city": "长春"
  },
  {
    "name": "伪满皇宫",
    "price": [70, 90],
    "aliases": [],
    "city": "长春"
  },
  {
    "name": "雾凇岛",
    "price": [30, 60],
    "aliases": [],
    "city": "吉林"
  },
  {
    "name": "黄果树瀑布",
    "price": [160, 180],
    "aliases": ["黄果树"],
    "city": "安顺"
  },
  {
    "name": "荔波小七孔",
    "price": [110, 130],
    "aliases": ["小七孔"],
    "city": "黔南"
  },
  {
    "name": "西江千户苗寨",
    "price": [90, 110],
    "aliases": ["千户苗寨"],
    "city": "黔东南"
  },
  {
    "name": "镇远古镇",
    "price": [0, 60],
    "aliases": [],
    "city": "黔东南"
  },
  {
    "name": "梵净山",
    "price": [100, 130],
    "aliases": [],
    "city": "铜仁"
  },
  {
    "name": "青岩古镇",
    "price": [10, 10],
    "aliases": [],
    "city": "贵阳"
  },
  {
    "name": "万峰林",
    "price": [70, 90],
    "aliases": [],
    "city": "兴义"
  },
  {
    "name": "织金洞",
    "price": [120, 140],
    "aliases": [],
    "city": "毕节"
  },
  {
    "name": "德天瀑布",
    "price": [80, 115],
    "aliases": ["德天跨国瀑布"],
    "city": "崇左"
  },
  {
    "name": "涠洲岛",
    "price": [98, 150],
    "aliases": [],
    "city": "北海"
  },
  {
    "name": "通灵大峡谷",
    "price": [115, 115],
    "aliases": [],
    "city": "靖西"
  },
  {
    "name": "黄姚古镇",
    "price": [100, 100],
    "aliases": [],
    "city": "贺州"
  },
  {
    "name": "银滩",
    "price": [0, 0],
    "aliases": [],
    "city": "北海"
  },
  {
    "name": "火山口公园",
    "price": [50, 60],
    "aliases": [],
    "city": "海口"
  },
  {
    "name": "观澜湖温泉",
    "price": [168, 258],
    "aliases": [],
    "city": "海口"
  },
  {
    "name": "东寨港红树林",
    "price": [30, 50],
    "aliases": [],
    "city": "海口"
  },
  {
    "name": "台北故宫博物院",
    "price": [250, 350],
    "aliases": ["台北故宫"],
    "city": "台北"
  },
  {
    "name": "台北101大楼",
    "price": [300, 600],
    "aliases": [],
    "city": "台北"
  },
  {
    "name": "九份",
    "price": [0, 0],
    "aliases": [],
    "city": "台北"
  },
  {
    "name": "阳明山",
    "price": [0, 100],
    "aliases": [],
    "city": "台北"
  },
  {
    "name": "士林夜市",
    "price": [0, 0],
    "aliases": [],
    "city": "台北"
  },
  {
    "name": "香港迪士尼",
    "price": [639, 939],
    "aliases": [],
    "city": "香港"
  },
  {
    "name": "海洋公园",
    "price": [498, 520],
    "aliases": [],
    "city": "香港"
  },
  {
    "name": "太平山顶",
    "price": [75, 88],
    "aliases": [],
    "city": "香港"
  },
  {
    "name": "天星小轮",
    "price": [4, 6],
    "aliases": [],
    "city": "香港"
  },
  {
    "name": "维多利亚港",
    "price": [0, 0],
    "aliases": ["维港"],
    "city": "香港"
  },
  {
    "name": "香港科学馆",
    "price": [20, 30],
    "aliases": [],
    "city": "香港"
  },
  {
    "name": "大三巴牌坊",
    "price": [0, 0],
    "aliases": [],
    "city": "澳门"
  },
  {
    "name": "澳门塔",
    "price": [165, 185],
    "aliases": [],
    "city": "澳门"
  },
  {
    "name": "威尼斯人",
    "price": [0, 0],
    "aliases": [],
    "city": "澳门"
  },
  {
    "name": "妈阁庙",
    "price": [0, 0],
    "aliases": [],
    "city": "澳门"
  },
  {
    "name": "路环岛",
    "price": [0, 0],
    "aliases": [],
    "city": "澳门"
  },
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
