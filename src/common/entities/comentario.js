class Comentario {
    constructor({ commentid, userid, obitoid, commenttext, username, funerariaid }) {
        this.commentid = commentid
        this.userid = userid
        this.obitoid = obitoid
        this.funerariaid = funerariaid
        this.commenttext  = commenttext
        this.username = username 
    }
}
module.exports = Comentario