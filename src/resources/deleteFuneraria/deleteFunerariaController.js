const utils = require("../../common/utils")

class DeleteFunerariaController {
    constructor(deleteFunerariaCommand) {
        this.deleteFunerariaCommand = deleteFunerariaCommand
    }

    execute() {
        let deleteFunerariaCommand = this.deleteFunerariaCommand
        return async function (req, res) {
            let funerariaid = req.params.funerariaid
            const funeraria = await deleteFunerariaCommand.execute({ funerariaid, user: req.user, userid: req.user.id })

            if (!funeraria.success) {
                return res.status(400).json({ error: funeraria.error })
            }
            return res.status(204).json(funeraria)
        }
    }
}

module.exports = DeleteFunerariaController