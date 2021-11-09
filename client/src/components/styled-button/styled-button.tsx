import styled from 'styled-components';

export const StyledButton = styled.button`
  background: #4341c4;
  color: #fff;
  border-radius: 0.5rem;
  border: 1px #b6c9ff solid;
  padding: 1rem;
  text-align: center;
  transition: background 0.1s ease;
  &:hover {
    cursor: pointer;
    background: #5254df;
  }

  &.register {
    margin: 0.75rem;
  }

  &.bold {
    font-size: x-large;
    font-weight: bold;
    padding: 1rem 3rem;
  }

  &.small {
    padding: 0.5rem;
  }
`;
