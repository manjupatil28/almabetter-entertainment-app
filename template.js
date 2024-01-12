import { favicon } from './client/assets/'

export default () => {
  return `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="shortcut icon" type="image/png" sizes="32x32" href=${favicon}>

        <title>Frontend Mentor | Entertainment web app</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="/public/bundle.js"></script>
    </body>
    </html>`
}
