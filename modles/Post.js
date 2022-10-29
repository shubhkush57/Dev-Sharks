const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text:{
        type: String,
        required: true
    },
    name:{
        type: String
    },
    avatar:{
        type:String
    },
    likes:[
        {
            users:{
                type:Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            users:{
                type: SchemaType.ObjectId,
                ref: 'users'
            },
            text:{
                type: String,
                required:true
            },
            name:{
                type: String
            },
            avatar:{
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});
module.exports = Post =mongoose.model('posts',PostSchema)