module.exports = class Item {
    constructor(label, quantity, checked, contains) {
        this.label = label
        this.quantity = quantity
        this.checked = checked
        this.contains = contains
    }
}