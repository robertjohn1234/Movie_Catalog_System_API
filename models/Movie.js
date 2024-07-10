const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, 'User is required']
    },
    comment: {
        type: String,
        required: [true, 'Comment is required']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    director: {
        type: String,
        required: [true, 'Director is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    comments: {
        type: [commentSchema],
        default: []
    }
});

module.exports = mongoose.model('Movie', movieSchema);
