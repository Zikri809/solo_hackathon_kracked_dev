"use client";

import React from 'react';
import { Marker } from 'react-map-gl/mapbox';
import { Circle } from 'lucide-react';

interface StopMarkerProps {
    stop: any; // TODO: Define strict GTFS types
    onClick?: (stop: any) => void;
}

export const StopMarker: React.FC<StopMarkerProps> = ({ stop, onClick }) => {
    // PostGIS location is usually GeoJSON point or similar.
    // If fetched via generic select, it might be a string or object. 
    // Assuming lat/lon columns exist or parsed from location.
    // For now, let's assume standard lat/lon columns or we need to parse.
    // Wait, PRD says gtfs_stops has `location (GEOGRAPHY)`.
    // Supabase JS client might return it as GeoJSON or WKB.
    // Let's assume we used a view or changed it, or we handle GeoJSON.
    // If it's GeoJSON: stop.location.coordinates [lon, lat]

    // Fallback if latitude/longitude columns were added (common practice)
    const lat = stop.stop_lat || stop.latitude || stop.location?.coordinates?.[1];
    const lon = stop.stop_lon || stop.longitude || stop.location?.coordinates?.[0];

    if (!lat || !lon) return null;

    return (
        <Marker
            longitude={lon}
            latitude={lat}
            anchor="center"
            onClick={(e) => {
                e.originalEvent.stopPropagation();
                onClick?.(stop);
            }}
        >
            <div
                className="bg-white rounded-full p-1 shadow-sm border border-zinc-200 hover:scale-110 transition-transform cursor-pointer"
                title={stop.stop_name}
            >
                <div className="w-2 h-2 bg-zinc-500 rounded-full" />
            </div>
        </Marker>
    );
};
