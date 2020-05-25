const jwtreq = require('jsonwebtoken')
module.exports = (app, serviceUser, jwt) => {
    app.post('/useraccount/authenticate', (req, res) => {
        const {login, password} = req.body
        this.login = login
        if ((login === undefined) || (password === undefined)) {
            console.log(req.body)
            res.status(400).end()
            return
        }
        serviceUser.validatePassword(login, password)
            .then(autheticated => {
                if (!autheticated) {
                    res.status(401).end()
                    return
                }
                res.json({'token': jwt.generateJWT(login)})
            })
            .catch(e => {
                console.log(e)
                res.status(500).end()
            })
    })
    app.post('/useraccount/timeout', (req,res) => {
        let oldtoken = req.body.token
        jwtreq.verify(oldtoken, jwt.getKey(), {algorithm: "HS256"}, (err) => {
            if(err) {
                if(err.name === 'TokenExpiredError') {
                    return res.status(401).end()
                }
            }
        })
        try {
            res.json({'token': jwt.generateJWT(this.login)})
        } catch (e) {}

    })
}