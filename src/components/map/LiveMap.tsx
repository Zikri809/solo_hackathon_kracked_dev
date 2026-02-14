"use client";

import { usePrices } from "@/hooks/usePrices";
import { useState } from "react";
import Map, {
    Marker,
    Popup,
    NavigationControl,
    GeolocateControl,
    ScaleControl,
    FullscreenControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { timeAgo, calculateDistance } from "@/lib/utils";
import { useMemo } from "react";
import { PriceEntry } from "@/lib/types";

interface StoreCluster {
    id: string;
    store_name: string;
    lat: number;
    lng: number;
    items: PriceEntry[];
}

// Default to Kuala Lumpur
const INITIAL_VIEW_STATE = {
    latitude: 3.140853,
    longitude: 101.693207,
    zoom: 12,
};

export default function LiveMap() {
    const { prices } = usePrices();
    const [popupInfo, setPopupInfo] = useState<StoreCluster | null>(null);

    const clusters = useMemo(() => {
        const clusters: StoreCluster[] = [];
        const entriesWithLocation = prices?.filter((p) => p.lat && p.lng) || [];

        entriesWithLocation.forEach((entry) => {
            // Find existing cluster for this store within 100m (0.1km)
            const existingCluster = clusters.find(
                (c) =>
                    c.store_name.toLowerCase() === entry.store_name.toLowerCase() &&
                    calculateDistance(c.lat, c.lng, entry.lat!, entry.lng!) < 0.1
            );

            if (existingCluster) {
                existingCluster.items.push(entry);
                // Optional: Update cluster center to average location
                // existingCluster.lat = (existingCluster.lat + entry.lat!) / 2;
                // existingCluster.lng = (existingCluster.lng + entry.lng!) / 2;
            } else {
                clusters.push({
                    id: entry.id, // Use first entry ID as cluster ID
                    store_name: entry.store_name,
                    lat: entry.lat!,
                    lng: entry.lng!,
                    items: [entry],
                });
            }
        });

        return clusters;
    }, [prices]);

    return (
        <div className="h-[calc(100vh-4rem)] w-full relative">
            <Map
                initialViewState={INITIAL_VIEW_STATE}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                {clusters.map((cluster) => (
                    <Marker
                        key={cluster.id}
                        latitude={cluster.lat}
                        longitude={cluster.lng}
                        anchor="bottom"
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            setPopupInfo(cluster);
                        }}
                    >
                        <div className="relative group cursor-pointer">
                            <MapPin className="text-primary h-10 w-10 hover:scale-110 transition-transform drop-shadow-md" fill="currentColor" />
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-xs font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap border">
                                {cluster.store_name}
                            </div>
                            {cluster.items.length > 1 && (
                                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full border-2 border-white">
                                    {cluster.items.length}
                                </Badge>
                            )}
                        </div>
                    </Marker>
                ))}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        latitude={popupInfo.lat}
                        longitude={popupInfo.lng}
                        onClose={() => setPopupInfo(null)}
                        maxWidth="300px"
                        className="z-50"
                        closeButton={false}
                    >
                        <div className="p-0 min-w-[280px] max-h-[400px] overflow-hidden flex flex-col">
                            <div className="p-3 border-b bg-muted/40">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                    <Store className="h-4 w-4" />
                                    {popupInfo.store_name}
                                </h3>
                                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {popupInfo.items[0].location}
                                </div>
                            </div>

                            <div className="overflow-y-auto p-2 space-y-2">
                                {popupInfo.items.map((item) => (
                                    <div key={item.id} className="p-2 hover:bg-muted/50 rounded-md border text-sm">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-medium">{item.product_name}</span>
                                            <span className="font-bold text-primary whitespace-nowrap">
                                                RM {item.price.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                                            <span>{item.unit}</span>
                                            <span>{item.created_at ? timeAgo(item.created_at) : 'recently'}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Popup>
                )}
            </Map>

            {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
                <div className="absolute top-0 left-0 right-0 bg-destructive/10 text-destructive p-2 text-center text-sm font-bold backdrop-blur-sm z-[100]">
                    Missing NEXT_PUBLIC_MAPBOX_TOKEN in .env
                </div>
            )}
        </div>
    );
}
