// 内置地区数据 - 两级联动选择器
// 中国: 省份 → 城市 | 全球: 热门国家 → 城市
// 数据完全内置，不依赖后端，部署到静态托管也可用

export interface ChinaRegion {
  province: string;
  cities: string[];
}

export interface HotCountry {
  country: string;
  flag: string;
  cities: string[];
}

export const CHINA_REGIONS: ChinaRegion[] = [
  { province: '北京', cities: ['北京市'] },
  { province: '天津', cities: ['天津市'] },
  { province: '上海', cities: ['上海市'] },
  { province: '重庆', cities: ['重庆市'] },
  { province: '香港', cities: ['香港'] },
  { province: '澳门', cities: ['澳门'] },
  { province: '台湾', cities: ['台北', '高雄', '台中'] },
  { province: '广东', cities: ['广州', '深圳', '珠海', '佛山', '东莞', '中山', '惠州', '汕头'] },
  { province: '江苏', cities: ['南京', '苏州', '无锡', '常州', '扬州', '南通', '徐州'] },
  { province: '浙江', cities: ['杭州', '宁波', '温州', '绍兴', '嘉兴', '金华', '湖州'] },
  { province: '山东', cities: ['济南', '青岛', '烟台', '威海', '潍坊', '泰安', '日照'] },
  { province: '四川', cities: ['成都', '绵阳', '乐山', '宜宾', '泸州', '都江堰'] },
  { province: '湖北', cities: ['武汉', '宜昌', '襄阳', '荆州', '黄冈'] },
  { province: '湖南', cities: ['长沙', '株洲', '湘潭', '岳阳', '张家界', '衡阳'] },
  { province: '福建', cities: ['福州', '厦门', '泉州', '漳州', '莆田'] },
  { province: '河南', cities: ['郑州', '洛阳', '开封', '安阳', '南阳'] },
  { province: '河北', cities: ['石家庄', '唐山', '秦皇岛', '保定', '邯郸'] },
  { province: '安徽', cities: ['合肥', '芜湖', '黄山', '安庆', '蚌埠'] },
  { province: '江西', cities: ['南昌', '九江', '赣州', '景德镇', '上饶'] },
  { province: '陕西', cities: ['西安', '咸阳', '宝鸡', '延安', '汉中'] },
  { province: '广西', cities: ['南宁', '桂林', '柳州', '北海', '梧州'] },
  { province: '海南', cities: ['海口', '三亚', '万宁', '文昌'] },
  { province: '云南', cities: ['昆明', '大理', '丽江', '西双版纳', '香格里拉', '玉溪'] },
  { province: '贵州', cities: ['贵阳', '遵义', '安顺', '黔东南', '凯里'] },
  { province: '辽宁', cities: ['沈阳', '大连', '鞍山', '锦州', '丹东'] },
  { province: '吉林', cities: ['长春', '吉林市', '延边', '松原'] },
  { province: '黑龙江', cities: ['哈尔滨', '齐齐哈尔', '大庆', '牡丹江'] },
  { province: '山西', cities: ['太原', '大同', '临汾', '运城'] },
  { province: '内蒙古', cities: ['呼和浩特', '包头', '鄂尔多斯', '呼伦贝尔', '赤峰'] },
  { province: '甘肃', cities: ['兰州', '敦煌', '天水', '张掖', '酒泉'] },
  { province: '新疆', cities: ['乌鲁木齐', '喀什', '吐鲁番', '伊犁', '阿勒泰'] },
  { province: '宁夏', cities: ['银川', '中卫', '吴忠'] },
  { province: '青海', cities: ['西宁', '格尔木', '玉树'] },
  { province: '西藏', cities: ['拉萨', '日喀则', '林芝'] },
];

export const HOT_COUNTRIES: HotCountry[] = [
  { country: '日本', flag: '🇯🇵', cities: ['东京', '大阪', '京都', '奈良', '札幌', '冲绳', '福冈'] },
  { country: '泰国', flag: '🇹🇭', cities: ['曼谷', '清迈', '普吉岛', '芭堤雅', '甲米'] },
  { country: '韩国', flag: '🇰🇷', cities: ['首尔', '釜山', '济州岛', '仁川'] },
  { country: '新加坡', flag: '🇸🇬', cities: ['新加坡'] },
  { country: '马来西亚', flag: '🇲🇾', cities: ['吉隆坡', '槟城', '沙巴', '兰卡威', '马六甲'] },
  { country: '越南', flag: '🇻🇳', cities: ['胡志明市', '河内', '岘港', '芽庄', '会安'] },
  { country: '印度尼西亚', flag: '🇮🇩', cities: ['巴厘岛', '雅加达', '泗水'] },
  { country: '菲律宾', flag: '🇵🇭', cities: ['马尼拉', '宿务', '长滩岛'] },
  { country: '法国', flag: '🇫🇷', cities: ['巴黎', '尼斯', '马赛', '里昂', '波尔多'] },
  { country: '意大利', flag: '🇮🇹', cities: ['罗马', '米兰', '威尼斯', '佛罗伦萨', '那不勒斯'] },
  { country: '英国', flag: '🇬🇧', cities: ['伦敦', '爱丁堡', '曼彻斯特', '利物浦', '剑桥'] },
  { country: '德国', flag: '🇩🇪', cities: ['柏林', '慕尼黑', '法兰克福', '汉堡', '科隆'] },
  { country: '西班牙', flag: '🇪🇸', cities: ['巴塞罗那', '马德里', '塞维利亚', '瓦伦西亚'] },
  { country: '葡萄牙', flag: '🇵🇹', cities: ['里斯本', '波尔图', '法鲁'] },
  { country: '希腊', flag: '🇬🇷', cities: ['雅典', '圣托里尼', '克里特岛', '米科诺斯'] },
  { country: '瑞士', flag: '🇨🇭', cities: ['苏黎世', '日内瓦', '因特拉肯', '卢塞恩'] },
  { country: '荷兰', flag: '🇳🇱', cities: ['阿姆斯特丹', '鹿特丹', '海牙'] },
  { country: '美国', flag: '🇺🇸', cities: ['纽约', '洛杉矶', '旧金山', '拉斯维加斯', '西雅图', '芝加哥', '夏威夷'] },
  { country: '加拿大', flag: '🇨🇦', cities: ['温哥华', '多伦多', '蒙特利尔', '班夫'] },
  { country: '澳大利亚', flag: '🇦🇺', cities: ['悉尼', '墨尔本', '黄金海岸', '珀斯', '凯恩斯'] },
  { country: '新西兰', flag: '🇳🇿', cities: ['奥克兰', '皇后镇', '基督城', '惠灵顿'] },
  { country: '阿联酋', flag: '🇦🇪', cities: ['迪拜', '阿布扎比'] },
  { country: '土耳其', flag: '🇹🇷', cities: ['伊斯坦布尔', '卡帕多西亚', '安塔利亚', '费特希耶'] },
  { country: '埃及', flag: '🇪🇬', cities: ['开罗', '卢克索', '红海', '亚历山大'] },
];
