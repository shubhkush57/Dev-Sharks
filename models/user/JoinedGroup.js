const mongoose = require('mongoose');
const JoinedGroupsSchema = mongoose.Schema({
    // this will be realted to the gorups
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
    
});
module.exports = JoinedGroups = mongoose.model('JoinedGroups',JoinedGroupsSchema);