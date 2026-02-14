import TransitMap from "@/components/map/TransitMap";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <TransitMap />
    </main>
  );
}
