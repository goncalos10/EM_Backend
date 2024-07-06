class DeleteCommentController {
    constructor(deleteCommentCommand) {
        this.deleteCommentCommand = deleteCommentCommand
    }

    execute() {
        let deleteCommentCommand = this.deleteCommentCommand
        return async function (req, res) {
            let { commentid } = req.params
            commentid = parseInt(commentid)
            const comment = await deleteCommentCommand.execute(req.user, commentid)

            if (!comment.success) {
                return res.status(400).json({ error: comment.error })
            }
            return res.status(200).json(comment)
        }
    }
}

module.exports = DeleteCommentController