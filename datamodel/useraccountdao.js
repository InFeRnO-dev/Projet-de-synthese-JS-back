const BaseDAO = require('./basedao')

module.exports = class UseraccountDAO extends BaseDAO {
    constructor(db) {
        super(db, "useraccount")
    }
    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getUseraccountById(id) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE id_user=$1",
                [id])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
    getByLogin(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE login=$1", [ login ])
                .then(res => resolve(res.rows[0]) )
                .catch(e => reject(e)))
    }
    insert(useraccount) {
        return this.db.query("INSERT INTO useraccount(login,password) VALUES ($1,$2)",
            [useraccount.login,useraccount.password])
    }
}