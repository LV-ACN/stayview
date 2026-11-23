"use client";

import Link from "next/link";
import type { Room } from "@/types";
import { StarRating } from "./StarRating";
import { PriceTag } from "./PriceTag";
import { trackClick } from "@/lib/analytics";

interface RoomCardProps {
  room: Room;
}

const AMENITY_LABELS: Record<string, string> = {
  wifi: "WiFi",
  parking: "Parking",
  pool: "Pool",
  spa: "Spa",
  gym: "Fitness Center",
  restaurant: "Restaurant",
  bar: "Bar",
  "room-service": "Room Service",
  concierge: "Concierge",
  "ocean-view": "Ocean View",
  balcony: "Balcony",
  minibar: "Minibar",
  kitchen: "Kitchen",
  "pet-friendly": "Pet Friendly",
};

export function RoomCard({ room }: RoomCardProps) {
  const handleClick = () => {
    trackClick("room_listing", "room_card", {
      room_id: room.id,
      room_name: room.name,
      room_category: room.category,
      price: room.pricePerNight,
    });
  };

  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="group block bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="aspect-[16/10] bg-neutral-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        {!room.available && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            Sold Out
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 text-xs font-medium px-2 py-1 rounded capitalize">
          {room.category}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-heading group-hover:text-brand-600 transition-colors">
            {room.name}
          </h3>
        </div>

        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
          {room.shortDescription}
        </p>

        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
          <span>{room.sqft} sq ft</span>
          <span className="capitalize">{room.bedType} bed</span>
          <span>Up to {room.maxGuests} guests</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {room.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded"
            >
              {AMENITY_LABELS[amenity] ?? amenity}
            </span>
          ))}
          {room.amenities.length > 4 && (
            <span className="text-xs text-neutral-400">
              +{room.amenities.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <StarRating rating={room.rating} reviewCount={room.reviewCount} size="sm" />
          <PriceTag amount={room.pricePerNight} currency={room.currency} size="sm" />
        </div>
      </div>
    </Link>
  );
}
