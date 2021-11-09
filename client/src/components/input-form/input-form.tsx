import { useEffect, useState } from "react";
import styled from "styled-components";
import CheckBox from "../check-box/check-box";

export default function InputForm({
  value,
  title,
  onChange,
  type,
  startEnabled = false,
  tickEnabled,
}: {
  value: string | number;
  title: string;
  type: string;
  startEnabled?: boolean;
  tickEnabled?: () => void;

  onChange: (value: string | number) => void;
}): JSX.Element {
  const [enabled, setEnabled] = useState(startEnabled);
  useEffect(() => {
    setEnabled(startEnabled);
  }, [startEnabled]);
  return (
    <InputFormView>
      <h4>{title}</h4>
      <input
        disabled={!enabled}
        type={type}
        min={0}
        value={value}
        onChange={({ target }) => onChange(target.value)}
      />
      {tickEnabled ? (
        <CheckBox
          value={enabled}
          onClick={() => {
            setEnabled((e) => !e);
            tickEnabled?.();
          }}
        />
      ) : null}
    </InputFormView>
  );
}

const InputFormView = styled.div`
  display: flex;
  padding: 0.5rem;

  & input {
    background: #7473db;
    border: 1px #b6c9ff solid;
    border-radius: 0.25rem;
    color: white;
  }

  & h4 {
    margin: 0.25rem;
  }
`;
