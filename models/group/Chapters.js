const mongoose = require('mongoose');
const nodemon = require('nodemon');
const ChapterSchema = new mongoose.Schema({
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
    chaptername:{
        type: String,
        required: true,
    },
    lecturecount:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    }
});
module.exports = Chapter = mongoose.model('chapters',ChapterSchema);