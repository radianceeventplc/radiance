export interface ServiceOffering {
  number: string;
  title: string;
  items: string[];
}

export interface ServiceContent {
  slug: string;
  navLabel: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  heroImage: string;
  offeringsLead: string;
  offerings: ServiceOffering[];
  ctaLabel: string;
  ctaNote: string;
  /**
   * Gallery category(ies) to surface on this service page.
   * If empty, the gallery section is omitted.
   */
  galleryCategories: ("WEDDINGS" | "BIRTHDAYS" | "CORPORATE" | "DECORATIONS" | "BEHIND_THE_SCENES")[];
}

export const servicesContent: ServiceContent[] = [
  {
    slug: "weddings",
    navLabel: "Weddings",
    eyebrow: "Weddings",
    titleLine1: "Timeless Love,",
    titleLine2: "Beautifully Celebrated",
    lead: "From traditional ceremonies to elegant modern celebrations, we craft weddings that honor your story, your culture, and the people who matter most. Every detail considered. Every moment, intentional.",
    heroImage: "https://picsum.photos/id/98/1600/900",
    offeringsLead:
      "Comprehensive wedding services tailored to every couple's vision — from intimate ceremonies to multi-day celebrations.",
    offerings: [
      {
        number: "01",
        title: "Full Wedding Planning",
        items: [
          "Complete End-to-End Planning",
          "Timeline & Budget Management",
          "Venue & Vendor Selection",
          "Wedding Styling & Décor",
          "Beauty & Bridal Coordination",
          "Post-Event Support",
        ],
      },
      {
        number: "02",
        title: "Cultural Celebrations",
        items: [
          "Traditional Ethiopian Weddings",
          "Engagement Ceremonies",
          "Multi-Day Cultural Events",
          "Cultural Décor & Styling",
          "Local Traditions Integration",
          "Family Coordination",
        ],
      },
      {
        number: "03",
        title: "Day-Of Coordination",
        items: [
          "Entertainment Coordination",
          "Photography & Videography",
          "Guest Hospitality Services",
          "Transportation & Logistics",
          "Vendor Day Management",
          "Emergency Contingencies",
        ],
      },
      {
        number: "04",
        title: "Honeymoon Planning",
        items: [
          "Honeymoon Package Design",
          "Travel & Flight Coordination",
          "Accommodation Booking",
          "Romantic Itinerary Planning",
          "International Arrangements",
          "Surprise Elements",
        ],
      },
    ],
    ctaLabel: "Plan My Wedding",
    ctaNote: "Every wedding is as unique as the couple. Let's start with your story.",
    galleryCategories: ["WEDDINGS"],
  },
  {
    slug: "social-events",
    navLabel: "Social Events",
    eyebrow: "Social Events",
    titleLine1: "Memorable Moments,",
    titleLine2: "Beautifully Shared",
    lead: "From milestone birthdays and engagement parties to intimate dinners and family gatherings, we plan celebrations that feel personal, polished, and full of meaning.",
    heroImage: "https://picsum.photos/id/106/1600/900",
    offeringsLead:
      "Stylish private celebrations executed with elegance and personal attention to every detail.",
    offerings: [
      {
        number: "01",
        title: "Milestone Celebrations",
        items: [
          "Birthday Parties (All Ages)",
          "Anniversary Celebrations",
          "Graduation Parties",
          "Retirement Events",
          "Family Milestones",
        ],
      },
      {
        number: "02",
        title: "Pre-Wedding Events",
        items: [
          "Bridal Showers",
          "Engagement Parties",
          "Baby Showers",
          "Hen & Stag Parties",
          "Couples' Celebrations",
        ],
      },
      {
        number: "03",
        title: "Private Luxury Events",
        items: [
          "Private Dinners & Soirées",
          "Family Gatherings",
          "VIP Celebrations",
          "Intimate Events",
          "High-End Private Experiences",
        ],
      },
    ],
    ctaLabel: "Plan My Celebration",
    ctaNote: "No celebration is too big or too intimate. We handle every detail with equal care.",
    galleryCategories: ["BIRTHDAYS"],
  },
  {
    slug: "destination",
    navLabel: "Destination",
    eyebrow: "Destination Events",
    titleLine1: "Extraordinary Escapes,",
    titleLine2: "Seamlessly Crafted",
    lead: "Wherever you dream of celebrating — across Ethiopia, around Africa, or anywhere in the world — we manage every detail of the journey, the venue, and the experience.",
    heroImage: "https://picsum.photos/id/15/1600/900",
    offeringsLead:
      "Global event management for couples and clients who want their celebration somewhere truly special.",
    offerings: [
      {
        number: "01",
        title: "Local Weddings",
        items: [
          "Addis Ababa Premium Venues",
          "Ethiopian Destination Sites",
          "Full Local Coordination",
          "Cultural Integration",
          "Trusted Local Vendor Network",
        ],
      },
      {
        number: "02",
        title: "African Destinations",
        items: [
          "Pan-African Wedding Planning",
          "Cross-Border Coordination",
          "Multi-Cultural Events",
          "Destination Scouting",
          "Travel & Logistics",
        ],
      },
      {
        number: "03",
        title: "International Weddings",
        items: [
          "Global Destination Planning",
          "International Vendor Network",
          "Documentation & Legal Support",
          "Guest Travel Coordination",
          "Honeymoon Integration",
        ],
      },
    ],
    ctaLabel: "Plan My Destination Event",
    ctaNote: "Wherever you dream of saying \"I do\" — we'll make it happen, beautifully.",
    galleryCategories: ["WEDDINGS", "DECORATIONS"],
  },
  {
    slug: "corporate",
    navLabel: "Corporate",
    eyebrow: "Corporate Events",
    titleLine1: "Brand Stories,",
    titleLine2: "Elegantly Produced",
    lead: "Professional, polished, and perfectly on-brand. We design and produce corporate experiences that engage your audience, elevate your presence, and leave a lasting impression.",
    heroImage: "https://picsum.photos/id/20/1600/900",
    offeringsLead:
      "Full corporate event production — from intimate executive retreats to large-scale brand activations.",
    offerings: [
      {
        number: "01",
        title: "Corporate Gatherings",
        items: [
          "Company Events & Parties",
          "Gala Dinners",
          "Networking Events",
          "Award Ceremonies",
          "Staff Appreciation Events",
        ],
      },
      {
        number: "02",
        title: "Business Events",
        items: [
          "Conferences & Seminars",
          "Product Launches",
          "Brand Activation Events",
          "Trade Exhibitions",
          "Press & Media Events",
        ],
      },
      {
        number: "03",
        title: "Team & Culture",
        items: [
          "Team Building Events",
          "Company Retreats",
          "Leadership Gatherings",
          "Workshops & Training",
          "Internal Milestone Celebrations",
        ],
      },
    ],
    ctaLabel: "Plan My Corporate Event",
    ctaNote: "Professional, polished, and perfectly on-brand — your corporate events deserve the best.",
    galleryCategories: ["CORPORATE"],
  },
];

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return servicesContent.find((service) => service.slug === slug);
}
