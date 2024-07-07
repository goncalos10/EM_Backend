const utils = require("../../common/utils")

class ChangeMemoriaController {
    constructor(changeMemoriaCommand) {
        this.changeMemoriaCommand = changeMemoriaCommand
    }

    execute() {
        let changeMemoriaCommand = this.changeMemoriaCommand
        return async function (req, res) {
            let { obitoid } = req.params
            let userid = req.user.userid
            const changeMemoria = await changeMemoriaCommand.execute({ userid, obitoid })

            if (!changeMemoria.success) {
                return res.status(400).json({ error: changeMemoria.error })
            }
            return res.status(200).json(changeMemoria)
        }
    }
}

module.exports = ChangeMemoriaController