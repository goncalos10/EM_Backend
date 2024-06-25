const utils = require("../../common/utils")

class CreateUserController {
    constructor(createUserCommand) {
        this.createUserCommand = createUserCommand
    }

    execute() {
        let createUserCommand = this.createUserCommand
        return async function (req, res) {
            let { name, email, password, address, city, roleid } = req.body
            password = await utils.hashPassword(password)
            const user = await createUserCommand.execute({ name, email, password, address, city, roleid })

            if (!user.success) {
                return res.status(400).json({ error: user.error })
            }
            return res.status(201).json(user)
        }
    }
}

module.exports = CreateUserController