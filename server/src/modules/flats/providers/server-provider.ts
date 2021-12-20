import Provider, {
  Flat,
  ProvidedFlat,
  ProvidedFlatDTO,
} from "./provider";
import SearchQuery from "@interfaces/search-query-interface";
import axios from "axios";
import { FlatsService } from "../flats.service";

const headers = {
  "Content-Type": "application/json",
};

export default class ServerProvider implements Provider {
  static providerName = "server";
  async getFilteredData(query: SearchQuery): Promise<ProvidedFlat[]> {
    const flatsService = new FlatsService()
    const flats = await flatsService.searchFlats(query)
    return flats.map(flat => ({...flat, provider: ServerProvider.providerName}))
  }

  async updateFlat(flat: ProvidedFlat) {
    // const { provider, ...clone } = flat;
    // await fetch(this.url + "/update", {
    //   method: "PATCH",
    //   body: JSON.stringify(clone),
    //   headers,
    // });
  }

  //@ts-ignore
  async createFlat(flatDTO: ProvidedFlatDTO): Promise<ProvidedFlat> {
    // const { provider, ...clone } = flatDTO;
    // const res = await fetch(this.url + "/new", {
    //   method: "POST",
    //   body: JSON.stringify(clone),
    //   headers,
    // });
    // return { ...((await res.json()) as Flat), provider: "main" };
  }

  async deleteFlat({ flatID }: ProvidedFlat): Promise<void> {
    // await fetch(this.url + "/remove", {
    //   method: "DELETE",
    //   body: JSON.stringify({ flatID }),
    //   headers,
    // });
  }
}
