"use client";

import { useState } from 'react';

import Map, { NavigationControl, GeolocateControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useGTFSRealtime } from '@/hooks/useGTFSRealtime';
import { useGTFSStops } from '@/hooks/useGTFSStops';
import { VehicleMarker } from './VehicleMarker';
import { StopMarker } from './StopMarker';
import { TransitCard } from '@/components/transit/TransitCard';

// Kuala Lumpur coordinates
const INITIAL_VIEW_STATE = {
    latitude: 3.1390,
    longitude: 101.6869,
    zoom: 12,
    bearing: 0,
    pitch: 0
};

export default function TransitMap() {
    const mapToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const { data: transitData, isLoading } = useGTFSRealtime();
    const { data: stopsData } = useGTFSStops();
    const [selectedItem, setSelectedItem] = useState<any>(null);

    if (!mapToken) {
        return (
            <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">
                <div className="text-center p-4">
                    <h2 className="text-xl font-bold mb-2">Mapbox Token Missing</h2>
                    <p>Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your .env.local file.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen relative">
            <Map
                initialViewState={INITIAL_VIEW_STATE}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={mapToken}
                attributionControl={false}
            >
                <GeolocateControl position="top-right" />
                <NavigationControl position="top-right" />

                {stopsData?.map((stop: any) => (
                    <StopMarker
                        key={stop.stop_id || stop.id}
                        stop={stop}
                        onClick={(s) => setSelectedItem(s)}
                    />
                ))}

                {transitData?.entity?.map((entity: any) => {
                    return entity.vehicle ? (
                        <div key={entity.id}>
                            <VehicleMarker
                                vehicle={entity.vehicle}
                                onClick={(v) => setSelectedItem(v)}
                            />
                        </div>
                    ) : null;
                })}
            </Map>
            <TransitCard selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
        </div>
    );
}
