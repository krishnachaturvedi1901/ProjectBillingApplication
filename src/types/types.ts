export interface AdminType {
  _id?: string;
  companyName: string;
  companyLogo: string;
  email: string;
  password: string;
  gistin: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  contactNo: string;
  pancardNo: string;
  invoiceNo: number;
}
export interface ClientType {
  _id?: string;
  clientName: string;
  email: string;
  contactNo: string;
  pancardNo: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  gistin: string;
  user: string;
  conversionRate: number;
  sameState?: boolean;
}
export interface ProjectType {
  _id?: number;
  projectName: string;
  projectManager?: string;
  periodFrom: string;
  periodTo: string;
  rate?: number;
  workingPeriod?: number | null;
  workingPeriodType: "hours" | "months";
  currencyType: "rupees" | "dollars";
  conversionRate: number;
  paymentStatus: boolean;
  adminId: string;
  clientId: string;
  amount?: number | null;
}
export interface InvoiceType {
  id: number;
  invoiceNo: number;
  billDate: string;
  dueDate: string;
  amountWithoutTax: number;
  amountAfterTax: number;
  clientId: number;
  adminId: number;
  projects: number[];
}
export interface LoginDataType {
  email: string;
  password: string;
}
export interface DecodedTokenDataType {
  id: string;
  exp: number;
  iat: number;
}
export type CountryInfoType = {
  name: string;
  isoCode: string;
  flag: string;
  phonecode: string;
  currency: string;
  latitude: string;
  longitude: string;
  timezones?: [] | undefined;
};
export type StateInfoType = {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude?: string;
  longitude?: string;
};
export type CityInfoType = {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude?: string;
  longitude?: string;
};
export interface UpdateProjectDataType {
  projectName?: string;
  projectManager?: string;
  periodFrom?: string;
  periodTo?: string;
  ratePerHour?: number;
  workingHours?: number;
  isDollar?: boolean;
  conversionRate?: number;
  paymentStatus?: boolean;
  amount?: number;
}
