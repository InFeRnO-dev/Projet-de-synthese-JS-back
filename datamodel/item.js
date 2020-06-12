module.exports = class Item {
    constructor(label, quantity, checked, contains, fk_id_user) {
        this.label = label
        this.quantity = quantity
        this.checked = checked
        this.contains = contains
        this.fk_id_user = fk_id_user
    }
}