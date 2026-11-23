"use client";

import { useState } from "react";
import type { RoomCategory, BedType, RoomFilters } from "@/types";
import { trackClick } from "@/lib/analytics";

interface FilterBarProps {
  onFilterChange: (filters: RoomFilters) => void;
  initialFilters?: RoomFilters;
}

const CATEGORIES: { value: RoomCategory | ""; label: string }[] = [
  { value: "", label: "All Categories" },
  { value: "standard", label: "Standard" },
  { value: "deluxe", label: "Deluxe" },
  { value: "suite", label: "Suite" },
  { value: "premium", label: "Premium" },
  { value: "penthouse", label: "Penthouse" },
];

const BED_TYPES: { value: BedType | ""; label: string }[] = [
  { value: "", label: "Any Bed Type" },
  { value: "king", label: "King" },
  { value: "queen", label: "Queen" },
  { value: "double", label: "Double" },
  { value: "twin", label: "Twin" },
  { value: "suite", label: "Suite" },
];

const PRICE_RANGES = [
  { value: "", label: "Any Price" },
  { value: "3000-3500", label: "Under ₹3,500" },
  { value: "3500-4500", label: "₹3,500 - ₹4,500" },
  { value: "4500-5500", label: "₹4,500 - ₹5,500" },
  { value: "5500-9999", label: "₹5,500+" },
];

export function FilterBar({ onFilterChange, initialFilters = {} }: FilterBarProps) {
  const [category, setCategory] = useState<RoomCategory | "">(initialFilters.category ?? "");
  const [bedType, setBedType] = useState<BedType | "">(initialFilters.bedType ?? "");
  const [priceRange, setPriceRange] = useState("");
  const [guests, setGuests] = useState<number | "">(initialFilters.guests ?? "");

  function applyFilters(updates: Partial<{ category: RoomCategory | ""; bedType: BedType | ""; priceRange: string; guests: number | "" }>) {
    const newCategory = updates.category ?? category;
    const newBedType = updates.bedType ?? bedType;
    const newPriceRange = updates.priceRange ?? priceRange;
    const newGuests = updates.guests ?? guests;

    const filters: RoomFilters = {};
    if (newCategory) filters.category = newCategory as RoomCategory;
    if (newBedType) filters.bedType = newBedType as BedType;
    if (newGuests) filters.guests = newGuests as number;

    if (newPriceRange) {
      const [min, max] = newPriceRange.split("-").map(Number);
      filters.minPrice = min;
      filters.maxPrice = max;
    }

    onFilterChange(filters);
  }

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-neutral-700 mb-1">
            Category
          </label>
          <select
            id="category-filter"
            value={category}
            onChange={(e) => {
              const val = e.target.value as RoomCategory | "";
              setCategory(val);
              trackClick("room_listing", "filter_category", { value: val || "all" });
              applyFilters({ category: val });
            }}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="bed-filter" className="block text-sm font-medium text-neutral-700 mb-1">
            Bed Type
          </label>
          <select
            id="bed-filter"
            value={bedType}
            onChange={(e) => {
              const val = e.target.value as BedType | "";
              setBedType(val);
              trackClick("room_listing", "filter_bed_type", { value: val || "all" });
              applyFilters({ bedType: val });
            }}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {BED_TYPES.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price-filter" className="block text-sm font-medium text-neutral-700 mb-1">
            Price Range
          </label>
          <select
            id="price-filter"
            value={priceRange}
            onChange={(e) => {
              setPriceRange(e.target.value);
              trackClick("room_listing", "filter_price", { value: e.target.value || "all" });
              applyFilters({ priceRange: e.target.value });
            }}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {PRICE_RANGES.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="guests-filter" className="block text-sm font-medium text-neutral-700 mb-1">
            Guests
          </label>
          <select
            id="guests-filter"
            value={guests}
            onChange={(e) => {
              const val = e.target.value ? Number(e.target.value) : "";
              setGuests(val);
              trackClick("room_listing", "filter_guests", { value: val || "any" });
              applyFilters({ guests: val });
            }}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
