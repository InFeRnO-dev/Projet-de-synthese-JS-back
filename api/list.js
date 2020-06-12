module.exports = (app, serviceList, jwt) => {
    app.get("/list", jwt.validateJWT, async (req, res) => {
        await res.json(await serviceList.dao.getAll(req.useraccount))
    })
    app.get("/list/archived", jwt.validateJWT, async (req, res) => {
        await res.json(await serviceList.dao.getAllArchived(req.useraccount))
    })
    app.get("/list/current", jwt.validateJWT, async (req, res) => {
        await res.json(await serviceList.dao.getAllCurrent(req.useraccount))
    })
    app.get("/list/max", async (req, res) => {
        await res.json(await serviceList.dao.getMaxId())
    })
    app.get("/list/:id", jwt.validateJWT, async (req, res) => {
        try {
            const list = await serviceList.dao.getListById(req.params.id)
             if (list === undefined) {
                 return res.status(404).end()
             }
             if(list.fk_id_user === req.useraccount.id_user) {
                 return res.json(list)
             } else {
                 return res.status(403).end()
             }
        }catch (e) {res.status(400).end()}
    })
    app.post("/list", jwt.validateJWT,(req, res) => {
        const list = req.body
        if (!serviceList.isValid(list))  {
            return res.status(400).end()
        }
        console.log(list)
        list.fk_id_user = req.useraccount.id_user
        serviceList.dao.insert(list)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.delete("/list/:id", jwt.validateJWT,(req, res) => {
        const list = serviceList.dao.getListById(req.params.id)
        if (list === undefined) {
            return res.status(400).end()
        }
        serviceList.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.put("/list", jwt.validateJWT,async (req, res) => {
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
}
