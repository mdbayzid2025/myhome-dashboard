export interface ListingDetail {
  id: number;
  featured: boolean;
  title: string;
  address: string;
  price: string;
  period: string;
  propertyType: string;
  listingType: "For Rent" | "For Sale";
  beds: number;
  baths: number;
  receptions: number;
  sqft: number;
  councilTax: string;
  tenure: string;
  epcRating: string;
  availableFrom: string;
  description: string;
  features: string[];
  agent: {
    name: string;
    agency: string;
    phone: string;
    email: string;
  };
  stats: {
    views: number;
    enquiries: number;
    saves: number;
  };
  status: "active" | "pending" | "sold" | "rejected";
  publishedDate: string;
  images: number; // count
}