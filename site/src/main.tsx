import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { ThemeProvider } from 'styled-components';
import { dark } from './theme/index.ts';
import { ResetCss } from './theme/globalStyles.ts';
import AppRouter from './Routes/routes.tsx';

import './index.css';
createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <RecoilRoot>
         <ThemeProvider theme={dark}>
            <ResetCss />
            <AppRouter />
         </ThemeProvider>
      </RecoilRoot>
   </StrictMode>
);
