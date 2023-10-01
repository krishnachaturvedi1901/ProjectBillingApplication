export interface AdminType {
  id: string;
  company: string;
  companyLogo: string;
  email: string;
  password: string;
  gstin: string;
  address: string;
  contact: string;
  pancard: string;
  invoiceNo: number;
}
export interface ClientType {
  id: number;
  clientName: string;
  email: string;
  contact: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  gstin: string;
  adminId: number;
  conversionRate: number;
}
export interface ProjectType {
  id: number;
  projectName: string;
  projectManager: string;
  periodFrom: string;
  periodTo: string;
  ratePerHour: number;
  workingHours: number;
  gstin: string;
  conversionRate: number;
  paymentStatus: boolean;
  adminId: number;
  clientId: number;
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
