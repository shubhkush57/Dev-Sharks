const mongoose = require('mongoose');
const GroupSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        required: true,
    },
    descp:{
        type: String,
        required: false,
    },
    tags:
        {
            type: String,
            required: false,
        },
    date:{
        type: Date,
        default: Date.now,
    },
    joinedStudents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ]
    
    
});

module.exports = Group = mongoose.model('group',GroupSchema);

