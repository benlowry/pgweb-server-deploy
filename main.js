const http = require('http')
const CreateBookmark = require('./backend/create-bookmark.js')
const DeleteBookmark = require('./backend/create-bookmark.js')

module.exports = {start}

function start (rootPath, preRequestHandlers, beforeRequestHandlers) {
  const port = process.env.SERVER_PORT
  http.createServer(receiveRequest).listen(port)
}

function receiveRequest (req, res) {
  switch (req.url) {
    case `/${process.env.PGWEB_PREFIX}/create-bookmark`:
      if (req.method === 'POST') {
        return CreateBookmark.post(req, res)
      }
      break
    case `/${process.env.PGWEB_PREFIX}/delete-bookmark`:
      if (req.method === 'GET') {
        return DeleteBookmark.get(req, res)
      }
      break
  }
  res.statusCode = 404
  return res.end()
}
