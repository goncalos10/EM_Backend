const pg = require('pg')
const User = require('../common/entities/user')

class UserRepository {

    constructor(url) {
        this.url = url
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

}

module.exports = UserRepository