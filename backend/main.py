from fastapi import FastAPI, HTTPException, Query, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from city_search import search as search_cities
from ai_planner import generate_itinerary_ai, modify_itinerary_ai, get_activity_details_ai, get_free_quota_left

app = FastAPI(
    title="Travel Planner API",
    description="AI-powered travel itinerary planning system",
    version="1.0.0"
)

# CORS configuration (本地开发 + PocketBay 公网前端)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://travel-planner-frontend.pocketbay.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class JourneyInput(BaseModel):
    start_city: str
    end_city: str
    days: int
    budget_per_day: Optional[float] = None
    interests: Optional[List[str]] = []  # ['history', 'nature', 'food', 'shopping']
    plan_type: Optional[str] = "standard"  # economy / standard / luxury
    travel_style: Optional[str] = ""  # family / couple / budget / elderly

class PointOfInterest(BaseModel):
    name: str
    type: str  # 'attraction', 'restaurant', 'hotel'
    category: str
    time: Optional[str] = None  # 活动时间点（如 "09:00"）
    duration_hours: float
    estimated_cost: float
    rating: Optional[float] = None
    description: Optional[str] = None  # 详细介绍
    tips: Optional[str] = None  # 游玩建议/注意事项
    why: Optional[str] = None  # 推荐理由
    price_source: Optional[str] = None  # 'official' = 官方门票价 / 'ai' = AI 估算
    ticket_price_range: Optional[str] = None  # 官方门票价格区间（如 "60-60"）
    lat: Optional[float] = None  # 纬度（行程地图用）
    lng: Optional[float] = None  # 经度（行程地图用）

class DailyItinerary(BaseModel):
    day: int
    date: str
    theme: Optional[str] = None  # 当天主题（如：城市初探）
    activities: List[PointOfInterest]
    total_cost: float
    notes: Optional[str] = None

class ItineraryResponse(BaseModel):
    journey_id: str
    start_city: str
    end_city: str
    days: int
    daily_plans: List[DailyItinerary]
    total_estimated_cost: float
    cost_breakdown: dict
    ticket_matched: Optional[int] = 0  # 官方门票价匹配数（方案 A）

# In-memory storage (replace with database later)
itineraries = {}

@app.get("/")
def root():
    # 单项目部署：根路径重定向到前端页面（有 out/ 静态目录时）
    import os as _os
    if _os.path.isdir(_os.path.join(_os.path.dirname(__file__), "out")):
        from fastapi.responses import RedirectResponse
        return RedirectResponse("/itinerary", status_code=307)
    return {
        "message": "Welcome to Travel Planner API",
        "version": "1.0.0",
        "endpoints": {
            "generate_itinerary": "POST /api/itinerary/generate",
            "get_itinerary": "GET /api/itinerary/{journey_id}",
            "health_check": "GET /health",
            "city_search": "GET /api/cities/search"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "travel-planner-backend"}


@app.get("/api/cities/search")
def city_search(
    q: str = Query(..., min_length=1, description="Search query"),
    limit: int = Query(10, ge=1, le=20),
    scope: str = Query("global", description="'global' or 'domestic'"),
):
    """
    Search cities with scope filter.
    
    - global: returns cities from all countries worldwide
    - domestic: filters results to China only
    """
    import json
    import os
    
    q = q.strip()
    if not q or len(q) < 2:
        return {"results": [], "source": "local"}
    
    # Load local data directly
    path = os.path.join(os.path.dirname(__file__), "data", "cities-all.json")
    try:
        with open(path, "r", encoding="utf-8") as f:
            all_cities = json.load(f)
    except Exception:
        return {"results": [], "source": "error"}
    
    # Filter by scope BEFORE search
    if scope.lower() == "domestic":
        # Only Chinese cities
        filtered = [c for c in all_cities if '中国' in c['country'] or c['country'] == 'CN']
        print(f"[China only] Searching '{q}' in {len(filtered)} Chinese cities")
    else:
        # All cities (global default)
        filtered = all_cities
        print(f"[Global] Searching '{q}' in {len(filtered)} worldwide cities")
    
    # Perform prefix/contains search within filtered set ONLY
    def do_search(query: str) -> list:
        """内部搜索函数"""
        results = []
        q_lower = query.lower().strip()

        # First pass: prefix matches
        for c in filtered:
            if c["name"].lower().startswith(q_lower):
                results.append(c)
                if len(results) >= limit:
                    return results

        # Second pass: contains matches
        if len(results) < limit:
            seen = {r["name"] + r["country"] for r in results}
            for c in filtered:
                key = c["name"] + c["country"]
                if key not in seen and q_lower in c["name"].lower():
                    results.append(c)
                    seen.add(key)
                    if len(results) >= limit:
                        break
        return results

    # 第一次搜索
    results = do_search(q)

    # 若空且查询含中文 → 翻译成英文重试（国际城市中文搜索支持）
    zh_translated = False
    if not results:
        try:
            from city_translations import zh_to_en
            en_name = zh_to_en(q)
            if en_name:
                results = do_search(en_name)
                zh_translated = True
        except Exception:
            pass

    # 若仍空且为中文 → 查国内景区映射表（景区名 → 就近城市）
    scenic_mapped = False
    if not results:
        try:
            from scenic_spots import SCENIC_SPOT_MAP
            target_city = SCENIC_SPOT_MAP.get(q.strip())
            if target_city:
                results = do_search(target_city)
                scenic_mapped = True
        except Exception:
            pass

    # 中文翻译后：优先选国家正确的结果（避免"斐济"命中沙特同名地）
    if zh_translated and len(results) > 1:
        try:
            from city_translations import CITY_ZH_TO_EN, CITY_EN_TO_ZH
            # 已知会错位的词条：优先正确国家
            country_pref = {
                "斐济": "Fiji", "大溪地": "French Polynesia", "格鲁吉亚": "Georgia",
                "圣保罗": "Brazil", "维多利亚": "Canada",
            }
            if q.strip() in country_pref:
                pref_country = country_pref[q.strip()]
                filtered = [c for c in results if pref_country.lower() in c.get("country", "").lower()]
                if filtered:
                    results = filtered
        except Exception:
            pass

    # 补充中文名显示
    if zh_translated or scenic_mapped:
        for r in results:
            r["zh_name"] = q

    return {
        "results": results[:limit],
        "source": "local",
        "translated": zh_translated,
        "scenic_mapped": scenic_mapped,
    }


@app.post("/api/itinerary/generate", response_model=ItineraryResponse)
def generate_itinerary(
    input: JourneyInput,
    x_api_key: Optional[str] = Header(None, alias="X-API-Key"),
    x_api_url: Optional[str] = Header(None, alias="X-API-URL"),
    x_api_model: Optional[str] = Header(None, alias="X-API-Model"),
):
    """
    Generate AI-powered travel itinerary
    
    Args:
        start_city: Starting city name
        end_city: Ending city name  
        days: Number of travel days
        budget_per_day: Daily budget in local currency
        interests: User interests (history, nature, food, shopping, etc.)
        x_api_key: Optional user-provided API key (passed through to AI provider)
        x_api_url: Optional custom API base URL (OpenAI-compatible)
        x_api_model: Optional model name override
    """
    if input.days < 1 or input.days > 30:
        raise HTTPException(status_code=400, detail="Days must be between 1 and 30")

    try:
        result = generate_itinerary_ai(
            start_city=input.start_city,
            end_city=input.end_city,
            days=input.days,
            budget_per_day=input.budget_per_day,
            interests=input.interests or [],
            user_api_key=x_api_key,
            user_api_url=x_api_url,
            user_model=x_api_model,
            plan_type=input.plan_type or "standard",
            travel_style=input.travel_style or "",
        )
    except RuntimeError as e:
        msg = str(e)
        if msg.startswith("NO_KEY"):
            raise HTTPException(status_code=402, detail="后端未配置共享 Key，请在齿轮设置中填写自己的 API Key")
        if msg.startswith("QUOTA_EXCEEDED"):
            raise HTTPException(status_code=403, detail="免费次数已用完（8 次），请在齿轮设置中填写自己的 API Key 继续使用")
        raise HTTPException(status_code=500, detail=msg)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"生成失败: {str(e)[:200]}")

    itinerary = ItineraryResponse(**result)
    itineraries[itinerary.journey_id] = itinerary
    return itinerary

class ModifyRequest(BaseModel):
    itinerary: dict
    request: str
    start_city: str
    end_city: str

@app.post("/api/itinerary/modify", response_model=ItineraryResponse)
def modify_itinerary(
    body: ModifyRequest,
    x_api_key: Optional[str] = Header(None, alias="X-API-Key"),
    x_api_url: Optional[str] = Header(None, alias="X-API-URL"),
    x_api_model: Optional[str] = Header(None, alias="X-API-Model"),
):
    """AI 根据用户需求修改已有行程"""
    try:
        result = modify_itinerary_ai(
            itinerary=body.itinerary,
            request_text=body.request,
            start_city=body.start_city,
            end_city=body.end_city,
            user_api_key=x_api_key,
            user_api_url=x_api_url,
            user_model=x_api_model,
        )
    except RuntimeError as e:
        msg = str(e)
        if msg.startswith("NO_KEY"):
            raise HTTPException(status_code=402, detail="后端未配置共享 Key，请在齿轮设置中填写自己的 API Key")
        raise HTTPException(status_code=500, detail=msg)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"修改失败: {str(e)[:200]}")

    itinerary = ItineraryResponse(**result)
    itineraries[itinerary.journey_id] = itinerary
    return itinerary

class DetailRequest(BaseModel):
    activities: list

@app.post("/api/itinerary/details")
def get_details(
    body: DetailRequest,
    x_api_key: Optional[str] = Header(None, alias="X-API-Key"),
    x_api_url: Optional[str] = Header(None, alias="X-API-URL"),
    x_api_model: Optional[str] = Header(None, alias="X-API-Model"),
):
    """为活动列表补充详细描述（tips/why）"""
    try:
        details = get_activity_details_ai(
            activities=body.activities,
            user_api_key=x_api_key,
            user_api_url=x_api_url,
            user_model=x_api_model,
        )
        return {"details": details}
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e)[:200])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取详情失败: {str(e)[:200]}")

@app.get("/api/itinerary/{journey_id}")
def get_itinerary(journey_id: str):
    """Retrieve existing itinerary by ID"""
    if journey_id not in itineraries:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    
    return itineraries[journey_id]


# ===== 单项目部署：前端静态托管（FastAPI 挂载 out/ 目录） =====
import os
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

_STATIC_DIR = os.path.join(os.path.dirname(__file__), "out")
if os.path.isdir(_STATIC_DIR):
    # 根路径 → /itinerary
    @app.get("/", include_in_schema=False)
    def root_redirect():
        return RedirectResponse("/itinerary", status_code=307)

    # /itinerary 页面（静态托管时不存在路由，需显式返回 HTML）
    @app.get("/itinerary", include_in_schema=False)
    def itinerary_page():
        return FileResponse(os.path.join(_STATIC_DIR, "itinerary.html"))

    # 其余静态资源（_next/、icons/、manifest.json、sw.js 等）
    app.mount("/", StaticFiles(directory=_STATIC_DIR, html=True), name="static")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
