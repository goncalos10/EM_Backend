const Funeraria = require('../../common/entities/funeraria')

class DeleteCommentCommand {
    constructor(commentRepository) {
        this.commentRepository = commentRepository
    }

    async execute(user, commentid) {
        try {
            const comment = await this.commentRepository.findByID(commentid)

            if (!comment) {
                return { success: true, data: {} }
            }

            if (comment.userid !== user.userid && user.roleid === 3) {
                return { success: false, error: 'Comentário não pertence ao utilizador' }
            }

            if(user.roleid === 2 && !user.funerarias.includes(comment.funerariaid)) {
                return { success: false, error: 'Obito pertence a outra funeraria' }
            }

            await this.commentRepository.delete(commentid)
            return { success: true, data: {} }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = DeleteCommentCommand