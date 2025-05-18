const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async function (req, res) {
    if(await valid_credentials(req.body.username, req.body.password)===false){
        return res.sendStatus(403)
    }
    const accessToken = jwt.sign({username: req.body.username, password: req.body.password}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 2000 })
    res.json({accessToken: accessToken})
}

const isauth = async function (req, res) {
    res.send('hola soy el server')
}

module.exports = { login, isauth};


const valid_credentials = async function(username, password){
    const foundUser = await User.findOne({username:username})
    if (foundUser==null) {
        return false
    }
    else if(foundUser.hash==null){
        return false
    }
    console.log(username, password)
    return bcrypt.compareSync(password, foundUser.hash);

}
