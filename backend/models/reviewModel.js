const mongoose = require('mongoose');
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    user_id: { type: String, required: true },
    anime_id: { type: String, required: true },
    score: { type: Number, required: true },
    review: { type: String },
});