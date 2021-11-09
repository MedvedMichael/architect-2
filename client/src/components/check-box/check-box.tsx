import styled from "styled-components";

export default function CheckBox({
  value,
  onClick,
  title = "",
}: {
  value: boolean;
  title?: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <CheckBoxView>
      <label htmlFor="onlyServerCheck">{title}</label>
      <input
        type="checkbox"
        id="onlyServerCheck"
        checked={value}
        onChange={onClick}
      />
    </CheckBoxView>
  );
}


const CheckBoxView = styled.div`
  display: flex;
  margin: auto;
  padding: 0.5rem;

  & input {
    margin: auto 0;
    font-size: 5rem;
  }

  & * {
    margin: 0.5rem;
  }
`;

