"use client";

import React from 'react';
import { Marker } from 'react-map-gl/mapbox';
import { Bus, TrainFront } from 'lucide-react';

interface VehicleMarkerProps {
    vehicle: any; // TODO: Define strict GTFS-RT types
    onClick?: (vehicle: any) => void;
}

export const VehicleMarker: React.FC<VehicleMarkerProps> = ({ vehicle, onClick }) => {
    const { position, vehicle: vehicleInfo } = vehicle;

    // Determine type (Bus vs Train) - naive check, refine with route_type later
    const isTrain = vehicleInfo?.label?.toLowerCase().includes("train") || false;

    return (
        <Marker
            longitude={position.longitude}
            latitude={position.latitude}
            anchor="center"
            onClick={(e) => {
                e.originalEvent.stopPropagation();
                onClick?.(vehicle);
            }}
        >
            <div
                className={`p-2 rounded-full text-white shadow-lg transition-all duration-500 ease-linear ${isTrain ? "bg-purple-700 hover:bg-purple-600" : "bg-teal-600 hover:bg-teal-500"
                    }`}
                title={vehicleInfo?.label || "Unknown Vehicle"}
            >
                {isTrain ? <TrainFront size={16} /> : <Bus size={16} />}
            </div>
        </Marker>
    );
};
