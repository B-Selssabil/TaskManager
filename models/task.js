const express = require('express');
const mongoose = require('mongoose');


const taskSchema = mongoose.Schema({

    
    date :{

        type:Date,
        required : true
    },


    task:{

        type:String,
        required:true
    },

    
    time :{

        type:String,
        required : true
    },
    state :{

        type:String,
        default:'Not Yet'

    }


}) 


const task = mongoose.model('Task', taskSchema);
module.exports = task;


