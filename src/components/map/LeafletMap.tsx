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
  routeLine?: boolean;
  numberedMarkers?: boolean;
  routeColor?: string;
  visitedIds?: string[];
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
  routeLine = false,
  numberedMarkers = false,
  routeColor,
  visitedIds = [],
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
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

    const routeGroup = L.layerGroup().addTo(map);
    const layerGroup = L.layerGroup().addTo(map);
    mapRef.current = map;
    routeLayerRef.current = routeGroup;
    markersLayerRef.current = layerGroup;

    const ro = new ResizeObserver(() => {
      map.invalidateSize();
    });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
      routeLayerRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // Render route polyline & markers whenever spots, selection, route mode, or visited state changes
  useEffect(() => {
    const map = mapRef.current;
    const routeGroup = routeLayerRef.current;
    const layerGroup = markersLayerRef.current;
    if (!map || !routeGroup || !layerGroup) return;

    routeGroup.clearLayers();
    layerGroup.clearLayers();

    if (routeLine && spots.length >= 2) {
      const latLngs: [number, number][] = spots.map((s) => [
        s.coordinates.lat,
        s.coordinates.lng,
      ]);

      L.polyline(latLngs, {
        color: '#ffffff',
        weight: 7,
        opacity: 0.9,
        lineJoin: 'round',
      }).addTo(routeGroup);

      L.polyline(latLngs, {
        color: routeColor || '#7c3aed',
        weight: 4,
        dashArray: '10 8',
        opacity: 0.95,
        lineJoin: 'round',
      }).addTo(routeGroup);
    }

    spots.forEach((spot, idx) => {
      const primaryGroup = MAP_GROUPS[spot.groupIds[0]];
      const isSelected = spot.id === selectedSpotId;
      const isVisited = visitedIds.includes(spot.id);
      const innerLabel = numberedMarkers ? String(idx + 1) : CATEGORY_EMOJI[spot.category];
      const title = getLocalizedMapText(spot.name, lang);
      const markerBg = isSelected
        ? '#0f172a'
        : routeColor && numberedMarkers
        ? routeColor
        : primaryGroup.color;

      const size = isSelected ? 44 : 38;
      const visitedBadgeHtml = isVisited
        ? `<span style="
            position:absolute;
            top:-3px;
            right:-3px;
            width:16px;
            height:16px;
            border-radius:9999px;
            background:#059669;
            border:2px solid #ffffff;
            color:#ffffff;
            font-size:10px;
            font-weight:900;
            display:flex;
            align-items:center;
            justify-content:center;
            line-height:1;
          ">✓</span>`
        : '';

      const icon = L.divIcon({
        className: 'kpop-map-marker-wrapper',
        html: `
          <div style="
            position:relative;
            display:flex;
            align-items:center;
            justify-content:center;
            width:${size}px;
            height:${size}px;
            border-radius:9999px;
            background:${markerBg};
            border:${isSelected ? '3px solid #fbbf24' : '2.5px solid #ffffff'};
            box-shadow:0 6px 16px rgba(15,23,42,0.28);
            color:#ffffff;
            font-weight:800;
            font-size:${numberedMarkers ? (isSelected ? '16px' : '14px') : isSelected ? '20px' : '16px'};
            transform:scale(${isSelected ? '1.08' : '1'});
            transition:transform 0.18s ease, background 0.18s ease;
            cursor:pointer;
          " title="${title.replace(/"/g, '&quot;')}">
            <span>${innerLabel}</span>
            ${visitedBadgeHtml}
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      const marker = L.marker([spot.coordinates.lat, spot.coordinates.lng], {
        icon,
        zIndexOffset: isSelected ? 1000 : numberedMarkers ? spots.length - idx : 0,
      });

      marker.bindTooltip(numberedMarkers ? `${idx + 1}. ${title}` : title, {
        direction: 'top',
        offset: [0, -22],
        opacity: 0.95,
      });

      marker.on('click', () => {
        onSelectRef.current(spot);
      });

      marker.addTo(layerGroup);
    });
  }, [spots, selectedSpotId, lang, routeLine, numberedMarkers, routeColor, visitedIds]);

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
      className="w-full h-full min-h-[300px] sm:min-h-[420px] rounded-2xl overflow-hidden z-0"
      aria-label="K-Pop Star Pilgrimage Map"
    />
  );
}
