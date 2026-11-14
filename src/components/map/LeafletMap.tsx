'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MAP_GROUPS } from '@/data/mapSpots';
import { getLocalizedMapText, MapSpot, SpotCategory } from '@/types/map';
import { Language } from '@/lib/translations';

interface LeafletMapProps {
  spots: MapSpot[];
  selectedSpotId: string | null;
  onSelectSpot: (spot: MapSpot) => void;
  lang: Language;
  fitTrigger?: number;
}

const CATEGORY_EMOJI: Record<SpotCategory, string> = {
  restaurant: '🍜',
  agency: '🏢',
  hometown: '🏠',
  filming: '🎬',
};

export default function LeafletMap({
  spots,
  selectedSpotId,
  onSelectSpot,
  lang,
  fitTrigger = 0,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const onSelectRef = useRef(onSelectSpot);

  useEffect(() => {
    onSelectRef.current = onSelectSpot;
  }, [onSelectSpot]);

  // Initialize Leaflet map once on mount
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [37.545, 126.99],
      zoom: 12,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    mapRef.current = map;
    markersLayerRef.current = layerGroup;

    return () => {
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // Render markers whenever spots, selection, or language changes
  useEffect(() => {
    const map = mapRef.current;
    const layerGroup = markersLayerRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    spots.forEach((spot) => {
      const primaryGroup = MAP_GROUPS[spot.groupIds[0]];
      const isSelected = spot.id === selectedSpotId;
      const emoji = CATEGORY_EMOJI[spot.category];
      const title = getLocalizedMapText(spot.name, lang);

      const icon = L.divIcon({
        className: 'kpop-map-marker-wrapper',
        html: `
          <div style="
            display:flex;
            align-items:center;
            justify-content:center;
            width:${isSelected ? '44px' : '36px'};
            height:${isSelected ? '44px' : '36px'};
            border-radius:9999px;
            background:${isSelected ? '#0f172a' : primaryGroup.color};
            border:${isSelected ? '3px solid #fbbf24' : '2.5px solid #ffffff'};
            box-shadow:0 6px 16px rgba(15,23,42,0.28);
            font-size:${isSelected ? '20px' : '16px'};
            transform:translate(-50%, -50%) scale(${isSelected ? '1.12' : '1'});
            transition:transform 0.18s ease, background 0.18s ease;
            cursor:pointer;
          " title="${title.replace(/"/g, '&quot;')}">
            <span>${emoji}</span>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([spot.coordinates.lat, spot.coordinates.lng], {
        icon,
        zIndexOffset: isSelected ? 1000 : 0,
      });

      marker.bindTooltip(title, {
        direction: 'top',
        offset: [0, -22],
        opacity: 0.95,
      });

      marker.on('click', () => {
        onSelectRef.current(spot);
      });

      marker.addTo(layerGroup);
    });
  }, [spots, selectedSpotId, lang]);

  // Fly to selected spot
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedSpotId) return;
    const target = spots.find((s) => s.id === selectedSpotId);
    if (!target) return;

    map.flyTo([target.coordinates.lat, target.coordinates.lng], Math.max(map.getZoom(), 14), {
      duration: 0.65,
    });
  }, [selectedSpotId, spots]);

  // Fit bounds when filter changes explicitly
  useEffect(() => {
    const map = mapRef.current;
    if (!map || fitTrigger === 0 || spots.length === 0) return;

    if (spots.length === 1) {
      map.flyTo([spots[0].coordinates.lat, spots[0].coordinates.lng], 14, { duration: 0.5 });
      return;
    }

    const bounds = L.latLngBounds(spots.map((s) => [s.coordinates.lat, s.coordinates.lng]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 13 });
  }, [fitTrigger, spots]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden z-0"
      aria-label="K-Pop Star Pilgrimage Map"
    />
  );
}
