export interface Property {
  id: number;
  address: string;
  afterRepairValue: number;
  county: string;
  auctionMonth: number;
  foreclosureAmount: number;
  beds: number;
  baths: number;
  square: number;
  builtDate: string;
  loanScore: number | string;
  image: string;
  lat: number;
  lng: number;
}

export interface PropertiesResponse {
  count: number;
  results: Property[];
}

export interface PropertyFilters {
  county?: string | null;
  month?: number | null;
  beds?: string | null;
  beds_exact?: number | null;
  baths?: string | null;
  arv_from?: number | null;
  arv_to?: number | null;
  fa_from?: number | null;
  fa_to?: number | null;
  loan_from?: number | null;
  loan_to?: number | null;
  year_from?: number | null;
  year_to?: number | null;
  sq_from?: number | null;
  sq_to?: number | null;
  incomplete_data?: boolean | null;
  sort_by?: 'foreclosureAmount' | 'afterRepairValue' | 'address' | null;
  order?: 'asc' | 'desc' | null;
}
