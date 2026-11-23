"use client";

import { useEffect, useState } from "react";
import { RoomCard } from "@/components/RoomCard";
import { FilterBar } from "@/components/FilterBar";
import { getAllRooms, filterRooms } from "@/lib/rooms";
import { trackPageView } from "@/lib/analytics";
import type { Room, RoomFilters } from "@/types";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(getAllRooms());

  useEffect(() => {
    trackPageView("room_listing");
  }, []);

  function handleFilterChange(filters: RoomFilters) {
    const hasActiveFilters = Object.values(filters).some((v) => v !== undefined);
    if (hasActiveFilters) {
      setRooms(filterRooms(filters));
    } else {
      setRooms(getAllRooms());
    }
  }

  return (
    <div className="container-page py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading mb-2">Our Rooms & Suites</h1>
        <p className="text-neutral-600 text-lg">
          Find your perfect room from our collection of {getAllRooms().length} carefully appointed accommodations.
        </p>
      </div>

      <FilterBar onFilterChange={handleFilterChange} />

      {rooms.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-500 text-lg">No rooms match your filters.</p>
          <button
            onClick={() => {
              setRooms(getAllRooms());
            }}
            className="btn-secondary mt-4"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center text-sm text-neutral-500">
        Showing {rooms.length} of {getAllRooms().length} rooms
      </div>
    </div>
  );
}
