import type { Room, RoomFilters } from "@/types";

const ROOMS: Room[] = [
  {
    id: "rm-001",
    name: "Harbor View King",
    slug: "harbor-view-king",
    description: "Unwind in our spacious Harbor View King room featuring panoramic waterfront views, a plush king bed with premium linens, and a marble bathroom with rainfall shower. The perfect retreat after a day of exploring the city.",
    shortDescription: "Panoramic waterfront views with king bed",
    pricePerNight: 4200,
    currency: "INR",
    images: ["/images/rooms/harbor-king-1.jpg", "/images/rooms/harbor-king-2.jpg"],
    amenities: ["wifi", "minibar", "room-service", "ocean-view", "balcony"],
    maxGuests: 2,
    bedType: "king",
    sqft: 450,
    rating: 4.8,
    reviewCount: 234,
    available: true,
    category: "deluxe",
  },
  {
    id: "rm-002",
    name: "City Skyline Suite",
    slug: "city-skyline-suite",
    description: "Our signature City Skyline Suite offers a separate living area, executive work desk, and floor-to-ceiling windows showcasing the downtown skyline. Includes exclusive access to the Executive Lounge.",
    shortDescription: "Separate living area with skyline views",
    pricePerNight: 5800,
    currency: "INR",
    images: ["/images/rooms/skyline-suite-1.jpg", "/images/rooms/skyline-suite-2.jpg"],
    amenities: ["wifi", "minibar", "room-service", "concierge", "balcony", "gym", "spa"],
    maxGuests: 3,
    bedType: "suite",
    sqft: 780,
    rating: 4.9,
    reviewCount: 156,
    available: true,
    category: "suite",
  },
  {
    id: "rm-003",
    name: "Garden Courtyard Queen",
    slug: "garden-courtyard-queen",
    description: "A tranquil escape overlooking our lush garden courtyard. Features a comfortable queen bed, work area, and a spa-inspired bathroom. Ideal for both leisure and business travelers.",
    shortDescription: "Tranquil courtyard views with queen bed",
    pricePerNight: 3200,
    currency: "INR",
    images: ["/images/rooms/garden-queen-1.jpg", "/images/rooms/garden-queen-2.jpg"],
    amenities: ["wifi", "parking", "gym", "restaurant"],
    maxGuests: 2,
    bedType: "queen",
    sqft: 350,
    rating: 4.5,
    reviewCount: 412,
    available: true,
    category: "standard",
  },
  {
    id: "rm-004",
    name: "Presidential Penthouse",
    slug: "presidential-penthouse",
    description: "The crown jewel of our hotel. A two-story penthouse with private terrace, personal butler service, grand piano, and 360-degree city views. Features two bedrooms, a dining room, and a fully equipped kitchen.",
    shortDescription: "Two-story luxury with private terrace",
    pricePerNight: 6000,
    currency: "INR",
    images: ["/images/rooms/penthouse-1.jpg", "/images/rooms/penthouse-2.jpg"],
    amenities: ["wifi", "minibar", "room-service", "concierge", "balcony", "spa", "kitchen", "bar"],
    maxGuests: 6,
    bedType: "suite",
    sqft: 2200,
    rating: 5.0,
    reviewCount: 42,
    available: true,
    category: "penthouse",
  },
  {
    id: "rm-005",
    name: "Cozy Twin Retreat",
    slug: "cozy-twin-retreat",
    description: "Perfect for friends or colleagues traveling together. Features two comfortable twin beds, a shared work area, and all the essentials for a pleasant stay.",
    shortDescription: "Twin beds ideal for friends or colleagues",
    pricePerNight: 3000,
    currency: "INR",
    images: ["/images/rooms/twin-retreat-1.jpg", "/images/rooms/twin-retreat-2.jpg"],
    amenities: ["wifi", "parking", "gym"],
    maxGuests: 2,
    bedType: "twin",
    sqft: 300,
    rating: 4.3,
    reviewCount: 289,
    available: true,
    category: "standard",
  },
  {
    id: "rm-006",
    name: "Deluxe Ocean Double",
    slug: "deluxe-ocean-double",
    description: "Wake up to the sound of waves in our Deluxe Ocean Double. Two double beds provide ample space for families, while the private balcony offers stunning ocean views at sunset.",
    shortDescription: "Oceanfront family room with two double beds",
    pricePerNight: 4800,
    currency: "INR",
    images: ["/images/rooms/ocean-double-1.jpg", "/images/rooms/ocean-double-2.jpg"],
    amenities: ["wifi", "minibar", "pool", "ocean-view", "balcony", "pet-friendly"],
    maxGuests: 4,
    bedType: "double",
    sqft: 520,
    rating: 4.7,
    reviewCount: 178,
    available: false,
    category: "deluxe",
  },
  {
    id: "rm-007",
    name: "Premium King Corner",
    slug: "premium-king-corner",
    description: "Situated on the corner of the building, this premium room offers dual-aspect views and extra natural light. Furnished with a luxurious king bed and a relaxation seating area.",
    shortDescription: "Corner room with dual-aspect views",
    pricePerNight: 4500,
    currency: "INR",
    images: ["/images/rooms/premium-corner-1.jpg", "/images/rooms/premium-corner-2.jpg"],
    amenities: ["wifi", "minibar", "room-service", "concierge", "gym", "spa"],
    maxGuests: 2,
    bedType: "king",
    sqft: 500,
    rating: 4.6,
    reviewCount: 98,
    available: true,
    category: "premium",
  },
  {
    id: "rm-008",
    name: "Family Grand Suite",
    slug: "family-grand-suite",
    description: "Designed with families in mind. A spacious suite with a master bedroom, a kids' area with bunk beds, a kitchenette, and a dining space. Steps away from the pool and kids' club.",
    shortDescription: "Family suite with kids' area and kitchenette",
    pricePerNight: 5500,
    currency: "INR",
    images: ["/images/rooms/family-suite-1.jpg", "/images/rooms/family-suite-2.jpg"],
    amenities: ["wifi", "pool", "kitchen", "pet-friendly", "parking", "restaurant"],
    maxGuests: 5,
    bedType: "suite",
    sqft: 900,
    rating: 4.8,
    reviewCount: 203,
    available: true,
    category: "suite",
  },
];

export function getAllRooms(): Room[] {
  return ROOMS;
}

export function getRoomBySlug(slug: string): Room | undefined {
  return ROOMS.find((room) => room.slug === slug);
}

export function getRoomById(id: string): Room | undefined {
  return ROOMS.find((room) => room.id === id);
}

export function filterRooms(filters: RoomFilters): Room[] {
  return ROOMS.filter((room) => {
    if (filters.category && room.category !== filters.category) return false;
    if (filters.bedType && room.bedType !== filters.bedType) return false;
    if (filters.minPrice && room.pricePerNight < filters.minPrice) return false;
    if (filters.maxPrice && room.pricePerNight > filters.maxPrice) return false;
    if (filters.guests && room.maxGuests < filters.guests) return false;
    if (filters.amenities && filters.amenities.length > 0) {
      const hasAll = filters.amenities.every((a) => room.amenities.includes(a));
      if (!hasAll) return false;
    }
    return true;
  });
}