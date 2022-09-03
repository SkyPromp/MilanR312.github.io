import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';

import HeaderTop from './header/header'
import Ieee from './content/ieee';
import Int from './content/int'
import Apple from './content/Apple'
import Poll from './poll/poll'
import reportWebVitals from './reportWebVitals';

import { createTheme ,ThemeProvider} from '@mui/material/styles';

const themedark = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#111e85',
    },
    secondary: {
      main: '#f50057',
    },
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={themedark}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderTop />}>
          <Route path="poll" element={<Poll />} />
          <Route path="ieee" element={<Ieee />} />
          <Route path="int" element={<Int />} />
          <Route path="Apple" element={<Apple />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
