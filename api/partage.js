module.exports = (app, servicePartage, serviceList, jwt) => {
    app.get("/partagelist/:id", async (req, res) => {
        await res.json(await servicePartage.dao.getAllPartageByIdList(req.params.id))
    })
    app.get("/partageuser/:id", async (req, res) => {
        await res.json(await servicePartage.dao.getAllPartageByIdUser(req.params.id))
    })
    app.get("/partage/list/:id", async (req, res) => {
        await res.json(await servicePartage.dao.getListById(req.params.id))
    })
    app.get("/partage/user/:login", async (req, res) => {
        await res.json(await servicePartage.dao.getUserByLogin(req.params.login))
    })
    app.get("/partage/user/id/:id", async (req, res) => {
        await res.json(await servicePartage.dao.getLoginById(req.params.id))
    })
    app.get("/partage/:id", async (req, res) => {
        await res.json(await servicePartage.dao.getPartageById(req.params.id))
    })
    app.delete("/partage/:id", (req, res) => {

        servicePartage.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.post("/partage", (req, res) => {
        const partage = req.body
        servicePartage.dao.insert(partage)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.put("/partage/list",async (req, res) => {
        const list = req.body
        if ((list.id_list === undefined) || (list.id_list == null) || (!serviceList.isValid(list))) {
            return res.status(400).end()
        }
        if (await serviceList.dao.getListById(list.id_list) === undefined) {
            return res.status(404).end()
        }
        serviceList.dao.update(list)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.put("/partage",async (req, res) => {
        const partage = req.body
        servicePartage.dao.update(partage)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}