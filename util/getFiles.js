/**
 * Get all files of a specific extension from a directory
 * @param {String} path
 * @param {String} extension
 * @returns {Map} Return files from path with extension
 */
module.exports = (path, extension) => {
    return require('fs').readdirSync(path).filter(f => f.endsWith(extension))
}

