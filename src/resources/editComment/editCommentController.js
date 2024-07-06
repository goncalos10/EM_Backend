class EditCommentController {
    constructor(editCommentCommand) {
        this.editCommentCommand = editCommentCommand
    }

    execute() {
        let editCommentCommand = this.editCommentCommand
        return async function (req, res) {
            let { commentid } = req.params
            commentid = parseInt(commentid)
            let { commenttext } = req.body
            const comment = await editCommentCommand.execute(req.user, commentid, commenttext)

            if (!comment.success) {
                return res.status(400).json({ error: comment.error })
            }
            return res.status(200).json(comment)
        }
    }
}

module.exports = EditCommentController