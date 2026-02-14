"use client";

import * as React from "react";
import { Bus, TrainFront, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

interface TransitCardProps {
    selectedItem: any; // Vehicle or Stop
    onClose: () => void;
}

export function TransitCard({ selectedItem, onClose }: TransitCardProps) {
    const isOpen = !!selectedItem;

    // Determine if it's a vehicle or stop
    const isVehicle = selectedItem?.vehicle;
    const isStop = selectedItem?.stop_id || selectedItem?.stop_name;

    const title = isVehicle
        ? (selectedItem.vehicle?.label || "Unknown Vehicle")
        : (selectedItem?.stop_name || "Unknown Stop");

    const description = isVehicle
        ? `Trip ID: ${selectedItem.vehicle?.trip?.tripId || "N/A"}`
        : `Stop ID: ${selectedItem?.stop_id}`;

    const Icon = isVehicle
        ? (title.toLowerCase().includes("train") ? TrainFront : Bus)
        : MapPin;

    return (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${isVehicle ? 'bg-purple-100 text-purple-700' : 'bg-zinc-100 text-zinc-700'}`}>
                                <Icon size={24} />
                            </div>
                            <div className="text-left">
                                <DrawerTitle>{title}</DrawerTitle>
                                <DrawerDescription>{description}</DrawerDescription>
                            </div>
                        </div>
                    </DrawerHeader>

                    <div className="p-4 pb-0">
                        {isVehicle && (
                            <div className="flex items-center gap-2 text-sm text-zinc-600 mb-4">
                                <Clock size={16} />
                                <span>Updated just now</span>
                                {/* Add real-time timestamp diff here later */}
                            </div>
                        )}

                        {isStop && (
                            <div className="space-y-4">
                                <h4 className="font-semibold text-sm">Next Arrivals</h4>
                                <div className="text-zinc-500 text-sm italic">
                                    Real-time arrivals coming soon...
                                </div>
                            </div>
                        )}

                        {!isVehicle && !isStop && (
                            <p>Select a vehicle or stop to see details.</p>
                        )}
                    </div>

                    <DrawerFooter>
                        <Button>Favorite {isVehicle ? "Route" : "Stop"}</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
