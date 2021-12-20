import Provider, { Flat, ProvidedFlat, ProvidedFlatDTO } from './provider';
import SearchQuery from '@interfaces/search-query-interface';
import {
  Specification,
  MinSpecification,
  MaxSpecification,
  StreetContainsSpecification,
  RoomsSpecification,
} from './specifications';

import axios from 'axios';

export default class NonFilteredProvider implements Provider {
  url = 'http://localhost:3002';
  static providerName = 'non-filtered';

  async getFilteredDataByPriceList(
    query: SearchQuery,
    priceList: { flatID: number }[],
  ): Promise<ProvidedFlat[]> {
    try {
      const promises = priceList.map((item) => {
        return axios.get<ProvidedFlat>(this.url + '/details/' + item.flatID);
      });
      const flats = (await Promise.all(promises)).map((item) => item.data);
      const specifications: Specification[] = [
        MinSpecification,
        MaxSpecification,
        StreetContainsSpecification,
        RoomsSpecification,
      ].map((spec) => new spec(query));

      return flats
        .map((flat) => ({
          ...flat,
          provider: NonFilteredProvider.providerName,
        }))
        .filter((flat) =>
          specifications.every((spec) => spec.isSatisfiedBy(flat)),
        );
    } catch (error) {
      console.log(error);
    }
  }
  async getFilteredData(
    query: SearchQuery,
    saveFunction: (flats: ProvidedFlat[]) => Promise<void>,
  ): Promise<ProvidedFlat[]> {
    let i = 1,
      currData: { flatID: number }[] = [];
    do {
      currData = (
        await axios.get<{ flatID: number }[]>(
          this.url + '/price-list?page=' + i,
        )
      ).data;
      await saveFunction(
        await this.getFilteredDataByPriceList(query, currData),
      );
      i++;
    } while (i < 5);
    return [];
  }

  async updateFlat(flat: ProvidedFlat): Promise<void> {}
  async createFlat(flatDTO: ProvidedFlatDTO): Promise<ProvidedFlat> {
    return { ...flatDTO, flatID: Math.round(Math.random() * 1000000) };
  }
  async deleteFlat(flat: Flat): Promise<void> {}
}
