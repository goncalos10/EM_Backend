const utils = require("../../common/utils")

class WriteCommentController {
    constructor(writeCommentCommand) {
        this.writeCommentCommand = writeCommentCommand
    }

    execute() {
        let writeCommentCommand = this.writeCommentCommand
        return async function (req, res) {
            let { obitoid, commenttext } = req.body
            const comment = await writeCommentCommand.execute({ user: req.user, obitoid, commenttext: commenttext })

            if (!comment.success) {
                return res.status(400).json({ error: comment.error })
            }
            return res.status(201).json(comment)
        }
    }
}

module.exports = WriteCommentController