const utils = require("../../common/utils")

class GetLocaisController {
    constructor(getLocaisQuery) {
        this.getLocaisQuery = getLocaisQuery
    }

    execute() {
        let getLocaisQuery = this.getLocaisQuery

        return async function (req, res) {

            let localtipo = req.params.localtipo

            localtipo = parseInt(localtipo)

            const locais = await getLocaisQuery.execute(localtipo)

            if (!locais.success) {
                return res.status(400).json({ error: locais.error })
            }

            return res.status(200).json(locais)
        }
    }
}

module.exports = GetLocaisController