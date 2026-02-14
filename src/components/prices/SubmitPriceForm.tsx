"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSubmitPrice } from "@/hooks/usePrices";
import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { toast } from "sonner";
import { MALAYSIA_LOCATIONS, State } from "@/lib/locations";

const formSchema = z.object({
    product_name: z.string().min(2, "Product name must be at least 2 characters."),
    price: z.number().positive("Price must be a positive number."),
    unit: z.enum(["kg", "g", "l", "ml", "pcs"]),
    store_name: z.string().min(2, "Store name must be at least 2 characters."),
    state: z.string().min(1, "Please select a state."),
    city: z.string().min(1, "Please select a city."),
    location: z.string().min(2, "Location details must be at least 2 characters."),
    lat: z.number({ message: "Please capture your location using the map pin icon." }),
    lng: z.number({ message: "Please capture your location using the map pin icon." }),
});

interface FormValues {
    product_name: string;
    price: number;
    unit: "kg" | "g" | "l" | "ml" | "pcs";
    store_name: string;
    state: string;
    city: string;
    location: string;
    lat: number;
    lng: number;
}

interface SubmitPriceFormProps {
    onSuccess?: () => void;
}

export function SubmitPriceForm({ onSuccess }: SubmitPriceFormProps) {
    const mutation = useSubmitPrice();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            product_name: "",
            price: 0,
            unit: "kg",
            store_name: "",
            location: "",
            state: "",
            city: "",
            lat: undefined,
            lng: undefined,
        },
    });

    const [gettingLocation, setGettingLocation] = useState(false);
    const selectedState = form.watch("state") as State | "";

    // Reset city when state changes
    useEffect(() => {
        if (selectedState) {
            form.setValue("city", "");
        }
    }, [selectedState, form]);

    const cities = selectedState ? MALAYSIA_LOCATIONS[selectedState] || [] : [];

    const getLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        setGettingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                form.setValue("lat", latitude);
                form.setValue("lng", longitude);
                toast.success("Location captured!");
                setGettingLocation(false);
            },
            (error) => {
                toast.error("Unable to retrieve your location");
                console.error(error);
                setGettingLocation(false);
            }
        );
    };

    function onSubmit(values: FormValues) {
        mutation.mutate(
            {
                product_name: values.product_name,
                price: values.price,
                unit: values.unit,
                store_name: values.store_name,
                state: values.state,
                city: values.city,
                location: values.location,
                lat: values.lat!,
                lng: values.lng!,
            },
            {
                onSuccess: () => {
                    form.reset();
                    onSuccess?.();
                },
            }
        );
    }

    const onError = () => {
        if (form.formState.errors.lat || form.formState.errors.lng) {
            toast.error("Please capture your location using the map pin icon before submitting.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="product_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Fresh Milk" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                            <FormItem className="w-[120px]">
                                <FormLabel>Unit</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Unit" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="kg">kg</SelectItem>
                                        <SelectItem value="g">g</SelectItem>
                                        <SelectItem value="l">l</SelectItem>
                                        <SelectItem value="ml">ml</SelectItem>
                                        <SelectItem value="pcs">pcs</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="store_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Store</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Tesco Extra" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select State" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.keys(MALAYSIA_LOCATIONS).map((state) => (
                                            <SelectItem key={state} value={state}>
                                                {state}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={!selectedState}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select City" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {cities.map((city) => (
                                            <SelectItem key={city} value={city}>
                                                {city}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-2 items-end">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Location Details</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Taman Tun Dr Ismail" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={getLocation}
                        disabled={gettingLocation}
                        title="Use my current location"
                    >
                        {gettingLocation ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <MapPin className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Price
                </Button>
            </form>
        </Form>
    );
}
