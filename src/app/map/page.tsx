import LiveMap from "@/components/map/LiveMap";

export const metadata = {
    title: "Live Map | KomunitiKita",
    description: "View real-time grocery prices on an interactive map.",
};

export default function MapPage() {
    return <LiveMap />;
}
