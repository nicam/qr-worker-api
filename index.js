const qr = require('qr-image')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

function handleRequest(request) {
  const url = new URL(request.url);
  if (url.searchParams.get('text')) {
    return renderQr(url.searchParams.get('text'))
  }
  return renderHtml('Please call me with ?text=CONTENT_OF_YOUR_QR_CODE');
}

function renderQr(text) {
  const qr_png = qr.imageSync(text)
  return new Response(qr_png, { headers: { 'Content-Type': 'image/png' } })
}

function renderHtml(body) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>canIdrinkTheWater.in</title>
</head>
<body>${body}</body>
</html>`;
  return new Response(html, { headers: { 'content-type': 'text/html;charset=UTF-8' }});
}