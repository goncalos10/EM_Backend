const utils = require("../../common/utils")

class EditUserController {
    constructor(editUserCommand) {
        this.editUserCommand = editUserCommand
    }

    execute() {
        let editUserCommand = this.editUserCommand
        return async function (req, res) {
            let userid = req.params.userid
            let { name, email, address, postalcode, city, mobilephone, phone } = req.body
            const userUpdate = await editUserCommand.execute({ funerariaid, name, email, address, postalcode, city, mobilephone, phone, user: req.user, userid })

            if (!userUpdate.success) {
                return res.status(400).json({ error: userUpdate.error })
            }
            return res.status(200).json(userUpdate)
        }
    }
}

module.exports = EditUserController