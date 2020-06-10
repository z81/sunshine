import { Button } from '@sunshine/sunshine-ui/src';
import { defaultTheme } from '@sunshine/sunshine-ui/src/theme';
import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'styled-components';

render(
  <ThemeProvider theme={defaultTheme}>
    <div>
      <Button>Button</Button>
    </div>
  </ThemeProvider>,
  document.getElementById('root'),
);
