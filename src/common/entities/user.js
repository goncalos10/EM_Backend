const Comentario = require('../entities/comentario')
const Memoria = require('../entities/memoria')
const Local = require('../entities/local')

class User {
    constructor({ userid, name, email, password, address, city, roleid }) {
        this.userid = userid
        this.name = name
        this.email = email
        this.password = password
        this.address = address
        this.city = city
        this.roleid = roleid
    }

    static validateUser(user) {
        if (!user.name) {
            throw new Error('Name is required')
        }
        if (!user.email) {
            throw new Error('Email is required')
        }
        if (!user.password) {
            throw new Error('Password is required')
        }
        if (!user.address) {
            throw new Error('Address is required')
        }
        if (!user.city) {
            throw new Error('City is required')
        }
        if (!user.roleid) {
            throw new Error('Role is required')
        }

        return true
    }

    createLocal(local) {
        return new Local({ name: local.name, address: local.address, city: local.city, tipo: local.tipo })
    }

    createMemory(obito) {
        return new Memoria({ userid: this.userid, obitoid: obito.id })
    }

    createComment(obito, comment) {
        return new Comentario({ userid: this.userid, obitoid: obito.id, comment: comment })
    }

    edit(user) {
        return {
            userid: user.userid,
            name: user.name,
            email: user.email,
            address: user.address,
            city: user.city,
            roleid: user.roleid
        }
    }

    createFuneraria(funeraria) {
        if (this.roleid !== 1) {
            throw new Error('Only adminstrators can create funerarias')
        }

        return {
            name: funeraria.name,
            email: funeraria.email,
            address: funeraria.address,
            postalcode: funeraria.postalcode,
            city: funeraria.city,
            mobilephone: funeraria.mobilephone,
            phone: funeraria.phone,
            userid: funeraria.userid
        }
    }

    editFuneraria(funeraria) {
        if (this.roleid !== 1) {
            throw new Error('Only adminstrators can edit funerarias')
        }
        return {
            funerariaid: funeraria.funerariaid,
            name: funeraria.name,
            email: funeraria.email,
            address: funeraria.address,
            postalcode: funeraria.postalcode,
            city: funeraria.city,
            mobilephone: funeraria.mobilephone,
            phone: funeraria.phone,
            userid: funeraria.userid
        }
    }

    deleteFuneraria(funerariaid) {
        if (this.roleid !== 1) {
            throw new Error('Only adminstrators can delete funerarias')
        }
        return {
            funerariaid
        }
    }

}

module.exports = User