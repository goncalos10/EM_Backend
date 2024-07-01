
class CreateLocalCommand {
    constructor(localRepository) {
        this.localRepository = localRepository
    }

    async execute({ name, address, city, tipo }) {
        try {

            const createdLocal = await this.localRepository.create({ name, address, city, tipo })

            return { success: true, data: createdLocal }

        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = CreateLocalCommand