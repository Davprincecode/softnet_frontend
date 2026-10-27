// types/form.ts
export type FieldType = 'text' | 'textarea' | 'number' | 'email' | 'select' | 'radio' | 'checkbox' | 'file' | 'date';

export interface FormField {
  id: string; 
  label: string;
  name: string;
  type: FieldType;
  options: string[]; 
  is_required: boolean;
}

export interface Form {
  id: number;
  name: string;
  slug: string;
  base_price: number;
  description: string;
  fields: FormField[];
}

export interface FormFeature {
  id : string;
  feature: string;
}

export interface Submission {
  form_id: number;
  data: Record<string, any>;
  total_price: number;
}
export interface ServicesForm{
    serviceId : string;
    name : string;
    description : string;
    price : number;
    monthlyPrice : number;
    threeYearsPrice : number;
    yearlyPrice : number;
    feature : ServiceFeature[];
    field : ServiceField[]
}
export interface ServiceFeature{
    feature : string;
    serviceId : string;
}
export interface ServiceField{
        isRequired:boolean;
        label : string;
        name : string;
        options : string;
        serviceId : string;
        type : string;
}

export interface Meta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export interface ServiceOrder {
  id: number | string;
  serviceId: string;
  serviceName: string;
  userId: string | number | null;
  purchaseDate: string;
  price: string | number;
  data: Record<string, unknown>
}

export interface ServiceOrderResponse {
  data: ServiceOrder;
  message: string;
}

export interface ServiceOrdersResponse {
  data: ServiceOrder[];
  links: Record<string, unknown>;
  meta: Record<string, unknown>;
}

export interface menuType{
  homePage: boolean;
  brandLogo: boolean;
  pricing: boolean;
  servicePricing: boolean;
  createService: boolean;
  orders: boolean;
  serviceOrder: boolean;
  booking: boolean;
  scheduleBooking: boolean;
  createBooking: boolean;
  services: boolean;
  servicesList: boolean;
  createServices: boolean;
  team: boolean;
  teamList: boolean;
  createTeam: boolean;
  blog: boolean;
  blogList: boolean;
  createBlog: boolean;
  aboutUs: boolean;
  aboutUsList: boolean;
  createAboutUs: boolean;
  contactUs: boolean;
  contact: boolean;
  menuEmail: boolean;
  address: boolean;
  }

export interface userIntern {
    "name" : string,
    "email" : string,
    "address" : string,
    "phoneNumber" : string,
    "userId" : string,
    "date" : string,
    "role" : string,
    "status" : string,
     menu : menuType
  }

export const permissionGroups = [
  {
    key: "homePage",
    label: "homepage",
    children: [
      { key: "brandLogo", label: "brand logo" },
    ],
  },
  {
    key: "pricing",
    label: "pricing",
    children: [
      { key: "servicePricing", label: "service pricing" },
      { key: "createService", label: "create service" },
    ],
  },
  {
    key: "orders",
    label: "orders",
    children: [
      { key: "serviceOrder", label: "service order" },
    ],
  },
  {
    key: "booking",
    label: "booking",
    children: [
      { key: "scheduleBooking", label: "schedule booking" },
      { key: "createBooking", label: "create booking" },
    ],
  },
  {
    key: "services",
    label: "services",
    children: [
      { key: "servicesList", label: "services list" },
      { key: "createServices", label: "create services" },
    ],
  },
  {
    key: "team",
    label: "team",
    children: [
      { key: "teamList", label: "team list" },
      { key: "createTeam", label: "create team" },
    ],
  },
  {
    key: "blog",
    label: "blog",
    children: [
      { key: "blogList", label: "blog list" },
      { key: "createBlog", label: "create blog" },
    ],
  },
  {
    key: "aboutUs",
    label: "about us",
    children: [
      { key: "aboutUsList", label: "about us list" },
      { key: "createAboutUs", label: "create about us" },
    ],
  },
  {
    key: "contactUs",
    label: "contact us",
    children: [
      { key: "contact", label: "contact" },
      { key: "menuEmail", label: "email" },
      { key: "address", label: "address" },
    ],
  },
] as const;
