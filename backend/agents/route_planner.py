"""
Route Planner Agent - Optimizes travel routes to avoid backtracking
"""
from typing import List, Dict, Tuple


class RoutePlannerAgent:
    """Agent responsible for route optimization and city sequencing"""
    
    def __init__(self):
        self.city_db = {
            "北京": {"lat": 39.9042, "lng": 116.4074},
            "上海": {"lat": 31.2304, "lng": 121.4737},
            "广州": {"lat": 23.1291, "lng": 113.2644},
            "成都": {"lat": 30.5728, "lng": 104.0668},
            "西安": {"lat": 34.3416, "lng": 108.9398},
            "杭州": {"lat": 30.2741, "lng": 120.1551},
            "重庆": {"lat": 29.5630, "lng": 106.5516},
            "苏州": {"lat": 31.2989, "lng": 120.5853},
            "南京": {"lat": 32.0603, "lng": 118.7969},
            "昆明": {"lat": 25.0406, "lng": 102.7179},
            "桂林": {"lat": 25.2736, "lng": 110.2932},
            "三亚": {"lat": 18.2528, "lng": 109.5117},
        }
    
    def calculate_distance(self, city_a: str, city_b: str) -> float:
        """Calculate rough distance between two cities (simplified)"""
        if city_a not in self.city_db or city_b not in self.city_db:
            return 1000.0  # Default fallback
        
        a = self.city_db[city_a]
        b = self.city_db[city_b]
        
        # Simple Euclidean distance approximation
        lat_diff = abs(a["lat"] - b["lat"]) * 111  # ~111 km per degree
        lng_diff = abs(a["lng"] - b["lng"]) * 111 * 0.8  # Adjusted for longitude
        
        return (lat_diff**2 + lng_diff**2) ** 0.5
    
    def optimize_route(self, start_city: str, end_city: str, 
                      intermediate_cities: List[str], days: int) -> List[str]:
        """
        Optimize travel route to minimize backtracking
        
        Strategy: Sort cities by their position relative to start→end vector
        """
        if start_city == end_city:
            return [start_city] * days
        
        all_cities = [start_city] + intermediate_cities + [end_city]
        
        # Calculate route scores
        route_score = {}
        for i, city in enumerate(all_cities):
            dist_from_start = self.calculate_distance(start_city, city)
            dist_to_end = self.calculate_distance(city, end_city)
            route_score[city] = (dist_from_start / max(1, dist_to_end))
        
        # Sort by ratio (lower ratio = closer to start)
        sorted_cities = sorted(route_score.keys(), key=lambda x: route_score[x])
        
        # Assign daily itinerary
        daily_route = []
        cities_per_day = days // len([c for c in sorted_cities if c != start_city and c != end_city]) or 1
        
        for day in range(days):
            if day == 0:
                daily_route.append(start_city)
            elif day == days - 1:
                daily_route.append(end_city)
            else:
                idx = min(day - 1, len(sorted_cities) - 2)
                daily_route.append(sorted_cities[idx + 1])
        
        return daily_route
    
    def get_travel_time(self, city_a: str, city_b: str) -> Dict:
        """Estimate travel time between cities"""
        distance = self.calculate_distance(city_a, city_b)
        
        if distance < 200:
            return {"mode": "high-speed rail", "hours": round(distance / 200, 1)}
        elif distance < 800:
            return {"mode": "flight", "hours": round(distance / 600, 1)}
        else:
            return {"mode": "flight", "hours": round(distance / 800, 1)}
