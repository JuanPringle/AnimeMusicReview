const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    avatar_url: { type: String },
});

module.exports = mongoose.model('User', userSchema)