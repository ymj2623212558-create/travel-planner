"""
City search engine backed by 150K+ cities from dr5hn dataset.
Supports prefix search with optional GeoNames API fallback.
"""
import json
import os
from typing import Optional
import urllib.request
import urllib.parse

_DATA = None  # lazy load


def _load() -> list[dict]:
    global _DATA
    if _DATA is None:
        path = os.path.join(os.path.dirname(__file__), "data", "cities-all.json")
        with open(path, "r", encoding="utf-8") as f:
            _DATA = json.load(f)
    return _DATA


def search_local(query: str, limit: int = 10) -> list[dict]:
    """Prefix search in local 150K city database. Returns [{name, country}]."""
    cities = _load()
    q = query.lower().strip()
    if not q:
        return []

    results = []
    for c in cities:
        if c["name"].lower().startswith(q):
            results.append(c)
            if len(results) >= limit:
                break

    # If prefix didn't fill limit, try contains
    if len(results) < limit:
        seen = {r["name"] + r["country"] for r in results}
        for c in cities:
            key = c["name"] + c["country"]
            if key not in seen and q in c["name"].lower():
                results.append(c)
                seen.add(key)
                if len(results) >= limit:
                    break

    return results


def search_geonames(query: str, limit: int = 10, username: str = "hermes_travel") -> list[dict]:
    """
    Search GeoNames API for cities worldwide.
    Free tier: 20,000 requests/day, no API key needed for basic usage.
    Set GEONAMES_USERNAME env var to use your own account.
    """
    import os as _os
    user = _os.environ.get("GEONAMES_USERNAME", username)
    params = urllib.parse.urlencode({
        "q": query,
        "maxRows": limit,
        "type": "json",
        "featureClass": "P",  # populated places only
        "username": user,
        "lang": "zh",  # prefer Chinese names when available
    })
    url = f"http://api.geonames.org/searchJSON?{params}"

    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Hermes-TravelPlanner"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read())
    except Exception:
        return []

    results = []
    for g in data.get("geonames", []):
        results.append({
            "name": g.get("toponymName", g.get("name", "")),
            "country": g.get("countryName", ""),
            "lat": float(g.get("lat", 0)),
            "lng": float(g.get("lng", 0)),
            "source": "geonames",
        })
    return results


def search(query: str, limit: int = 10, use_geonames: bool = True) -> dict:
    """
    Combined search: local first, GeoNames fallback.
    Returns {"results": [...], "source": "local"|"mixed"}
    """
    q = query.strip()
    if not q or len(q) < 2:
        return {"results": [], "source": "local"}

    local = search_local(q, limit=limit)

    if len(local) >= limit or not use_geonames:
        return {"results": local, "source": "local"}

    # Fill remaining with GeoNames
    gn = search_geonames(q, limit=limit - len(local))
    # Merge, deduplicate by name
    seen = {r["name"].lower() for r in local}
    for r in gn:
        if r["name"].lower() not in seen:
            local.append(r)
            seen.add(r["name"].lower())

    return {"results": local[:limit], "source": "mixed" if gn else "local"}
