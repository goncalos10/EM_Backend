const Funeraria = require('../../common/entities/funeraria')

class EditCommentCommand {
    constructor(commentRepository) {
        this.commentRepository = commentRepository
    }

    async execute(user, commentid, updatedCommentText) {
        try {
            const comment = await this.commentRepository.findByID(commentid)

            if (!comment) {
                return { success: false, error: 'Comentario não existe ou foi removido' }
            }

            if (comment.userid !== user.userid) {
                return { success: false, error: 'Comentário não pertence ao utilizador' }
            }

            const editedComment = await this.commentRepository.edit(commentid, updatedCommentText)
            return { success: true, data: editedComment }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = EditCommentCommand