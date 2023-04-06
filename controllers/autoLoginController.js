const token = require("../helpers/token")
const axios = require("axios")

const get = (req, res) => {
    res.render("autoLogin", {
        token : req.query.token,
        id : req.query.id
    })
}

const post = async (req, res) => {
    if(token.auth(req.body.token, req.body.id)){
        const loginUser = await axios.post("/?action=login", {codePersoneli : req.body.id})
        if(loginUser && loginUser.data.isDuty == false){
            res.send(loginUser.data)
        }else{
            res.send(false)
        }
    }else{
        res.send(false)
    }
}

module.exports = {
    get,
    post
}