import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import MultilineTextFields from './MultilineTextFields';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <MultilineTextFields />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
