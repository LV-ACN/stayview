export interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  pricePerNight: number;
  currency: string;
  images: string[];
  amenities: Amenity[];
  maxGuests: number;
  bedType: BedType;
  sqft: number;
  rating: number;
  reviewCount: number;
  available: boolean;
  category: RoomCategory;
}

export type BedType = "king" | "queen" | "double" | "twin" | "suite";

export type RoomCategory = "standard" | "deluxe" | "suite" | "premium" | "penthouse";

export type Amenity =
  | "wifi"
  | "parking"
  | "pool"
  | "spa"
  | "gym"
  | "restaurant"
  | "bar"
  | "room-service"
  | "concierge"
  | "ocean-view"
  | "balcony"
  | "minibar"
  | "kitchen"
  | "pet-friendly";

export interface RoomFilters {
  category?: RoomCategory;
  bedType?: BedType;
  minPrice?: number;
  maxPrice?: number;
  amenities?: Amenity[];
  guests?: number;
}

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
  timestamp?: number;
}

export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description?: string;
}
