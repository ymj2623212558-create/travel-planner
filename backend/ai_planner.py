"""
AI 行程生成模块 - 调用 OpenAI 兼容接口（Dogrouter / DeepSeek）
- 优先使用用户前端传入的 Key (X-API-Key)
- 无用户 Key 时使用后端共享 Key（免费 8 次额度）
"""
import os
import json
import httpx
from pathlib import Path
from typing import Optional, List

# 读取后端共享配置（backend/.env）
def _load_env_file() -> dict:
    """读取 .env 文件，返回 {KEY: VALUE}"""
    env: dict = {}
    env_path = Path(__file__).parent / ".env"
    if env_path.exists():
        try:
            for line in env_path.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    env[k.strip().upper()] = v.strip().strip('"').strip("'")
        except Exception:
            pass
    return env

_ENV = _load_env_file()

def _load_shared_key() -> str:
    return _ENV.get("API_KEY", "") or os.environ.get("API_KEY", "")

SHARED_API_KEY = _load_shared_key()
SHARED_API_BASE = _ENV.get("API_BASE", "") or os.environ.get("API_BASE", "https://api.dogrouter.ai/v1")
SHARED_MODEL = _ENV.get("API_MODEL", "") or os.environ.get("API_MODEL", "deepseek-v4-flash")
# 模型回退链（仅 deepseek + qwen，共 3 个；主模型失败时依次尝试）
MODEL_FALLBACK_CHAIN = ["deepseek-v4-flash", "qwen3.5-flash", "qwen3.5-plus"]

# 免费次数限制（本地统计文件，重启后重置）
# 开关：ENABLE_QUOTA=true 时启用限制；默认 false = 不限制（当前阶段放开）
FREE_QUOTA = 8
ENABLE_QUOTA = _ENV.get("ENABLE_QUOTA", "").lower() == "true"
QUOTA_FILE = Path(__file__).parent / ".quota.json"

def _load_quota() -> int:
    try:
        if QUOTA_FILE.exists():
            return int(json.loads(QUOTA_FILE.read_text(encoding="utf-8")).get("count", 0))
    except Exception:
        pass
    return 0

def _save_quota(count: int) -> None:
    try:
        QUOTA_FILE.write_text(json.dumps({"count": count}), encoding="utf-8")
    except Exception:
        pass

def get_free_quota_left() -> int:
    """返回剩余免费次数；未启用限制时返回 -1 表示不限"""
    if not ENABLE_QUOTA:
        return -1
    return max(0, FREE_QUOTA - _load_quota())

def generate_itinerary_ai(
    start_city: str,
    end_city: str,
    days: int,
    budget_per_day: Optional[float],
    interests: List[str],
    user_api_key: Optional[str] = None,
    user_api_url: Optional[str] = None,
    user_model: Optional[str] = None,
    plan_type: str = "standard",
    travel_style: str = "",
) -> dict:
    """
    调用 AI 生成行程，返回结构化 JSON。
    优先用户 Key；无用户 Key 时用共享 Key（消耗免费额度）。
    plan_type: 'economy' 经济 / 'standard' 标准 / 'luxury' 豪华
    travel_style: 情景模式（亲子游/情侣游/穷游/带老人等）
    """
    # 决定用哪个 Key
    use_shared = not user_api_key
    if use_shared:
        if not SHARED_API_KEY:
            raise RuntimeError("NO_KEY: 后端未配置共享 API Key，请在齿轮设置中填写自己的 Key")
        if ENABLE_QUOTA:
            quota_left = get_free_quota_left()
            if quota_left <= 0:
                raise RuntimeError("QUOTA_EXCEEDED: 免费次数已用完，请在齿轮设置中填写自己的 API Key")

    api_key = user_api_key or SHARED_API_KEY
    api_base = (user_api_url or SHARED_API_BASE).rstrip("/")
    model = user_model or SHARED_MODEL

    # 构建 prompt
    interest_labels = {
        "history": "历史文化", "nature": "自然风光", "food": "美食",
        "shopping": "购物", "culture": "人文体验", "adventure": "冒险运动",
    }
    interests_text = "、".join(interest_labels.get(i, i) for i in interests) or "全面体验"
    budget_text = "无限制" if not budget_per_day else f"{budget_per_day} 元"
    plan_text = {
        "economy": "经济型：省钱优先，经济酒店/青旅、公共交通、平价餐厅",
        "standard": "标准型：性价比优先，舒适酒店、合理交通、本地特色餐厅",
        "luxury": "豪华型：体验优先，高端酒店、专车/头等舱、高档餐厅",
    }.get(plan_type, "标准型：性价比优先，舒适酒店、合理交通、本地特色餐厅")

    style_text = ""
    if travel_style:
        style_map = {
            "family": "亲子游：安排孩子喜欢的景点、节奏放缓",
            "couple": "情侣游：安排浪漫景点、夜景体验",
            "budget": "穷游：极致省钱、免费景点优先",
            "elderly": "带老人：节奏轻松、少爬山、多休息",
        }
        style_text = "、" + style_map.get(travel_style, travel_style)

    json_example = """{"daily_plans":[{"day":1,"theme":"当天主题","activities":[{"name":"景点名","type":"attraction","category":"类别","time":"09:00","duration_hours":2,"estimated_cost":100,"rating":4.5,"description":"一句话简介"}],"total_cost":350,"notes":"小贴士"}],"total_estimated_cost":1200,"cost_breakdown":{"交通":300,"住宿":400,"餐饮":250,"门票":150}}"""

    # 注意：不再注入 city_hints（景点列表会让 deepseek 推理变长导致 Dogrouter 504）
    # 官方价匹配由 AI 自然生成知名景点后自动命中
    city_hint_text = ""

    prompt = f"""你是资深旅行规划师。为以下行程输出严格 JSON（只输出 JSON 本身）：

{json_example}

起点：{start_city} | 终点：{end_city} | 天数：{days} 天 | 每日预算：{budget_text} | 兴趣：{interests_text} | 方案：{plan_text}{style_text}
{city_hint_text}

要求：
1. 每天安排 6 个活动，从早上 8:00 到晚上 22:00 填满 16 小时，按时间顺序排列
2. 活动必须包含：2 个景点（上午 8:00-12:00 和下午 13:00-17:00）、2 个餐厅（午餐 12:00、晚餐 18:00）、1 个住宿 hotel（晚上入住）、1 个晚间活动（18:00-22:00 夜景/夜市/演出等）
3. 每个活动必须带 time 字段（如 "09:00"、"12:30"），按当天时间顺序排列
4. 活动类型与兴趣强相关：{interests_text} 相关的景点/餐厅要多安排
5. 每个活动必须有 description（一句话，10-20字简介）
6. 费用人民币估算（标"参考价"），合理即可
7. 合法 JSON，不要 markdown"""

    # 调用 API（多模型回退 + 同模型重试）
    # 主模型 + 回退链去重
    candidates = [model] + [m for m in MODEL_FALLBACK_CHAIN if m != model]
    last_error = None
    success_data = None

    for attempt_model in candidates:
        # 主模型（deepseek-v4-flash 推理时长波动大）重试 3 次；其他模型 1 次
        max_retries = 3 if attempt_model == model else 1
        for retry in range(max_retries):
            try:
                resp = httpx.post(
                    f"{api_base}/chat/completions",
                    headers={"Authorization": f"Bearer {api_key}"},
                    json={
                        "model": attempt_model,
                        "messages": [
                            {"role": "system", "content": "你是旅行规划AI。直接给出结果，不要输出任何思考过程，只输出 JSON 本身。"},
                            {"role": "user", "content": prompt},
                        ],
                        "temperature": 0.6,
                        "max_tokens": 3000,
                    },
                    timeout=120,
                )
                resp.raise_for_status()
                content = resp.json()["choices"][0]["message"]["content"]

                # 解析 JSON（兼容 markdown 包裹）
                content = content.strip()
                if content.startswith("```"):
                    content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()
                data = json.loads(content)

                if not data.get("daily_plans"):
                    raise RuntimeError("AI 返回空行程")

                success_data = data
                break  # 成功跳出重试循环
            except Exception as e:
                last_error = e
                continue
        if success_data:
            break  # 成功跳出模型循环

    if not success_data:
        raise RuntimeError(f"所有模型均失败: {str(last_error)[:200]}")

    data = success_data

    # 补充 date 字段（从今天开始逐天递增）
    from datetime import date, timedelta
    today = date.today()
    for idx, plan in enumerate(data.get("daily_plans", [])):
        if not plan.get("date"):
            plan["date"] = (today + timedelta(days=idx)).isoformat()

    # 匹配官方门票参考价（方案 A）：attraction 类活动用库内官方价覆盖 AI 估算
    from ticket_prices import find_ticket_price
    ticket_matched = 0
    for plan in data.get("daily_plans", []):
        for act in plan.get("activities", []):
            if act.get("type") == "attraction" and act.get("name"):
                ticket = find_ticket_price(act["name"])
                if ticket:
                    p_min, p_max = ticket["price"]
                    # 用区间中值作为参考价
                    avg = (p_min + p_max) / 2
                    act["estimated_cost"] = round(avg)
                    act["ticket_price_range"] = f"{p_min}-{p_max}"
                    act["price_source"] = "official"
                    ticket_matched += 1

    # 为活动补充经纬度（Open-Meteo geocoding，免费无 Key）——用于行程地图
    try:
        _add_coordinates(data, start_city, end_city)
    except Exception as e:
        import traceback
        traceback.print_exc()  # 坐标失败不影响行程，但记录日志
        print(f"[coords] 坐标补充失败: {str(e)[:100]}")

    data["ticket_matched"] = ticket_matched

    # 消费免费额度（仅启用限制时计数）
    if use_shared and ENABLE_QUOTA:
        _save_quota(_load_quota() + 1)

    return {
        "journey_id": f"trip_{abs(hash(f'{start_city}{end_city}{days}')) % 100000}",
        "start_city": start_city,
        "end_city": end_city,
        "days": days,
                "daily_plans": data.get("daily_plans", []),
                "total_estimated_cost": data.get("total_estimated_cost", 0),
                "cost_breakdown": data.get("cost_breakdown", {}),
                "ticket_matched": data.get("ticket_matched", 0),
                "source": "ai",
            }


def get_activity_details_ai(
    activities: list,
    user_api_key: Optional[str] = None,
    user_api_url: Optional[str] = None,
    user_model: Optional[str] = None,
) -> dict:
    """
    为活动列表补充详细描述（tips/why 等），按需调用（输出小，稳定）。
    返回 { 活动名: {tips, why} }
    """
    api_key = user_api_key or SHARED_API_KEY
    api_base = (user_api_url or SHARED_API_BASE).rstrip("/")
    model = user_model or SHARED_MODEL

    import json as _json
    names_json = _json.dumps([{"name": a.get("name", ""), "type": a.get("type", ""), "category": a.get("category", "")} for a in activities if a.get("name")], ensure_ascii=False)

    prompt = f"""你是资深旅行规划师。请为以下旅行活动补充游玩建议和推荐理由，输出严格 JSON。

活动列表：
{names_json}

输出格式（只输出 JSON，不要 markdown）：
{{"活动名": {{"tips": "游玩建议或注意事项，10-25字", "why": "推荐理由，5-20字"}}}}

要求：
1. 每个活动都要有 tips 和 why
2. 内容具体实用，不要空话
3. 合法 JSON"""

    candidates = [model] + [m for m in MODEL_FALLBACK_CHAIN if m != model]
    last_error = None

    for attempt_model in candidates:
        try:
            resp = httpx.post(
                f"{api_base}/chat/completions",
                headers={"Authorization": f"Bearer {api_key}"},
                json={
                    "model": attempt_model,
                    "messages": [
                        {"role": "system", "content": "你是一个输出严格 JSON 的旅行规划 AI，只输出 JSON 本身。"},
                        {"role": "user", "content": prompt},
                    ],
                    "temperature": 0.5,
                    "max_tokens": 1500,
                },
                timeout=90,
            )
            resp.raise_for_status()
            content = resp.json()["choices"][0]["message"]["content"]

            # 解析 JSON（兼容 markdown 包裹）
            content = content.strip()
            if content.startswith("```"):
                content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()
            data = _json.loads(content)
            if not isinstance(data, dict):
                raise RuntimeError("返回格式错误")
            return data
        except Exception as e:
            last_error = e
            continue

    raise RuntimeError(f"所有模型均失败: {str(last_error)[:200]}")


def modify_itinerary_ai(
    itinerary: dict,
    request_text: str,
    start_city: str,
    end_city: str,
    user_api_key: Optional[str] = None,
    user_api_url: Optional[str] = None,
    user_model: Optional[str] = None,
) -> dict:
    """
    根据用户需求修改已有行程，返回修改后的完整行程 JSON。
    """
    api_key = user_api_key or SHARED_API_KEY
    api_base = (user_api_url or SHARED_API_BASE).rstrip("/")
    model = user_model or SHARED_MODEL

    import json as _json
    current_json = _json.dumps(itinerary, ensure_ascii=False)

    prompt = f"""你是资深旅行规划师。用户已有一份行程，请根据修改需求调整后，输出修改后的完整行程 JSON（只输出 JSON 本身）。

当前行程：
{current_json}

用户修改需求：{request_text}

要求：
1. 保持 JSON 结构与原行程一致（daily_plans 数组，每项含 day/theme/date/activities/total_cost/notes，activities 每项含 name/type/category/time/duration_hours/estimated_cost/rating/description/tips/why）
2. 只修改用户要求的活动/天数/安排，其他保持原样
3. 每天 6 个活动，保持 08:00-22:00 时间线
4. 修改后重新计算每天的 total_cost 和总 total_estimated_cost，cost_breakdown 相应更新
5. 合法 JSON，不要 markdown"""

    json_example = """{"daily_plans":[],"total_estimated_cost":0,"cost_breakdown":{}}"""

    candidates = [model] + [m for m in MODEL_FALLBACK_CHAIN if m != model]
    last_error = None

    for attempt_model in candidates:
        try:
            resp = httpx.post(
                f"{api_base}/chat/completions",
                headers={"Authorization": f"Bearer {api_key}"},
                json={
                    "model": attempt_model,
                    "messages": [
                        {"role": "system", "content": "你是一个输出严格 JSON 的旅行规划 AI，只输出 JSON 本身。"},
                        {"role": "user", "content": prompt},
                    ],
                    "temperature": 0.5,
                    "max_tokens": 5000,
                },
                timeout=180,
            )
            resp.raise_for_status()
            content = resp.json()["choices"][0]["message"]["content"]

            # 解析 JSON（兼容 markdown 包裹）
            content = content.strip()
            if content.startswith("```"):
                content = content.split("\n", 1)[1].rsplit("```", 1)[0].strip()
            data = _json.loads(content)

            if not data.get("daily_plans"):
                raise RuntimeError("AI 返回空行程")

            # 补充 date 字段
            from datetime import date, timedelta
            today = date.today()
            for idx, plan in enumerate(data.get("daily_plans", [])):
                if not plan.get("date"):
                    plan["date"] = (today + timedelta(days=idx)).isoformat()

            # 同样匹配官方门票价
            from ticket_prices import find_ticket_price
            ticket_matched = 0
            for plan in data.get("daily_plans", []):
                for act in plan.get("activities", []):
                    if act.get("type") == "attraction" and act.get("name"):
                        ticket = find_ticket_price(act["name"])
                        if ticket:
                            p_min, p_max = ticket["price"]
                            act["estimated_cost"] = round((p_min + p_max) / 2)
                            act["ticket_price_range"] = f"{p_min}-{p_max}"
                            act["price_source"] = "official"
                            ticket_matched += 1
            data["ticket_matched"] = ticket_matched

            return {
                "journey_id": f"trip_{abs(hash(f'{start_city}{end_city}{request_text}')) % 100000}",
                "start_city": start_city,
                "end_city": end_city,
                "days": data.get("days", len(data.get("daily_plans", []))),
                "daily_plans": data.get("daily_plans", []),
                "total_estimated_cost": data.get("total_estimated_cost", 0),
                "cost_breakdown": data.get("cost_breakdown", {}),
                "ticket_matched": ticket_matched,
                "source": "ai_modified",
            }
        except Exception as e:
            last_error = e
            continue

    raise RuntimeError(f"所有模型均失败: {str(last_error)[:200]}")


def _add_coordinates(data: dict, start_city: str, end_city: str):
    """
    为行程中的活动补充经纬度坐标（Open-Meteo geocoding，免费无 Key）。
    Open-Meteo 只支持城市级查询（景点名查不到），故：
    - 每天用终点城市坐标作为基准
    - 活动按索引加微偏移（±0.02度 ≈ 2km），形成围绕城市的路线散点
    """
    import httpx as _httpx

    def _geocode(name: str):
        """按城市名查坐标，失败返回 None"""
        try:
            # 1. 中文名 → 英文名（国际城市，避免"东京"命中江苏）
            from city_translations import zh_to_en
            en_name = zh_to_en(name) or name
            r = _httpx.get(
                "https://geocoding-api.open-meteo.com/v1/search",
                params={"name": en_name, "count": 1, "language": "en"},
                timeout=6,
            )
            if r.status_code == 200:
                results = r.json().get("results", [])
                if results:
                    return {"lat": results[0]["latitude"], "lng": results[0]["longitude"]}
            # 2. 英文名无结果 → 中文直查（中国城市名）
            if name:
                r2 = _httpx.get(
                    "https://geocoding-api.open-meteo.com/v1/search",
                    params={"name": name, "count": 1, "language": "zh"},
                    timeout=6,
                )
                if r2.status_code == 200:
                    results = r2.json().get("results", [])
                    if results:
                        return {"lat": results[0]["latitude"], "lng": results[0]["longitude"]}
        except Exception:
            pass
        return None

    # 终点城市坐标（缓存，只查一次）
    end_key = end_city.split(",")[0].strip()
    start_key = start_city.split(",")[0].strip()
    end_coord = _geocode(end_key)
    if not end_coord and end_key != start_key:
        end_coord = _geocode(start_key)

    if not end_coord:
        return  # 城市都查不到，跳过

    # 每天活动按索引微偏移
    for plan in data.get("daily_plans", []):
        acts = plan.get("activities", [])
        n = len(acts)
        for i, act in enumerate(acts):
            if act.get("lat") and act.get("lng"):
                continue
            # 以城市坐标为中心，按索引做小角度偏移（近似圆环分布）
            import math
            angle = (2 * math.pi * i) / max(n, 1)
            radius = 0.012  # ~1.3km
            act["lat"] = round(end_coord["lat"] + radius * math.sin(angle), 6)
            act["lng"] = round(end_coord["lng"] + radius * math.cos(angle), 6)
