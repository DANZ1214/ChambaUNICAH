'use strict'

const db = require('./app/config/db');
const usuario = db.usuario;
const bcypt = require('bcrypt');
const [Op] = require('sequelize');
const { user } = require('../config/db');
const { where } = require('sequelize');
 

async function singUp(req, res) {
let newPase = undefined;
await bcypt.genSalt(10)
.then(async salts => {
    await bcypt.hash(req.body["pass"], salts) 
    .then(hash=>{newPase = hash})
    .catch(error=>{console.error(error.message)})
    user.create({
        userid: req.body["userid"],
        pass: newPase})
        .then(user=>{res.status(200).send(user)})
        .catch(error=>{res.status(500).send({message: error.message ||"Sucedio un error al crear el usuario"})})
})
.catch(error=>{})
}

async function Login(req, res) {
    const userid = req.body["userid"];
    var condition = userid ? {userid: {[Op.eq]: userid}} : null;
    user.find({where: condition})
    .then(user => {
        if(bcrypt.compareSync(req.body["pass"], user.pass)){
            
        }
        })
    .catch(error=>{})
}

module.exports = {
    singUp,
    Login
    
    
}
