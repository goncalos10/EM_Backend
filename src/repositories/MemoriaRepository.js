const pg = require('pg')
const Memoria = require('../common/entities/memoria')

class MemoriaRepository {

    constructor(url) {
        this.url = url
    }

    async listUserMemorias(userid) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: "SELECT * FROM memoria WHERE userid = $1",
            values: [userid]
        })

        await connection.end()

        const result = response.rows.map(memoria => new Memoria(memoria))

        return result

    }

    async addMemoria(memoria) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: "INSERT INTO memoria (userid, obitoid) VALUES ($1, $2)",
            values: [memoria.userid, memoria.obitoid]
        })

        await connection.end()

        const result = await response.rows[0]

        return { success: true }

    }

    async removeMemoria(memoria) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: "DELETE FROM memoria WHERE userid = $1 AND obitoid = $2",
            values: [memoria.userid, memoria.obitoid]
        })

        await connection.end()

        const result = await response.rows[0]

        return true

    }
}

module.exports = MemoriaRepository