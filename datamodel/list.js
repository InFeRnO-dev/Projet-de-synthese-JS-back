module.exports = class List {
    constructor(shop, date, archived, fk_id_user) {
        this.shop = shop
        this.date = date
        this.archived = archived
        this.fk_id_user = fk_id_user
    }
}