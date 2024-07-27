const User = require('../models/userModel');
const mongoose = require('mongoose');

const getUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }
    if(!user){
        return res.status(404).json({ error: 'No such user' })
    }
    res.status(200).json(user)
}

const createUser = async (req, res) => {
    const { username, password, email, first_name, last_name, avatar_url} = req.body
    let emptyFields = []
    if(!username){
        emptyFields.push('username')
    }
    if(!password){
        emptyFields.push('password')
    }
    if(!email){
        emptyFields.push('email')
    }
    try {
        const user = await User.create({ username, password, email, first_name, last_name, avatar_url })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updatePassword = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such user' })
    }
    const user = await User.findByIdAndUpdate({_id: id}, {
        ...req.body
    })
    if (!user) {
        return res.status(404).json({ error: 'No such user' })
    }
    res.status(200).json(user)
}

module.exports = {
    getUser,
    createUser,
    updatePassword
}