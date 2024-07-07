const utils = require("../../common/utils")

class GetMyMemoriasController {
    constructor(getMyMemoriasQuery) {
        this.getMyMemoriasQuery = getMyMemoriasQuery
    }

    execute() {
        let getMyMemoriasQuery = this.getMyMemoriasQuery

        return async function (req, res) {

            const memorias = await getMyMemoriasQuery.execute(req.user.userid)

            if (!memorias.success) {
                return res.status(400).json({ error: memorias.error })
            }

            return res.status(200).json(memorias)

        }
    }
}

module.exports = GetMyMemoriasController