const utils = require("../../common/utils")

class GetObitosCommentsController {
    constructor(getObitosCommentsQuery) {
        this.getObitosCommentsQuery = getObitosCommentsQuery
        
    }

    execute() {
        let getObitosCommentsQuery = this.getObitosCommentsQuery

        return async function (req, res) {

            let obitoid = req.params.obitoid

            obitoid = parseInt(obitoid)

            const comments = await getObitosCommentsQuery.execute(obitoid)

            if (!comments.success) {
                return res.status(400).json({ error: comments.error })
            }

            return res.status(200).json(comments)
        }
    }
}

module.exports = GetObitosCommentsController