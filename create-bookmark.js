const fs = require('fs')
const allowedProperties = ['host', 'port', 'user', 'database', 'ssl', 'pass']

module.exports = {
  post: (req, res) => {
    const toml = []
    for (const property in req.body) {
      if (property === 'name') {
        continue
      }
      if (allowedProperties.indexOf(property) === -1) {
        res.statusCode = 404
        return res.end()
      }
      const value = req.body[property]
      toml.push(`${property} = ${value}`)
    }
    const bookmark = req.body.name
    if (!bookmark || bookmark.length > 30) {
      res.statusCode = 404
      return res.end()
    }
    if (fs.existsSync(`./bookmarks/${bookmark}.toml`)) {
      fs.unlinkSync(`./bookmarks/${bookmark}.toml`)
    }
    fs.writeFileSync(`./bookmarks/${req.body.name}.toml`, toml.join('\n'))
  }
}
