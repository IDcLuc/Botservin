/**
 * @param {array} owners
 * @param {object} tags
 * @param {string} access
 * @returns {boolean}
 */
module.exports = (owners, tags, access) => {
    if (access === "mod")
        access = "moderator"
    if (access === "bro")
        access = "broadcaster"
    if (access === "own")
        access = "owners"

    if (access === "owners" && owners.includes(tags.username))
        return true;
    if (access === "everyone")
        return true;
    if (access === undefined)
        return true;
    if (!tags.badges)
        return false;

    return access in tags.badges
}