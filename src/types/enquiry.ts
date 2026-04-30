export interface Enquiry {
  id: string;
  date: string;
  property: {
    title: string;
    price: string;
    image: string;
    location: string;
  };
  seeker: {
    name: string;
    email: string;
    phone: string;
  };
  agent: {
    name: string;
    company: string;
  };
  message: string;
}