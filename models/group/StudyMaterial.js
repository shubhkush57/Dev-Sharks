const mongoose = require('mongoose');
const nodemon = require('nodemon');
const StudyMaterialSchema = new mongoose.Schema({
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
    
    date:{
        type: Date,
        default: Date.now,
    }
});
module.exports = StudyMaterial = mongoose.model('StudyMaterial',StudyMaterialSchema);