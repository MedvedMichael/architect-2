import Provider, {
  Flat,
  ProvidedFlat,
  ProvidedFlatDTO,
} from "./provider";
import SearchQuery from "../interfaces/search-query-interface";
import {
  Specification,
  MinSpecification,
  MaxSpecification,
  StreetContainsSpecification,
  RoomsSpecification,
} from "./specifications";

export default class NonFilteredProvider implements Provider {
  url = "http://localhost:3002";
  static providerName = "non-filtered";
  private flats!: Flat[];

  async getFilteredData(query: SearchQuery): Promise<ProvidedFlat[]> {
    if (!this.flats) {
      const res = await fetch(this.url + "/price-list", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const priceList: { flatID: number; cost: number; summary: string }[] =
        await res.json();

      const promises = priceList.map((item) =>
        fetch(this.url + "/details/" + item.flatID, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json())
      );
      const flats = await Promise.all(promises);
      this.flats = flats;
    }
    const specifications: Specification[] = [
      MinSpecification,
      MaxSpecification,
      StreetContainsSpecification,
      RoomsSpecification,
    ].map((spec) => new spec(query));

    return this.flats
      .map((flat) => ({ ...flat, provider: NonFilteredProvider.providerName }))
      .filter((flat) =>
        specifications.every((spec) => spec.isSatisfiedBy(flat))
      );
  }

  async updateFlat(flat: ProvidedFlat): Promise<void> {}
  async createFlat(flatDTO: ProvidedFlatDTO): Promise<ProvidedFlat> {
    return { ...flatDTO, flatID: Math.round(Math.random() * 1000000) };
  }
  async deleteFlat(flat: Flat): Promise<void> {}
}
