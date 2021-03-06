const ListDAO = require("../datamodel/listdao")

module.exports = class ListService {
    constructor(db) {
        this.dao = new ListDAO(db)
    }
    isValid(list) {
        console.log(list)
        list.shop = list.shop.trim()
        if (list.shop === "") return false
        if (list.date != null) {
            if (list.date instanceof String) {
                list.date = new Date(list.date)
            }
            if (list.date > new Date()) return false
        }
        return true
    }
}