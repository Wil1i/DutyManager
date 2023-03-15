const get = (req, res) => {
    res.render("adminNew",{
        user : req.user,
        flash : req.flash()
    })
}

const post = (req, res) => {
    console.log(req.body.file)
    res.send("ok")
}

module.exports = {
    get,
    post
}