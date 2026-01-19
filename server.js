//I need to use express so I need to require it
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')

// const MongoClient = require('mongodb').MongoClient
require('dotenv').config({path: './config/.env'})

connectDB()

//Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layout/main-app')
app.set('view engine', 'ejs')

//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Routes
app.use('/', homeRoutes)
app.use('/todos', todoRoutes)

//Navigation
app.get('', (req, res)=> {
    res.render('index')
})

app.get('', (req, res)=> {
    res.render('todos')
})

//Listening to port 8000
app.listen(process.env.PORT, ()=> {
    console.log('listening on 8000')
})


//Here is where I serve up an index.html file page back to the browser. Use the sendFile method provided by res.
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// }) 