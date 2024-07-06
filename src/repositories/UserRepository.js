const pg = require('pg')
const User = require('../common/entities/user')

class UserRepository {

    constructor(url) {
        this.url = url
    }

    async findByEmail(email) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'SELECT * FROM "user" WHERE email = $1',
            values: [email]
        })

        

        const result = await response.rows[0]

        if(result.roleid === 2 || result.roleid === 1) {
            const funerarias = await connection.query({
                text: 'SELECT * FROM "funeraria" WHERE userid = $1',
                values: [result.userid]
            })

            result.funerarias = funerarias.rows.map(funeraria => funeraria.funerariaid)
        }

        await connection.end()

        if (result) {
            return new User(result)
        }

        return null
    }

    async create(user) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'INSERT INTO "user" (name, email, password, address, city, roleid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            values: [user.name, user.email, user.password, user.address, user.city, user.roleid]
        })

        await connection.end()

        const result = await response.rows[0]

        return new User(result)

    }

    async edit(user) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'UPDATE "user" SET name = $1, email = $2, password = $3, address = $4, city = $5, roleid = $6 WHERE userid = $7 RETURNING *',
            values: [user.name, user.email, user.password, user.address, user.city, user.roleid, user.userid]
        })

        await connection.end()

        const result = await response.rows[0]

        return new User(result)

    }

    async delete(userid) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        await connection.query({
            text: 'DELETE FROM "user" WHERE userid = $1',
            values: [userid]
        })

        await connection.end()

        return true

    }

}

module.exports = UserRepository