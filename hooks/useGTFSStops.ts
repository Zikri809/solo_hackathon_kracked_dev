import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export const fetchGTFSStops = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("gtfs_stops")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const useGTFSStops = () => {
    return useQuery({
        queryKey: ["gtfs-stops"],
        queryFn: fetchGTFSStops,
        staleTime: 1000 * 60 * 60, // 1 hour
    });
};
