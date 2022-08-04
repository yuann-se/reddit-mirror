export const indexTemplate = (content, token, error) =>
  `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reddit-mirror</title>
    <link rel="icon" type="image/x-icon" href="https://cdn.iconscout.com/icon/free/png-256/reddit-3395790-2853379.png">
    <script src="/static/client.js" type="application/javascript"></script>
    <script>
      window.__token__ = '${token}'
    </script>
  </head>

  <body>
    <div id="react_root">${content}</div>
    <div id="dropdown_root"></div>
    <div id="modal_root"></div>
  </body>

  </html>`
