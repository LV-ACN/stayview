import { describe, it, expect } from "vitest";
import { getAllRooms, getRoomBySlug, getRoomById, filterRooms } from "./rooms";

describe("getAllRooms", () => {
  it("returns all rooms", () => {
    const rooms = getAllRooms();
    expect(rooms.length).toBeGreaterThan(0);
  });

  it("every room has required fields", () => {
    const rooms = getAllRooms();
    for (const room of rooms) {
      expect(room.id).toBeTruthy();
      expect(room.name).toBeTruthy();
      expect(room.slug).toBeTruthy();
      expect(room.pricePerNight).toBeGreaterThan(0);
    }
  });
});

describe("getRoomBySlug", () => {
  it("finds a room by slug", () => {
    const room = getRoomBySlug("harbor-view-king");
    expect(room).toBeDefined();
    expect(room?.name).toBe("Harbor View King");
  });

  it("returns undefined for unknown slug", () => {
    expect(getRoomBySlug("nonexistent")).toBeUndefined();
  });
});

describe("getRoomById", () => {
  it("finds a room by ID", () => {
    const room = getRoomById("rm-001");
    expect(room).toBeDefined();
    expect(room?.slug).toBe("harbor-view-king");
  });
});

describe("filterRooms", () => {
  it("filters by category", () => {
    const rooms = filterRooms({ category: "suite" });
    expect(rooms.every((r) => r.category === "suite")).toBe(true);
  });

  it("filters by bed type", () => {
    const rooms = filterRooms({ bedType: "king" });
    expect(rooms.every((r) => r.bedType === "king")).toBe(true);
  });

  it("filters by price range", () => {
    const rooms = filterRooms({ minPrice: 3500, maxPrice: 5000 });
    expect(rooms.every((r) => r.pricePerNight >= 3500 && r.pricePerNight <= 5000)).toBe(true);
  });

  it("filters by guest count", () => {
    const rooms = filterRooms({ guests: 4 });
    expect(rooms.every((r) => r.maxGuests >= 4)).toBe(true);
  });

  it("filters by amenities", () => {
    const rooms = filterRooms({ amenities: ["ocean-view", "balcony"] });
    expect(rooms.every((r) => r.amenities.includes("ocean-view") && r.amenities.includes("balcony"))).toBe(true);
  });

  it("returns all rooms with empty filters", () => {
    const all = getAllRooms();
    const filtered = filterRooms({});
    expect(filtered.length).toBe(all.length);
  });

  // NOTE: No tests for the feature flag toggle between old/new listing
  // NOTE: No tests for the RoomCard component click handlers
  // NOTE: No tests for amenity filter UI interactions
});
