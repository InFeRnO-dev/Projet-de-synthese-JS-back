const Useraccount = require('./useraccount')
const List = require('./list')
const Item = require('./item')


module.exports = (useraccountService, listService, itemService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await useraccountService.dao.db.query("CREATE TABLE useraccount(id_user SERIAL PRIMARY KEY, login TEXT, password TEXT)")
            // INSERTs

        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table user déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }
            useraccountService.inserthash("user0", "default")
                .then(_ => useraccountService.dao.getByLogin("user0"))
                .catch(e => console.log(e))
            useraccountService.inserthash("user1", "default")
                .then(_ => useraccountService.dao.getByLogin("user1"))
                .catch(e => console.log(e))

        try {
            await listService.dao.db.query("CREATE TABLE list(id_list SERIAL PRIMARY KEY, shop TEXT, date DATE, archived BOOLEAN, fk_id_user INT REFERENCES useraccount(id_user) ON DELETE CASCADE)")
            // INSERTs
            await listService.dao.insert(new List("shop1", new Date(), false, 1))
            await listService.dao.insert(new List("shop3", new Date(), true, 1))
            await listService.dao.insert(new List("shop2", new Date(), false, 2))
            await listService.dao.insert(new List("shop4", new Date(), true, 2))
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table list déjà créé")
            } else {
                reject(e)
                console.log(e)
            }
        }
        try {
            await itemService.dao.db.query("CREATE TABLE item(id_item SERIAL PRIMARY KEY, label TEXT, quantity NUMERIC, checked BOOLEAN, contains INT REFERENCES list(id_list) ON DELETE CASCADE)")
            // INSERTs
            for (let j = 0; j < 2; j++) {
                await itemService.dao.insert(new Item("list1label" + j, 15 + j, false, 1))
            }
            for (let k = 0; k < 2; k++) {
                await itemService.dao.insert(new Item("list2label" + k, 25 + k, false, 2))
            }
        } catch (err) {
            if (err.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
                console.log("table item déjà créé")
            } else {
                reject(err)
                console.log(err)
            }
        }
    })
}