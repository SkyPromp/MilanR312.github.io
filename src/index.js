import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import './index.css';

import HeaderTop from './header/header'
import Ieee from './content/ieee';
import Int from './content/int'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderTop />}>
          <Route path="ieee" element={<Ieee />} />
          <Route path="int" element={<Int />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
