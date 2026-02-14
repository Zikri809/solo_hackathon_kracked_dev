import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import GtfsRealtimeBindings from "npm:gtfs-realtime-bindings";

const GTFS_URL = "https://api.data.gov.my/gtfs-realtime/vehicle-position/prasarana?category=rapid-bus-mrtfeeder";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const response = await fetch(GTFS_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch GTFS data: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
            new Uint8Array(buffer)
        );

        // Transform to a simpler JSON structure or return as is
        // Returning the decoded object directly (it validates the protobuf parsing)
        const data = {
            timestamp: feed.header.timestamp,
            entities: feed.entity,
        };

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
});
