const BaseDAO = require('./basedao')

module.exports = class ListDAO extends BaseDAO {
    constructor(db) {
        super(db, "list")
    }
    insert(list) {
        return this.db.query("INSERT INTO list(shop,date,archived,fk_id_user) VALUES ($1,$2,$3,$4)",
            [list.shop, list.date, list.archived, list.fk_id_user])
    }
    getMaxId() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT max(id_list) FROM list")
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
    getAll(user) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list WHERE fk_id_user=$1",
                [user.id_user])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getAllArchived(user) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list WHERE fk_id_user=$1 AND archived=true",
                [user.id_user])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getAllCurrent(user) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list WHERE fk_id_user=$1 AND archived=false",
                [user.id_user])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getListById(id) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list WHERE id_list=$1",
                [id])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
    update(list) {
        return this.db.query("UPDATE list SET shop=$1,date=$2,archived=$3 WHERE id_list=$4",
            [list.shop, list.date, list.archived, list.id_list])
    }
    delete(id) {
        return this.db.query("DELETE FROM list WHERE id_list=$1",
            [id])
    }
}