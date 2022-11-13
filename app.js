const express = require('express');
const router1  = require('./routes/index'); 
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
var methodOverride = require('method-override')





const app = express();


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


app.use(express.json())

const {

    PORT = 5000,
    URL = "mongodb://0.0.0.0:27017/myDataBase"
    
} = process.env

//Connecting data base
mongoose.connect(URL, {useNewUrlParser:true});
const con = mongoose.connection
con.on('open', ()=>{

    console.log('Database connected ..');

})

//

app.use(express.urlencoded({extended:false}))


app.use(expressLayout);
app.set('view engine', 'ejs');
app.use('/',router1);




app.listen(PORT, ()=>{

    console.log("Server is running ... ");

})