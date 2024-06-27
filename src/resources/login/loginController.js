

class LoginController {
    constructor(loginQuery) {
        this.loginQuery = loginQuery
    }

    execute() {
        let loginQuery = this.loginQuery
        return async function (req, res) {
            let { email, password } = req.body
            
            const user = await loginQuery.execute({ email, password })

            if (!user.success) {
                return res.status(400).json({ error: user.error })
            }
            return res.status(200).json(user)
        }
    }
}

module.exports = LoginController