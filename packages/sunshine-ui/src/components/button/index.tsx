import { defaultTheme, Theme } from '@sunshine/sunshine-ui/src/theme';
import React from 'react';
import styled from 'styled-components';
import { color, layout, space } from 'styled-system';

const ButtonStyled = styled.button<{ theme: Theme }>`
  border: 1px solid black;
  padding: 5px 10px;
  border-radius: 5px;
  background: ${({ theme }: { theme: Theme }) => theme.colors.primary};
  ${space}
  ${color}
  ${layout}
`;

ButtonStyled.defaultProps = { theme: defaultTheme };

export const Button: React.FC = props => {
  return <ButtonStyled>{props.children}</ButtonStyled>;
};
