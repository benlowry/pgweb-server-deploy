const fs = require('fs')

module.exports = {
  get: (req, res) => {
    const urlParts = req.url.split('?')
    if (!urlParts || !urlParts.length !== 2) {
      res.statusCode = 404
      return res.end()
    }
    const queryString = urlParts[1]
    if (queryString.indexOf('bookmark=') !== 0) {
      res.statusCode = 404
      return res.end()
    }
    const bookmark = queryString.substring(9)
    if (bookmark.length > 30) {
      res.statusCode = 404
      return res.end()
    }
    if (!fs.existsSync(`./bookmarks/${bookmark}.toml`)) {
      res.statusCode = 404
      return res.end()
    }
    fs.unlinkSync(`./bookmarks/${bookmark}.toml`)
    res.statusCode = 200
    return res.end()
  }
}
