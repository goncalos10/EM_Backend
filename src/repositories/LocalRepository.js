const pg = require('pg')
const Local = require('../common/entities/local')

class LocalRepository {

    constructor(url) {
        this.url = url
    }

    async create(local) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'INSERT INTO "local" (name, address, city, tipo) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [local.name, local.address, local.city, local.tipo]
        })

        await connection.end()

        const result = await response.rows[0]

        return new Local(result)

    }

    async edit({ localid, name, address, city, tipo }) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'UPDATE "local" SET name = $1, address = $2, city = $3, tipo = $4 WHERE localid = $5 RETURNING *',
            values: [name, address, city, tipo, localid]
        })

        await connection.end()

        const result = await response.rows[0]

        return new Local(result)
    }

    async findByTipo(tipo) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        tipo = parseInt(tipo)

        const response = await connection.query({
            text: 'SELECT * FROM "local" WHERE tipo = $1',
            values: [tipo]
        })

        await connection.end()

        const result = response.rows.map(local => new Local(local))

        return result

    }

}

module.exports = LocalRepository