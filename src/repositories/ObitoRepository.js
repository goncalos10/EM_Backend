const pg = require('pg')
const Obito = require('../common/entities/obito')

class ObitoRepository {

    constructor(url) {
        this.url = url
    }

    async create(obito) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'INSERT INTO "obito" (funerariaid, name, freguesia, diafuneral, horafuneral, diamissa, horamissa, url, photo, igrejaid, capelaid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            values: [obito.funerariaid, obito.name, obito.freguesia, obito.diafuneral, obito.horafuneral, obito.diamissa, obito.horamissa, obito.url, obito.photo, obito.igrejaid, obito.capelaid]
        })

        await connection.end()

        const result = await response.rows[0]

        return new Obito(result)

    }

    async edit(obito) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        console.log(obito)

        const response = await connection.query({
            text: 'UPDATE "obito" SET name = $1, freguesia = $2, diafuneral = $3, horafuneral = $4, diamissa = $5, horamissa = $6, photo = $7, igrejaid = $8, capelaid = $9 WHERE obitoid = $10 RETURNING *',
            values: [obito.name, obito.freguesia, obito.diafuneral, obito.horafuneral, obito.diamissa, obito.horamissa, obito.photo, obito.igrejaid, obito.capelaid, obito.obitoid]
        })

        await connection.end()

        const result = await response.rows[0]

        console.log(result)

        if (result) {
            return new Obito(result)
        }

        return null
    }

    async findObitosByFunerariaID(funerariaid) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'SELECT * FROM "obito" WHERE funerariaid = $1',
            values: [funerariaid]
        })

        await connection.end()

        const result = await response.rows

        if (result) {
            return result.map((obito) => {
                return new Obito(obito)
            })
        }

        return []
    }

}

module.exports = ObitoRepository