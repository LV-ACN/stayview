"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getRoomBySlug } from "@/lib/rooms";
import { StarRating } from "@/components/StarRating";
import { PriceTag } from "@/components/PriceTag";
import { trackPageView, trackClick } from "@/lib/analytics";

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

export default function RoomDetailPage() {
  const params = useParams<{ slug: string }>();
  const room = getRoomBySlug(params.slug);

  useEffect(() => {
    if (room) {
      trackPageView("room_detail", { room_id: room.id, room_name: room.name });
    }
  }, [room]);

  if (!room) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-2xl font-heading mb-4">Room Not Found</h1>
        <p className="text-neutral-600 mb-6">The room you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/rooms" className="btn-primary">
          Browse All Rooms
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <nav className="text-sm text-neutral-500 mb-6">
        <Link href="/rooms" className="hover:text-brand-600">Rooms</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-800">{room.name}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-[16/9] bg-neutral-200 rounded-lg mb-6 flex items-center justify-center text-neutral-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-3xl font-heading mb-3">{room.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <StarRating rating={room.rating} reviewCount={room.reviewCount} size="md" />
            <span className="text-sm text-neutral-500 capitalize">{room.category}</span>
          </div>

          <p className="text-neutral-700 leading-relaxed mb-8">{room.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-neutral-50 rounded-lg">
              <div className="text-2xl font-bold text-neutral-800">{room.sqft}</div>
              <div className="text-sm text-neutral-500">Square Feet</div>
            </div>
            <div className="text-center p-4 bg-neutral-50 rounded-lg">
              <div className="text-2xl font-bold text-neutral-800 capitalize">{room.bedType}</div>
              <div className="text-sm text-neutral-500">Bed Type</div>
            </div>
            <div className="text-center p-4 bg-neutral-50 rounded-lg">
              <div className="text-2xl font-bold text-neutral-800">{room.maxGuests}</div>
              <div className="text-sm text-neutral-500">Max Guests</div>
            </div>
          </div>

          <h2 className="text-xl font-heading mb-4">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {room.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2 text-sm text-neutral-700">
                <svg className="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {AMENITY_LABELS[amenity] ?? amenity}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-neutral-200 rounded-lg p-6">
            <PriceTag amount={room.pricePerNight} currency={room.currency} size="lg" />
            <div className="text-sm text-neutral-500 mt-1 mb-6">Taxes & fees not included</div>

            <button
              className="btn-primary w-full mb-3"
              disabled={!room.available}
              onClick={() => {
                trackClick("room_detail", "book_now_cta", {
                  room_id: room.id,
                  price: room.pricePerNight,
                });
              }}
            >
              {room.available ? "Book This Room" : "Sold Out"}
            </button>

            <button
              className="btn-secondary w-full"
              onClick={() => {
                trackClick("room_detail", "contact_concierge", { room_id: room.id });
              }}
            >
              Contact Concierge
            </button>

            <div className="mt-6 pt-6 border-t border-neutral-100 text-sm text-neutral-500">
              <p>Free cancellation up to 48 hours before check-in.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
