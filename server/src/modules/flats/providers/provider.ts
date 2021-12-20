import SearchQuery from '@interfaces/search-query-interface';
export interface FlatDTO {
  userID: number;
  cost: number;
  street: string;
  houseNumber: string;
  rooms: number;
  floor: number;
  square: number;
  apartmentCondition: string;
  builtYear: number;
}
export interface Flat extends FlatDTO {
  flatID: number;
}

export interface ProvidedFlatDTO extends FlatDTO {
  provider?: string;
}

export interface ProvidedFlat extends Flat {
  provider?: string;
}

export default interface Provider {
  url?: string;
  getFilteredData: (
    query: SearchQuery,
    saveFunction?: (flats: ProvidedFlat[]) => Promise<void>
  ) => Promise<ProvidedFlat[]>;
  updateFlat: (flat: ProvidedFlat) => Promise<void>;
  createFlat: (flatDTO: ProvidedFlatDTO) => Promise<ProvidedFlat>;
  deleteFlat: (flat: ProvidedFlat) => Promise<void>;
}
