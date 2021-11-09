import  { Dispatch, SetStateAction, useState } from "react";
import {
  Flat,
  ProvidedFlat,
  ProvidedFlatDTO,
} from "../../providers/provider";
import styled from "styled-components";
import FlatCard from "./flat-card";
import FlatModal from "./flat-modal";
import { StyledButton } from "../styled-button/styled-button";

const startFlat: ProvidedFlatDTO = {
  userID: 81,
  cost: 10000,
  street: "",
  houseNumber: "",
  rooms: 1,
  floor: 1,
  square: 1,
  apartmentCondition: "",
  builtYear: 2000,
  provider: 'server'
};

interface FlatListProps {
  flats: ProvidedFlat[];
  onFlatUpdate: (flat: ProvidedFlat) => void;
  onFlatCreate: (flatDTO: ProvidedFlatDTO) => void;
  onFlatDelete: (flat: ProvidedFlat) => void;
}
export default function FlatList({
  flats,
  onFlatUpdate,
  onFlatCreate,
  onFlatDelete,
}: FlatListProps): JSX.Element {
  const [showModal, setShowModal] = useState<"update" | "create" | undefined>();
  const [newFlat, setNewFlat] = useState<ProvidedFlat>();
  const updateFlat = async () => {
    if (newFlat) {
      onFlatUpdate(newFlat);
    }
  };
  const createFlat = async () => {
    if (newFlat) {
      const { flatID, ...clone } = newFlat;
      onFlatCreate(clone);
    }
  };

  const deleteFlat = () => {
    if (newFlat) {
      onFlatDelete(newFlat);
    }
  };

  const updateModal =
    showModal === "update" && newFlat ? (
      <FlatModal
        onDelete={deleteFlat}
        onSubmit={updateFlat}
        onClose={() => setShowModal(undefined)}
        newFlat={newFlat}
        setNewFlat={setNewFlat as Dispatch<SetStateAction<Flat>>}
      />
    ) : null;

  const createModal =
    showModal === "create" && newFlat ? (
      <FlatModal
        onSubmit={createFlat}
        onClose={() => setShowModal(undefined)}
        newFlat={newFlat}
        setNewFlat={setNewFlat as Dispatch<SetStateAction<Flat>>}
      />
    ) : null;

  const flatsViews = flats.map((flat) => (
    <FlatCard
      onClick={() => {
        setNewFlat({ ...flat });
        setShowModal("update");
      }}
      key={`flat-${flat.provider}-${flat.flatID}`}
      flat={flat}
    />
  ));
  return (
    <FlatListWrapper>
      {updateModal}
      {createModal}
      <FlatListView>
        <FlatListWrapper>
          <Title>Flats</Title>
          <StyledButton
            onClick={() => {
              setNewFlat({ ...startFlat, flatID: -1 });
              setShowModal("create");
            }}
          >
            +
          </StyledButton>
        </FlatListWrapper>
        {flatsViews}
      </FlatListView>
    </FlatListWrapper>
  );
}

const FlatListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FlatListView = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40rem;
  flex-grow: 1;
  /* min-width: 20rem; */

  /* margin: 0 auto; */
  justify-content: center;
  padding: 1rem;
`;

const Title = styled.h1`
  text-align: center;
  margin: 1rem;
`;
