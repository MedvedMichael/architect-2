import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { Flat } from "../../providers/provider";
import CheckBox from "../check-box/check-box";
import InputForm from "../input-form/input-form";
import Modal from "../modal/modal";
import { StyledButton } from "../styled-button/styled-button";

interface FlatModelProps {
  onClose: () => void;
  newFlat: Flat;
  setNewFlat: Dispatch<SetStateAction<Flat>>;
  onSubmit: () => void;
  onDelete?: () => void;
}

export default function FlatModal({
  onClose,
  newFlat,
  setNewFlat,
  onSubmit,
  onDelete = () => {},
}: FlatModelProps) {
  const [editMode, setEditMode] = useState(false);
  return (
    <Modal onClose={onClose}>
      <FlatModalBlock>
        <InputForm
          title="UserID"
          type="number"
          startEnabled={editMode}
          value={newFlat.userID || ""}
          onChange={(value) =>
            setNewFlat((q) => ({ ...q, userID: parseInt(value as string) }))
          }
        />
        <InputForm
          title="Cost"
          type="number"
          startEnabled={editMode}
          value={newFlat.cost || ""}
          onChange={(value) =>
            setNewFlat((q) => ({ ...q, cost: parseInt(value as string) }))
          }
        />
        <InputForm
          title="Street"
          type="text"
          startEnabled={editMode}
          value={newFlat.street || ""}
          onChange={(value) =>
            setNewFlat((q) => ({ ...q, street: value as string }))
          }
        />
        <InputForm
          title="House Number"
          type="text"
          startEnabled={editMode}
          value={newFlat.houseNumber || ""}
          onChange={(value) =>
            setNewFlat((q) => ({ ...q, houseNumber: value as string }))
          }
        />
        <InputForm
          title="Rooms"
          type="number"
          startEnabled={editMode}
          value={newFlat.rooms || ""}
          onChange={(value) =>
            setNewFlat((q) => ({ ...q, rooms: parseInt(value as string) }))
          }
        />
        <InputForm
          title="Floor"
          type="number"
          startEnabled={editMode}
          value={newFlat.floor || ""}
          onChange={(value) =>
            setNewFlat((q) => ({ ...q, floor: parseInt(value as string) }))
          }
        />
        <InputForm
          title="Square"
          type="number"
          startEnabled={editMode}
          value={newFlat.square || ""}
          onChange={(value) =>
            setNewFlat((q) => ({ ...q, square: parseInt(value as string) }))
          }
        />
        <InputForm
          title="Apartment Condition"
          type="text"
          startEnabled={editMode}
          value={newFlat.apartmentCondition || ""}
          onChange={(value) =>
            setNewFlat((q) => ({ ...q, apartmentCondition: value as string }))
          }
        />
        <InputForm
          title="Built Year"
          type="number"
          startEnabled={editMode}
          value={newFlat.builtYear || ""}
          onChange={(value) =>
            setNewFlat((q) => ({ ...q, builtYear: parseInt(value as string) }))
          }
        />
        <CheckBox
          value={editMode}
          onClick={() => setEditMode((e) => !e)}
          title="Edit"
        />
        <ButtonBlock>
          <StyledButton
            onClick={() => {
              onSubmit();
              onClose();
            }}
          >
            Save
          </StyledButton>
          <StyledButton
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Delete
          </StyledButton>
        </ButtonBlock>
      </FlatModalBlock>
    </Modal>
  );
}

const FlatModalBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonBlock = styled.div`
  display: flex;
  padding: 0.5rem;
  margin: 0 auto;
`;
