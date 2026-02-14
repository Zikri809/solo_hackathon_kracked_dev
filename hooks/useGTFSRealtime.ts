import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

const fetchGTFSRealtime = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.functions.invoke("fetch-gtfs-rt");

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export const useGTFSRealtime = () => {
    return useQuery({
        queryKey: ["gtfs-realtime"],
        queryFn: fetchGTFSRealtime,
        refetchInterval: 10000, // Poll every 10 seconds
    });
};
