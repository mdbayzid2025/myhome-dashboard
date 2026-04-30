import type { Enquiry } from "../types/enquiry";


export const enquiries: Enquiry[] = [
  {
    id: "1",
    date: "28 Mar 2026",
    property: {
      title: "Modern 3-Bed Apartment in Canary Wharf",
      price: "£650,000",
      image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
      location: "London E14",
    },
    seeker: {
      name: "John Smith",
      email: "john@email.com",
      phone: "07700 900123",
    },
    agent: {
      name: "Sarah Johnson",
      company: "Prestige Properties",
    },
    message: "Hi, I'm interested in viewing this property. Is it still available?",
  },
  {
    id: "2",
    date: "27 Mar 2026",
    property: {
      title: "Luxury Penthouse with Thames View",
      price: "£1,250,000",
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
      location: "London",
    },
    seeker: {
      name: "David Brown",
      email: "david@email.com",
      phone: "07700 900456",
    },
    agent: {
      name: "Emma Thompson",
      company: "Luxury Homes Ltd",
    },
    message: "Can I schedule a visit this weekend?",
  },
];