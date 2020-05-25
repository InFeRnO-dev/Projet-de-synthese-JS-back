const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const UseraccountService = require("./services/useraccount")
const ListService = require("./services/list")
const ItemService = require("./services/item")


const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

const connectionString = "postgres://user1:default@192.168.56.102/base1"
const db = new pg.Pool({ connectionString: connectionString })

const useraccountService = new UseraccountService(db)
const listService = new ListService(db)
const itemService = new ItemService(db)
const jwt = require('./jwt')(useraccountService)

require('./api/useraccount')(app, useraccountService, jwt)
require('./api/list')(app, listService, jwt)
require('./api/item')(app, itemService, jwt)

require('./datamodel/seeder')(useraccountService, listService, itemService)
    .then(app.listen(3333))

