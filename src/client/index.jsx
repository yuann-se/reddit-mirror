import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from '../app';

window.addEventListener('load', () => {
  ReactDom.hydrate(<BrowserRouter><App /></BrowserRouter>, document.getElementById('react_root'));
})

// module.hot.accept();
