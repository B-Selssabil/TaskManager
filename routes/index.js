const express = require('express');
const router = express.Router();
const axios = require('axios')
var Task = require('../models/task');
const errors = []



router.get('/tasks', (req,res)=>{

    console.log('all tasks')
    var target1 ;
    var target2 ;

    Task.find({})
    .then(alltasks=>{

        console.log(alltasks)
        res.render('tasks',{'Tasks' : alltasks})
    }).catch(err=>{
        console.log('err', err)
    })

})

router.get('/addTask', (req,res)=>{

    res.render('addTask');

    
})

router.get('/updateTask/:id', async(req,res)=>{

    const id = req.params.id; 
    var day ;
    var mon ;
     
    console.log(id);
    const task = await Task.findById(id);
    if(task.date.getDate() < 10){

        day = '0'+task.date.getDate();

    }else {

        day = task.date.getDate();


    }
    if(task.date.getMonth() < 9){

        mon = task.date.getMonth() + 1;
        mon = '0' + mon;

    }else{
        mon = task.date.getMonth() + 1;

    }
   

    date7 = task.date.getFullYear() + '-' + mon + '-' + day;
    console.log("date",date7);
    res.render('updateTask',{'id':id, 'task':task.task, 'date':date7, 'time':task.time, 'state':task.state})

})

router.get('/deleteTask/:id', (req,res)=>{

    const id = req.params.id;
    console.log(id)
    res.render('deleteTask',{"id": id});

})

router.post('/addTask', (req,res)=> {

    console.log(req.body)
    const {date, task, time, state} = req.body;
    console.log({state, date,time, task})
    console.log('time',time);

    if(!date || !task || !state || !time){

        errors.push('You have to fill all the fields .');
        res.redirect('/addTask', {
            errors, 
            date,
            task,
            time,
            state
        })

    }else{

       const newTask = new Task({date, task, time, state});
       newTask.save()
       .then((Task)=>{

        if(Task){

            console.log('Task added ');
            res.redirect('/tasks');

        }
       })
       .catch((err)=>{

          console.log(err);

       })

    }


})



router.put('/updateTask/:id', (req,res)=>{


      const{date, task, time, state} = req.body;
      console.log({date, task, time , state});
      const taskId = req.params.id;

      console.log('date1', date);
      console.log('state', state);

      
      
 
      Task.findByIdAndUpdate(taskId, {date, task, time, state})
      .then(doc =>{

        console.log('Updated users' , doc)

      })
      .catch(err=>{

        console.log(err);

      })
      res.redirect('/tasks')
    
    
})


router.delete('/deleteTask/:id', (req,res)=>{


    const id = req.params.id;
    console.log('done', id);
    Task.findByIdAndDelete(id)
    .then(doc=>{

        console.log(doc);
        console.log('Successduly deleted');
    })
    .catch(err=>{

        console.log('err', err);

    })

    res.redirect('/tasks')

})



module.exports = router