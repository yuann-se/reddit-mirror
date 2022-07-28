import express from 'express'
import ReactDOM from 'react-dom/server'
import { App } from '../app'
import { indexTemplate } from './indexTemplate'
import axios from 'axios'

const app = express();
app.use('/static', express.static('./dist/client'))



const tokensCache = {};

app.get('/auth', (req, res) => {
  req.query.code && tokensCache[req.query.code]
    ? res.send(indexTemplate(ReactDOM.renderToString(App()), tokensCache[req.query.code]))
    : axios.post(
      'https://www.reddit.com/api/v1/access_token',
      `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
      {
        auth: { username: process.env.CLIENT_ID, password: 'llspliIY0sBA-voydz89yDt2r-N9EA' },
        headers: { 'Content-type': 'application/x-www-form-urlencoded' }
      }
    )
      .then(({ data }) => {
        res.send(indexTemplate(ReactDOM.renderToString(App()), data['access_token']));
        tokensCache[req.query.code] = data['access_token'];
      })
      .catch(console.log)
})

app.get('*', (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(App())))
});

app.listen(3000, () => {
  console.log(`>>> Server started on port http://localhost:3000`)
})

