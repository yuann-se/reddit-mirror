import express from 'express';
import * as React from 'react';
import ReactDOM from 'react-dom/server';
import { App } from '../app';
import { indexTemplate } from './indexTemplate';
import axios from 'axios';
import { StaticRouter } from 'react-router-dom';
import cookieParser from 'cookie-parser';

const app = express();
app.use('/static', express.static('./dist/client'));
app.use(cookieParser());

app.get('/auth', (req, res) => {
  axios.post(
    'https://www.reddit.com/api/v1/access_token',
    `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
    {
      auth: { username: process.env.CLIENT_ID, password: 'llspliIY0sBA-voydz89yDt2r-N9EA' },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    }
  )
    .then(({ data }) => {
      res.cookie(`token`, `${data['access_token']}`)
      res.send(indexTemplate(ReactDOM.renderToString(<StaticRouter location={req.url}>{App()}</StaticRouter>), data['access_token']))
    })
    .catch(() => {
      console.log
    })

})

app.get('*', (req, res) => {
  req.cookies && req.cookies['token']
    ? res.send(indexTemplate(ReactDOM.renderToString(<StaticRouter location={req.url}>{App()}</StaticRouter>), req.cookies['token']))
    : res.send(indexTemplate(ReactDOM.renderToString(<StaticRouter location={req.url}>{App()}</StaticRouter>)))
});

app.listen(3000, () => {
  console.log(`>>> Server started on port http://localhost:3000`)
})

