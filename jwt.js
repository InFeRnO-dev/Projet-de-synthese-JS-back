const jwt = require('jsonwebtoken')
const jwtKey = 'TP2_ESIMED'
const jwtExpirySeconds = 3600

module.exports = (useraccountService) => {
    return {
        validateJWT(req, res, next) {
            if (req.headers.authorization === undefined) {
                res.status(401).end()
                return
            }
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, jwtKey, {algorithm: "HS256"},  async (err, useraccount) => {
                if (err) {
                    res.status(401).end()
                    return
                }
                console.log(useraccount)
                try {
                    req.useraccount = await useraccountService.dao.getByLogin(useraccount.login)
                    return next()
                } catch(e) {
                    console.log(e)
                    res.status(401).end()
                }

            })
        },
        generateJWT(login) {
            return jwt.sign({login}, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            })
        },
        getKey() {
            return jwtKey
        }
    }
}