import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import FlatList from "../components/flat-list/flat-list";
import Provider, { ProvidedFlat, ProvidedFlatDTO } from "../providers/provider";
import SearchQuery from "../interfaces/search-query-interface";
import MainProvider from "../providers/main-provider";
import InputForm from "../components/input-form/input-form";
import CheckBox from "../components/check-box/check-box";
import { StyledButton } from "../components/styled-button/styled-button";

export default function MainPage(): JSX.Element {
  const [flats, setFlats] = useState<ProvidedFlat[]>([]);
  const [onlyServer, setOnlyServer] = useState(false);
  const provider: Provider = useMemo(
    () => new MainProvider(onlyServer),
    [onlyServer]
  );
  const [query, setQuery] = useState<SearchQuery>({});

  useEffect(() => {
    renewData();
  }, []);

  const renewData = async () => {
    const providedFlats = await provider.getFilteredData(query);
    setFlats(providedFlats.flat(1).sort(() => (Math.random() > 0.5 ? 1 : -1)));
  };

  const disableProperty = (name: string) => {
    setQuery((q) => {
      const q1 = q as Record<string, unknown>
      if (q1[name]) delete q1[name];
      return { ...q1 };
    });
  };

  const onFlatUpdate = async (flat: ProvidedFlat) => {
    await provider.updateFlat(flat);
    setFlats((flats) => {
      const oldFlatIndex = flats.findIndex(
        (f) => f.flatID === flat.flatID && f.provider === flat.provider
      );
      if (oldFlatIndex !== -1) {
        flats.splice(oldFlatIndex, 1, flat);
      }
      return [...flats];
    });
  };

  const onFlatCreate = async (flat: ProvidedFlatDTO) => {
    const serverFlat = await provider.createFlat(flat);
    setFlats((f) => [serverFlat, ...f]);
  };

  const onFlatDelete = (flat: ProvidedFlat) => {
    provider.deleteFlat(flat)
    setFlats((flats) => {
      const oldFlatIndex = flats.findIndex(
        (f) => f.flatID === flat.flatID && f.provider === flat.provider
      );
      if (oldFlatIndex !== -1) {
        flats.splice(oldFlatIndex, 1);
      }
      return [...flats];
    });
  };

  return (
    <MainPageView>
      <InputBar>
        <InputForm
          title="Street"
          type="text"
          tickEnabled={() => disableProperty("street")}
          value={query.street || ""}
          onChange={(value) =>
            setQuery((q) => ({ ...q, street: value as string }))
          }
        />
        <InputForm
          title="Rooms"
          type="number"
          tickEnabled={() => disableProperty("rooms")}
          value={query.rooms || ""}
          onChange={(value) =>
            setQuery((q) => ({ ...q, rooms: parseInt(value as string) }))
          }
        />
        <InputForm
          title="Min Price"
          type="number"
          tickEnabled={() => disableProperty("minPrice")}
          value={query.minPrice || ""}
          onChange={(value) =>
            setQuery((q) => ({ ...q, minPrice: parseInt(value as string) }))
          }
        />

        <InputForm
          title="Max Price"
          type="number"
          tickEnabled={() => disableProperty("maxPrice")}
          value={query.maxPrice || ""}
          onChange={(value) =>
            setQuery((q) => ({ ...q, maxPrice: parseInt(value as string) }))
          }
        />
        <CheckBox
          title="Only server"
          value={onlyServer}
          onClick={() => setOnlyServer((value) => !value)}
        />
        <StyledButton onClick={renewData}>Search</StyledButton>
      </InputBar>

      <FlatList
        onFlatDelete={onFlatDelete}
        onFlatCreate={onFlatCreate}
        onFlatUpdate={onFlatUpdate}
        flats={flats}
      />
    </MainPageView>
  );
}

const MainPageView = styled.div`
  display: flex;
  /* justify-content: center;    */
  flex-direction: column;
  padding: 1rem;
`;

const InputBar = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: #5957dd;
  & * {
    margin: 0.25rem;
    font-size: 1.25rem;
  }
`;
