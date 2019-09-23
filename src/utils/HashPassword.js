import bcrypt from "bcrypt"
import crypto from "crypto"

class HashPassword {

    genSalt () {
        const saltOrRounds = Math.round(Math.random() * 10)
        return bcrypt.genSaltSync(saltOrRounds)
    }

    hash (password) {
        return bcrypt.hashSync(password, this.genSalt())
    }

    compareHash (password, hash) {
        return bcrypt.compareSync(password, hash)
    }

    md5 (password = "") {
        const md5sum = crypto.createHash('md5')
        return md5sum.update(password.toString().trim()).digest('hex')
    }
}

export default new HashPassword()