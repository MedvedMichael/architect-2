import Provider, {
  Flat,
  ProvidedFlat,
  ProvidedFlatDTO,
} from "./provider";
import SearchQuery from "@interfaces/search-query-interface";
import axios from "axios";


export default class FilteredProvider implements Provider {
  url = 'http://localhost:3001';
  static providerName = "filtered";
  async getFilteredData(query: SearchQuery): Promise<ProvidedFlat[]> {
    const searchParams = new URLSearchParams(query as Record<string, string>);

    const flats = (await axios.get<ProvidedFlat[]>(this.url + "/search?" + searchParams.toString())).data
    return flats.map((flat) => ({
      ...flat,
      provider: FilteredProvider.providerName,
    }));
  }

  async updateFlat(flat: ProvidedFlat): Promise<void> {}
  async createFlat(flatDTO: ProvidedFlatDTO): Promise<ProvidedFlat> {
    return { ...flatDTO, flatID: Math.round(Math.random() * 1000000) };
  }
  async deleteFlat(flat: Flat): Promise<void> {}
}
