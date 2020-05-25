const bcrypt = require('bcrypt')
const UseraccountDAO = require("../datamodel/useraccountdao")
const Useraccount = require('../datamodel/useraccount')

module.exports = class UseraccountService {
    constructor(db) {
        this.dao = new UseraccountDAO(db)
    }
    inserthash(login, password) {
        console.log(login, password)
        return this.dao.insert(new Useraccount(login, this.hashPassword(password)))
    }
    async validatePassword(login, password) {
        console.log(login, password)
        const user = await this.dao.getByLogin(login.trim())
        console.log(user)
        return this.comparePassword(password, user.password)
    }
    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, 5)
    }
}