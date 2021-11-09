import FilteredProvider from "./filtered-provider";
import NonFilteredProvider from "./non-filtered-provider";
import Provider, {
  ProvidedFlat,
  ProvidedFlatDTO,
} from "./provider";
import SearchQuery from "../interfaces/search-query-interface";
import ServerProvider from "./server-provider";

const providers: { provider: Provider; name: string }[] = [
  FilteredProvider,
  NonFilteredProvider,
  ServerProvider,
].map((providerClass) => ({
  provider: new providerClass(),
  name: providerClass.providerName,
}));


export default class MainProvider implements Provider {
  constructor(private onlyServer: boolean = false) {}

  async getFilteredData(query: SearchQuery): Promise<ProvidedFlat[]> {
    if (!this.onlyServer) {
      const res = await Promise.all(
        providers.map(({ provider }) => provider.getFilteredData(query))
      );
      return res.flat(1);
    } else
      return (
        providers
          .find(({ name }) => name === ServerProvider.providerName)
          ?.provider.getFilteredData(query) || []
      );
  }

  async updateFlat(flat: ProvidedFlat): Promise<void> {
    return providers
      .find((p) => p.name === flat.provider)
      ?.provider.updateFlat(flat);
  }
  async createFlat(flatDTO: ProvidedFlatDTO): Promise<ProvidedFlat> {
    return (await providers
      .find((p) => p.name === flatDTO.provider)
      ?.provider.createFlat(flatDTO)) as ProvidedFlat;
  }
  async deleteFlat(flat: ProvidedFlat): Promise<void> {
    return providers
      .find((p) => p.name === flat.provider)
      ?.provider.deleteFlat(flat);
  }
}
