const utils = require("../../common/utils")

class DeleteUserController {
    constructor(deleteUserCommand) {
        this.deleteUserCommand = deleteUserCommand
    }

    execute() {
        let deleteUserCommand = this.deleteUserCommand
        return async function (req, res) {
            let userid = req.params.userid
            const userdelete = await deleteUserCommand.execute({ user: req.user, userid: req.user.id })

            if (!userdelete.success) {
                return res.status(400).json({ error: userdelete.error })
            }
            return res.status(204).json(userdelete)
        }
    }
}

module.exports = DeleteUserController