import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import AppRouter from './routes';

import { dark } from './theme';
import { ThemeProvider } from 'styled-components';
import { ResetCss } from './theme/globalStyles';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
