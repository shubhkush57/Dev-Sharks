const mongoose = require('mongoose');
const TagsOfGroupsSchema = mongoose.Schema({
    // this will be realted to the gorups
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
    tag:{
        type: String,
        required: true,
    }
});
module.exports = TagsOfGroups = mongoose.model('TagsOfGroups',TagsOfGroupsSchema);