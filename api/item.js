module.exports = (app, serviceItem, jwt) => {
    app.get("/item/:id", async (req, res) => {
        await res.json(await serviceItem.dao.getAll(req.params.id))
    })
    app.get("/item/:list/:id", async (req, res) => {
        await res.json(await serviceItem.dao.getItemById(req.params.list, req.params.id))
    })
    app.post("/item", (req, res) => {
        const item = req.body
        console.log(item)
        if (!serviceItem.isValid(item))  {
            return res.status(400).end()
        }
        serviceItem.dao.insert(item)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.delete("/item/:list/:id", (req, res) => {
        const item = serviceItem.dao.getItemById(req.params.list, req.params.id)
        if (item === undefined) {
            return res.status(400).end()
        }
        serviceItem.dao.delete(req.params.id)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
        })
    })
    app.put("/item", async (req, res) => {
        const item = req.body
        console.log(item)
        if ((item.id_item === undefined) || (item.id_item == null) || (!serviceItem.isValid(item))) {
            return res.status(400).end()
        }
        if (await serviceItem.dao.getItemById(item.contains, item.id_item) === undefined) {
            return res.status(404).end()
        }

        serviceItem.dao.update(item)
            .then(res.status(200).end())
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
}
