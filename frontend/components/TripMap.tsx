// 行程地图组件：用 Leaflet + OpenStreetMap 展示每日路线（免费无 Key）
import { useEffect, useRef } from 'react';

interface MapPoint {
  name: string;
  lat?: number;
  lng?: number;
  time?: string;
  type?: string;
}

interface TripMapProps {
  points: MapPoint[];
  title?: string;
}

export default function TripMap({ points, title }: TripMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || points.length === 0) return;
    // 只在浏览器端加载（SSR 安全）
    const hasCoords = points.filter(p => p.lat && p.lng);
    if (hasCoords.length === 0) return;

    let map: any = null;
    let L: any = null;

    import('leaflet').then((leafletModule) => {
      L = leafletModule.default || leafletModule;
      if (!mapRef.current) return;

      // 初始化地图（居中于第一个点）
      const first = hasCoords[0];
      map = L.map(mapRef.current, {
        center: [first.lat, first.lng],
        zoom: 11,
        scrollWheelZoom: false,
      });
      leafletRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // 添加标记 + 连线
      const markers: any[] = [];
      hasCoords.forEach((p, i) => {
        const icon = L.divIcon({
          className: 'trip-marker',
          html: `<div style="
            width: 26px; height: 26px; border-radius: 50%;
            background: linear-gradient(135deg, #FF6B9D, #FFA62B);
            border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center;
            color: white; font-size: 11px; font-weight: 700;
          ">${i + 1}</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });
        const marker = L.marker([p.lat, p.lng], { icon }).addTo(map);
        if (p.name) {
          marker.bindPopup(`<strong>${p.time || ''} ${p.name}</strong>`);
        }
        markers.push(marker);
      });

      // 连线（按顺序）
      if (hasCoords.length > 1) {
        L.polyline(
          hasCoords.map(p => [p.lat, p.lng]),
          { color: '#FF6B9D', weight: 2.5, opacity: 0.6, dashArray: '6 6' }
        ).addTo(map);
      }

      // 自动调整视野
      if (hasCoords.length > 1) {
        const bounds = L.latLngBounds(hasCoords.map(p => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [30, 30] });
      }
    });

    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, [points]);

  if (points.filter(p => p.lat && p.lng).length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      {title && <p className="text-xs font-bold text-gray-700 mb-1.5">{title}</p>}
      <div
        ref={mapRef}
        className="w-full h-52 rounded-xl border border-pink-100 overflow-hidden z-0"
        style={{ background: '#f0f0f0' }}
      />
      <style jsx global>{`
        .trip-marker { background: transparent !important; border: none !important; }
        .leaflet-container { font-family: inherit; }
        .leaflet-popup-content { font-size: 12px; }
      `}</style>
    </div>
  );
}
