const BaseDAO = require('./basedao')

module.exports = class ItemDAO extends BaseDAO {
    constructor(db) {
        super(db, "item")
    }
    insert(item) {
        return this.db.query("INSERT INTO item(label,quantity,checked,contains) VALUES ($1,$2,$3,$4)",
            [item.label, item.quantity, item.checked, item.contains])
    }
    getAll(list) {
        return new Promise((resolve, reject) =>
        this.db.query("SELECT * FROM item WHERE contains=$1",
            [list])
            .then(res => resolve(res.rows))
            .catch(e => reject(e)))
    }
    getItemById(list, id) {
        console.log(list, id)
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM item WHERE id_item=$1 AND contains=$2",
                [id, list])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
    update(item) {
        return this.db.query("UPDATE item SET label=$1,quantity=$2,checked=$3 WHERE id_item=$4 AND contains=$5",
            [item.label, item.quantity, item.checked, item.id_item, item.contains])
    }
    delete(id) {
        return this.db.query("DELETE FROM item WHERE id_item=$1",
            [id])
    }
}