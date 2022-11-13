const axios = require('axios');


exports.update_task = (req, res) =>{
    
    axios.get('http://localhost:5000/users/tasks', { params : { id : req.query.id }})
        .then(function(taskdata){
            res.render("updateTask", { task : taskdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
        
}