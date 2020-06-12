const BaseDAO = require('./basedao')

module.exports = class PartageDAO extends BaseDAO {
    constructor(db) {
        super(db, "partage")
    }

    getAllPartageByIdList(idlist) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM partage WHERE id_list=$1",
                [idlist])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getAllPartageByIdUser(iduser) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM partage WHERE id_partage_user=$1",
                [iduser])
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    getPartageById(idpartage) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM partage WHERE id_partage=$1",
                [idpartage])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
    getListById(idlist) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list WHERE id_list=$1",
                [idlist])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
    getUserByLogin(login) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM useraccount WHERE login=$1",
                [login])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
    getLoginById(id) {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT login FROM useraccount WHERE id_user=$1",
                [id])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e)))
    }
    insert(partage) {
        return this.db.query("INSERT INTO partage(id_proprio, id_partage_user, id_list, droits) VALUES($1,$2,$3,$4)",
            [partage.id_proprio, partage.id_partage_user, partage.id_list, partage.droits])
    }
    update(partage) {
        return this.db.query("UPDATE partage SET droits=$1 WHERE id_partage=$2",
        [partage.droits, partage.id_partage])
    }
    delete(idpartage) {
        return this.db.query("DELETE FROM partage WHERE id_partage=$1",
            [idpartage])
    }
}