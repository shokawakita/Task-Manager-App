// async function getComponent() {
//   const element = document.createElement('div');
//   const { default: _ } = await import('lodash');

//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   return element;
//  }

// getComponent().then((component) => {
//   document.body.appendChild(component);
// });

import React from 'react';
import { createRoot } from 'react-dom/client';
import './scss/home.scss';
// import './scss/style.scss';
import App from './App.jsx';

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App />);
