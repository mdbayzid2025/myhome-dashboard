export type ListingStatus = "active" | "pending" | "sold" | "rejected";
export type ListingPeriod = "pcm" | "";

export interface Listing {
  id: number;
  featured: boolean;
  features: string[];
  title: string;
  address: string;
  beds: number;
  baths: number;
  photos: number;
  agent: { name: string; phone: string; email: string };
  agency: string;
  price: string;
  period: ListingPeriod;
  type: "Rent" | "Sale";
  subType: string;
  views: number;
  leads: number;
  status: ListingStatus;
}

export const listingsData: Listing[] = [
  { id:1, featured:true,  title:"Modern 2 Bedroom Apartment",features: ["Modern Kitchen", "Central Heating", "Garden", "Parking", "Balcony", "Ensuite"], address:"123 Market Street, Manchester", beds:2, baths:1, photos:12, 
    agent:{name: "Sarah Williams", phone: '01234567890', email: 'sarah.williams@example.com'},  agency:"Premium Estates",  price:"£950",     period:"pcm", type:"Rent", subType:"Apartment", views:342, leads:12, status:"active"   },
  { id:2, featured:false, title:"Victorian Terrace House",   features: ["Modern Kitchen", "Central Heating", "Garden", "Parking", "Balcony", "Ensuite"], address:"45 Oak Lane, Birmingham",       beds:3, baths:2, photos:18, 
    agent:{name: "James Anderson", phone: '01234567890', email: 'james.anderson@example.com'}, agency:"City Properties",  price:"£425,000", period:"",    type:"Sale", subType:"House",      views:156, leads:8,  status:"active"   },
  { id:3, featured:false, title:"Luxury Penthouse Suite",    features: ["Modern Kitchen", "Central Heating", "Garden", "Parking", "Balcony", "Ensuite"], address:"10 Tower Bridge, London",       beds:3, baths:3, photos:15, 
    agent:{name: "Emma Thompson", phone: '01234567890', email: 'emma.thompson@example.com'},  agency:"Luxury Living",    price:"£3,500",   period:"pcm", type:"Rent", subType:"Penthouse",  views:0,   leads:0,  status:"pending"  },
  { id:4, featured:false, title:"Cozy Studio Flat",          features: ["Modern Kitchen", "Central Heating", "Garden", "Parking", "Balcony", "Ensuite"], address:"22 High Street, Leeds",         beds:1, baths:1, photos:6,  
    agent:{name: "Michael Brown", phone: '01234567890', email: 'michael.brown@example.com'},  agency:"Student Lets",     price:"£650",     period:"pcm", type:"Rent", subType:"Studio",     views:0,   leads:0,  status:"pending"  },
  { id:5, featured:false, title:"Family Home with Garden",   features: ["Modern Kitchen", "Central Heating", "Garden", "Parking", "Balcony", "Ensuite"], address:"8 Park Avenue, Bristol",        beds:4, baths:2, photos:20, 
    agent:{name: "Lucy Davies", phone: '01234567890', email: 'lucy.davies@example.com'},    agency:"Family Homes UK",  price:"£585,000", period:"",    type:"Sale", subType:"House",      views:234, leads:15, status:"sold"     },
  { id:6, featured:false, title:"City Centre Loft",          features: ["Modern Kitchen", "Central Heating", "Garden", "Parking", "Balcony", "Ensuite"], address:"15 Canal Street, Manchester",   beds:2, baths:1, photos:4,  
    agent:{name: "David Wilson", phone: '01234567890', email: 'david.wilson@example.com'},   agency:"Urban Living",     price:"£1,200",   period:"pcm", type:"Rent", subType:"Loft",       views:0,   leads:0,  status:"rejected" },
];