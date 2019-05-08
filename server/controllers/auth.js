const joi = require('joi')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User')
const Helpers = require('../Helpers/helper')
const dbConfig = require('../config/secret')

module.exports = {
    async createUser(req, res) {
        
        const schema = joi.object().keys({
            username: joi.string().min(5).max(21).required(),
            password: joi.string().min(5).required()
        })

        const { error, value } = joi.validate(req.body, schema)
       
        if(error && error.details) {
            return res.status(500).json({msg: error.details})
        }

        const username = await User.findOne({username: Helpers.firstUpper(req.body.username)});
        if(username) {
            return res.status(409).json({message: 'Username already exist'})
        }

        return bcrypt.hash(value.password, 10, (err, hash) => {
            if(err) {
                return res.status(400).json({message: 'Error hashing password'})
            }
        const body = {
            username: Helpers.firstUpper(value.username),
            password: hash
        }
        User.create(body).then((user) => {
            const token = jwt.sign({data: user}, dbConfig.secret, {
                expiresIn: '1h'
            })
            res.cookie('auth', token);

            res.status(201).json({message: "succesfully added user", user, token})
        }).catch( err => res.status(500).json({message: "error occured"}))
        })
    },
    async loginUser(req, res) {
        if(!req.body.username || !req.body.password) {
            return res.status(500).json({message: 'No empty fields allowed'})
        }

        await User.findOne({username: Helpers.firstUpper(req.body.username)}).then(user => {
            if(!user) {
                return res.status(500).json({message: 'User not found'})
            }
            return bcrypt.compare(req.body.password, user.password).then((result) => {
                if(!result) {
                    return res.status(500).json({message: 'Password is incorrect'})
                }
                const token = jwt.sign({data: user}, dbConfig.secret, {
                    expiresIn: '5h'
                })
                res.cookie('auth', token);
                return res.status(200).json({ message: 'login succesfull', user, token })
            })
        })
        .catch(err => {
            return res.status(500).json({message: 'Error occured'})
        })
    }
}