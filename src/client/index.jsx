import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from '../app';

window.addEventListener('load', () => {
  ReactDom.hydrate(<App />, document.getElementById('react_root'));
})

module.hot.accept();
