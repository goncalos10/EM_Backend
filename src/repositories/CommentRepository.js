const pg = require('pg')
const Comment = require('../common/entities/comentario')

class CommentRepository {

    constructor(url) {
        this.url = url
    }

    async create(comment) {
        const connection = new pg.Client(this.url)

        
        await connection.connect()
        

        const response = await connection.query({
            text: 'INSERT INTO "comment" (userid, obitoid, commenttext) VALUES ($1, $2, $3) RETURNING *',
            values: [comment.userid, comment.obitoid, comment.commenttext]
        })
        await connection.end()
        const result = await response.rows[0]

        return new Comment(result)
       
    }

    async findByID(commentid) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'SELECT comment.*, "user".name AS username, "obito".funerariaid FROM "comment" JOIN "user" ON "comment".userid = "user".userid JOIN "obito" ON "comment".obitoid = "obito".obitoid WHERE commentid = $1',
            values: [commentid]
        })
        await connection.end()
        if (response.rows.length === 0) {
            return null
        }
        return new Comment(response.rows[0])
    }

    async edit(commentId, commentText) {
        const connection = new pg.Client(this.url)
        await connection.connect()


        const comment = await connection.query({
            text: 'UPDATE "comment" SET commenttext = $1 WHERE commentid = $2 RETURNING *',
            values: [commentText, commentId]
        })

        await connection.end()
        return new Comment(comment.rows[0])
    }

    async delete(commentid) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        //Delete comment

        await connection.query({
            text: 'DELETE FROM "comment" WHERE commentid = $1',
            values: [commentid]
        })

        //Delete comment
        await connection.end()
        return true
    }
    async findCommentsByObitoID(obitoid) {
        const connection = new pg.Client(this.url)
        await connection.connect()

        const response = await connection.query({
            text: 'SELECT comment.*, "user".name AS username, "obito".funerariaid FROM "comment" JOIN "user" ON "comment".userid = "user".userid JOIN "obito" ON "comment".obitoid = "obito".obitoid WHERE "comment".obitoid = $1',
            values: [obitoid]
        })


        await connection.end()

        if (response.rows.length === 0) {
            return []
        }

        return response.rows.map(comment => new Comment(comment))
    }

}

module.exports = CommentRepository