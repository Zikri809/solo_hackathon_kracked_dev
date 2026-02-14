import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PriceEntry } from '@/lib/types';
import { Database } from '@/lib/database.types';
import { toast } from 'sonner';

export function usePrices() {
    const queryClient = useQueryClient();

    const { data: prices = [], isLoading, error } = useQuery({
        queryKey: ['prices'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('price_entries')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching prices:', error);
                throw error;
            }

            return data;
        },
    });

    useEffect(() => {
        const channel = supabase
            .channel('price_entries_changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'price_entries',
                },
                (payload) => {
                    const newPrice = payload.new as PriceEntry;
                    queryClient.setQueryData(['prices'], (oldData: PriceEntry[] | undefined) => {
                        return [newPrice, ...(oldData || [])];
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [queryClient]);

    return { prices, isLoading, error };
}

export function useSubmitPrice() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newPrice: Database['public']['Tables']['price_entries']['Insert']) => {
            const { data, error } = await supabase
                .from('price_entries')
                .insert(newPrice)
                .select()
                .single();

            if (error) {
                console.error('Error submitting price:', error);
                throw error;
            }

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['prices'] });
            toast.success('Price submitted successfully!');
        },
        onError: (error) => {
            toast.error(`Failed to submit price: ${error.message}`);
        },
    });
}
