const fs = require('fs');

module.exports = (path, ending) => {
    return fs.readdirSync(path).filter(f => f.endsWith(ending))
}