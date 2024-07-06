class GetMyObitosController {
    constructor(getMyObitosQuery) {
        this.getMyObitosQuery = getMyObitosQuery
    }

    execute() {
        let getMyObitosQuery = this.getMyObitosQuery

        return async function (req, res) {

            let funerariaid = req.params.funerariaid

            funerariaid = parseInt(funerariaid)


            if (!req.user.funerarias.includes(funerariaid)) {
                return res.status(403).json({ error: 'Its not your funeraria.' })
            }

            const obito = await getMyObitosQuery.execute(funerariaid)

            if (!obito.success) {
                return res.status(400).json({ error: obito.error })
            }

            return res.status(200).json(obito)
        }
    }
}

module.exports = GetMyObitosController