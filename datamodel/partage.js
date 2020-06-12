module.exports = class Partage {
    constructor(id_proprio, id_partage_user, id_list, droits) {
        this.id_proprio = id_proprio
        this.id_partage_user = id_partage_user
        this.id_list = id_list
        this.droits = droits
    }
}