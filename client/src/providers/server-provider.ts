import Provider, {
  Flat,
  ProvidedFlat,
  ProvidedFlatDTO,
} from "./provider";
import SearchQuery from "../interfaces/search-query-interface";

const headers = {
  "Content-Type": "application/json",
};

export default class ServerProvider implements Provider {
  url = process.env.REACT_APP_SERVER_URL + '/flats';
  static providerName = "server";
  async getFilteredData(query: SearchQuery): Promise<ProvidedFlat[]> {
    const searchParams = new URLSearchParams(query as Record<string, string>);

    const res = await fetch(this.url + "/search?" + searchParams.toString(), {
      headers,
    });
    const flats = (await res.json()) as Flat[];
    return flats.map((flat) => ({ ...flat, provider: ServerProvider.providerName }));
  }

  async updateFlat(flat: ProvidedFlat) {
    const { provider, ...clone } = flat;
    await fetch(this.url + "/update", {
      method: "PATCH",
      body: JSON.stringify(clone),
      headers,
    });
  }

  async createFlat(flatDTO: ProvidedFlatDTO): Promise<ProvidedFlat> {
    const { provider, ...clone } = flatDTO;
    const res = await fetch(this.url + "/new", {
      method: "POST",
      body: JSON.stringify(clone),
      headers,
    });
    return { ...((await res.json()) as Flat), provider: "main" };
  }

  async deleteFlat({ flatID }: ProvidedFlat): Promise<void> {
    await fetch(this.url + "/remove", {
      method: "DELETE",
      body: JSON.stringify({ flatID }),
      headers,
    });
  }
}
