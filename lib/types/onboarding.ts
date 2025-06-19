import { z } from "zod";

// Business Types
export const BusinessTypeSchema = z.enum([
  "beauty_aesthetic",
  "salon",
  "massage_center",
  "cafe_restaurant_takeaway",
  "other"
]);

export type BusinessType = z.infer<typeof BusinessTypeSchema>;

// Service Types
export const ServiceTypeSchema = z.enum([
  "social_media_booking",
  "social_media_ordering",
  "table_booking",
  "takeaway_orders",
  "ai_call_agent",
  "social_media_marketing"
]);

export type ServiceType = z.infer<typeof ServiceTypeSchema>;

// Store Information
export const StoreInfoSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters"),
  businessType: BusinessTypeSchema.optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  website: z.string().url().optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type StoreInfo = z.infer<typeof StoreInfoSchema>;

// Service Selection
export const ServiceSelectionSchema = z.object({
  selectedServices: z.array(ServiceTypeSchema).min(1, "Please select at least one service"),
  squareIntegration: z.boolean().optional(),
  marketingFrequency: z.enum(["weekly", "biweekly", "monthly"]).optional(),
});

export type ServiceSelection = z.infer<typeof ServiceSelectionSchema>;

// Complete Onboarding Data
export const OnboardingSchema = StoreInfoSchema.merge(ServiceSelectionSchema);

export type OnboardingData = z.infer<typeof OnboardingSchema>;

// Business Type Configuration
export const BusinessTypeConfig = {
  beauty_aesthetic: {
    label: "Beauty & Aesthetic",
    description: "Beauty salons, aesthetic clinics, and beauty services",
    availableServices: ["social_media_booking", "ai_call_agent", "social_media_marketing"],
    requiresSquare: true,
  },
  salon: {
    label: "Salon",
    description: "Hair salons, nail salons, and beauty salons",
    availableServices: ["social_media_booking", "ai_call_agent", "social_media_marketing"],
    requiresSquare: true,
  },
  massage_center: {
    label: "Massage Center",
    description: "Massage therapy, spa services, and wellness centers",
    availableServices: ["social_media_booking", "ai_call_agent", "social_media_marketing"],
    requiresSquare: true,
  },
  cafe_restaurant_takeaway: {
    label: "Cafe / Restaurant / Takeaway",
    description: "Food service businesses, restaurants, and cafes",
    availableServices: ["social_media_ordering", "table_booking", "takeaway_orders", "ai_call_agent", "social_media_marketing"],
    requiresSquare: false,
  },
  other: {
    label: "Other Business Type",
    description: "Custom business setup - contact us for details",
    availableServices: [],
    requiresSquare: false,
  },
} as const;

// Service Configuration
export const ServiceConfig = {
  social_media_booking: {
    label: "Social Media Appointment Booking",
    description: "Accept appointments through social media chat",
    icon: "💬",
    requiresSquare: true,
  },
  social_media_ordering: {
    label: "Social Media Food Ordering",
    description: "Accept food orders through social media chat",
    icon: "🍽️",
    requiresSquare: true,
  },
  table_booking: {
    label: "Table Reservation System",
    description: "Manage table bookings and reservations",
    icon: "🪑",
    requiresSquare: false,
  },
  takeaway_orders: {
    label: "Takeaway Order Management",
    description: "Handle takeaway and delivery orders",
    icon: "📦",
    requiresSquare: true,
  },
  ai_call_agent: {
    label: "AI Call Agent",
    description: "AI agent handles phone calls for bookings and orders",
    icon: "📞",
    requiresSquare: false,
  },
  social_media_marketing: {
    label: "Social Media Marketing Agent",
    description: "AI-powered marketing content creation and planning",
    icon: "📱",
    requiresSquare: false,
  },
} as const; 