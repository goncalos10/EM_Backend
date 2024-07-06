
class GetObitosCommentsQuery {
    constructor(obitosRepository, commentsRepository) {
        this.obitosRepository = obitosRepository
        this.commentsRepository = commentsRepository
    }

    async execute(obitoid) {
        try {

            const obito = await this.obitosRepository.findByID(obitoid)

            if (!obito) {
                return { success: false, error: 'Obito não existe' }
            }
            const comments = (await this.commentsRepository.findCommentsByObitoID(obitoid)) || []
            return { success: true, data: comments }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = GetObitosCommentsQuery