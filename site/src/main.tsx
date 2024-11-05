import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { ThemeProvider } from 'styled-components';
import { dark } from './theme/index.ts';
import { ResetCss } from './theme/globalStyles.ts';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <RecoilRoot>
         <ThemeProvider theme={dark}>
            <ResetCss />
            <App />
         </ThemeProvider>
      </RecoilRoot>
   </StrictMode>
);
