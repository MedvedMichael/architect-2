import styled from "styled-components";
import { ProvidedFlat } from "../../providers/provider";

interface FlatCardProps {
  flat: ProvidedFlat;
  onClick: () => void;
}

export default function FlatCard({ flat, onClick }: FlatCardProps) {
  return (
    <FlatCardView onClick={onClick} className={flat.provider}>
      <Title>{`${flat.street} ${flat.houseNumber}`}</Title>
      <SubtitleBlock>
        <Subtitle>{`Rooms: ${flat.rooms}`}</Subtitle>
        <Subtitle>{`Cost: ${flat.cost}`}</Subtitle>
      </SubtitleBlock>
    </FlatCardView>
  );
}

const FlatCardView = styled.div`
  display: flex;
  padding: 0.5rem;
  margin: 0.25rem 0;
  /* max-width: 40rem; */
  border: 1px #b6c9ff solid;
  border-radius: 0.25rem;
  background: #7473db;
  transition: background 0.3s ease;

  &:hover {
    background: #5254df;
  }

  &.filtered {
    background: #28c44f;
    &:hover {
      background: #0aa731;
    }
  }
  &.non-filtered {
    background: #da4141;
    &:hover {
      background: #b12121;
    }
  }
`;

const Title = styled.h2`
  margin: 0.5rem;
`;

const Subtitle = styled.h5`
  margin: auto 0.125rem;
`;

const SubtitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin: auto 0.75rem auto auto;
`;
