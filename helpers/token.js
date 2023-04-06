const User = require("../models/User")

const createToken = async (codePersoneli) => {
    const encrypted = await User.encryptPassword(codePersoneli)
    const findUser = await User.findOne({where : {codePersoneli}})
    if(findUser){
        findUser.update({token : encrypted}).then(() => {return true})
    }
    return false
}

const auth = (token, codePersoneli) => {
    return User.validPassword({password : token}, codePersoneli)
}

module.exports = {
    createToken,
    auth
}