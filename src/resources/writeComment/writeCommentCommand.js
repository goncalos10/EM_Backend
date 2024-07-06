const Funeraria = require('../../common/entities/funeraria')

class WriteCommentCommand {
    constructor(obitoRepository, commentRepository) {
        this.obitoRepository = obitoRepository
        this.commentRepository = commentRepository
    }

    async execute({ user, obitoid, commenttext}) {
        try {
            const obito = await this.obitoRepository.findByID(obitoid)

            if (!obito) {
                return { success: false, error: 'Obito não existe' }
            }

            const comment = user.createComment(obito, commenttext)

            const createdComment = await this.commentRepository.create(comment)
            return { success: true, data: createdComment }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = WriteCommentCommand