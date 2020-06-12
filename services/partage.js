const PartageDAO = require("../datamodel/partagedao")

module.exports = class PartageService {
    constructor(db) {
        this.dao = new PartageDAO(db)
    }
}