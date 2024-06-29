const pg = require('pg')
const Funeraria = require('../common/entities/funeraria')

class FunerariaRepository {

    constructor(url) {
        this.url = url
    }

    async findByEmail(email) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'SELECT * FROM "funeraria" WHERE email = $1',
            values: [email]
        })

        await connection.end()

        const result = await response.rows[0]

        if (result) {
            return new Funeraria(result)
        }

        return null
    }

    async create(funeraria) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'INSERT INTO "funeraria" (name, email, address, postalcode, city, mobilephone, phone, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            values: [funeraria.name, funeraria.email, funeraria.address, funeraria.postalcode, funeraria.city, funeraria.mobilephone, funeraria.phone, funeraria.userid]
        })

        await connection.end()

        const result = await response.rows[0]

        return new Funeraria(result)

    }

    async findFunerariasByUserID(userid) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'SELECT * FROM "funeraria" WHERE userid = $1',
            values: [userid]
        })

        await connection.end()

        const result = await response.rows

        if (result) {
            return result
        }

        return null
    }

}

module.exports = FunerariaRepository