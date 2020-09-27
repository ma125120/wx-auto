
import { createWriteStream } from 'fs'
import liveServer from 'live-server'

export function startServer(rootPath, imgName) {
  const param = {
    port: 8631,
    root: rootPath,
    open: true
  }

  updateHtml(rootPath, imgName, Date.now())

  liveServer.start(param)
}

export function updateHtml(rootPath, imgName, dateStr) {
  const html = `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
      body { display: flex; flex-direction: column; justify-content: center; align-items: center; }
      .qr-code { width: 300px; }
      </style>
    </head>
    <body>
      <div>二维码生成于${formatDate(dateStr)}</div>
      <img src="./${imgName}" alt="" class="qr-code" />
    </body>
  </html>
  `
  createWriteStream(rootPath + `/index.html`).write(html)
}

export function formatDate(time) {
  let options = {
    year : "numeric",
    month : "2-digit",
    day : "2-digit",
    hour : "2-digit",
    minute : "2-digit",
    second : "2-digit",
  };
  let datetime = new Date(time).toLocaleString("zh-CN", options);
  return datetime
}